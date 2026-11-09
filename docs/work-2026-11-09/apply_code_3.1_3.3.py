#!/usr/bin/env python3
"""apply_code_3.1_3.3.py — TODO 3.1（localStorage 结构隐患）+ 3.3（buildPool 边界）补丁。

用法（从仓库根目录运行）：
    python3 docs/work-2026-11-09/apply_code_3.1_3.3.py [主文件路径]
默认目标：laws-prototype/mengxing-prototype-v1.html。

规矩：每个替换点给唯一锚点字符串，断言锚点恰出现一次才替换；任一锚点对不上就
中止且不写回。已打过补丁（检测到 // MXSTORE_V1）时拒绝重复应用。
只改主文件，不动其他文件。改完请用 python3 docs/whiteboard/src/jscheck.py 验收。
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MAIN_DEFAULT = os.path.abspath(os.path.join(
    HERE, '..', '..', 'laws-prototype', 'mengxing-prototype-v1.html'))
MARKER = 'MXSTORE_V1'  # 插入块首行注释里即含此串；检测到即拒绝重复打补丁

# ---------------------------------------------------------------- 3.1 共享块
# 插在 lsGet/lsSet 定义处（原两行由本块末尾的新定义取代，行为不变 + 版本化/提示）。
MXSTORE_BLOCK = r'''/* ================= MXSTORE_V1：本地存储版本化 / 可见提示 / 跨键事务（2026-11-09 TODO 3.1） =================
   覆盖 7 个 key：mxReviewV1、mxWrongBookV1、mxRushBestV1、mx_vb_srs_v1、mx_vb_loop_v1、mx_vb_lifeline_v1、mx_vb_log_v1。
   接线：lsGet/lsSet（动词 SRS/课环/生命线/日志）、RV 的 save/load（mxReviewV1）、
   lsRead/lsWrite（错题本 mxWrongBookV1、闯关 mxRushBestV1）、首页统计 ls()（只读解包）全部改走 MXSTORE。
   - 版本号：落盘值包一层 {v:1, data:<原值>}；读时新旧都认（无 v 字段的裸值视为 v0，老数据不丢）；
     存储可用时首次加载由 migrateAll() 把 v0 裸值逐个包成 v1（单个 key 迁移失败跳过、不丢数据）。
     以后字段新增时，在 unwrap() 里按 v 分支写迁移（v1 → v2……），老值先读出来再升级，不直接覆盖。
   - 可见提示：加载时 probe() 测一次 localStorage 是否可用；配额溢出（QuotaExceededError）/
     被阻断（隐身模式、Safari ITP、WebView）时弹顶部横条（blocked/quota 每种每会话一次），不再静默吞掉；
     写失败时数据仍进内存回退（_MEMSTORE），本会话内继续可用，关掉页面才丢。
   - 跨键事务：localStorage 没有真事务；MXSTORE.txPair(pairs, fn) 做“快照 → 执行 → 逐键读回校验 → 失败回滚 + 提示”。
     接线的成对写点是三处判答出口（RV finalize、MXW wJudge、MXR rJudge），每次同时写 mxReviewV1 + mxWrongBookV1。
     存储本身不可用时 txPair 不校验（内存回退里两份数据本来就是一致的，blocked 提示已弹过一次，不再重复打扰）。
   - 不改正常行为：正常读写返回的仍是裸 payload；只有写失败时多一条横条提示；其余逻辑一字未动。 */
var MXSTORE = (function(){
  var SCHEMA_V = 1;
  var KEYS = ['mxReviewV1','mxWrongBookV1','mxRushBestV1','mx_vb_srs_v1','mx_vb_loop_v1','mx_vb_lifeline_v1','mx_vb_log_v1'];
  var PROBE_KEY = 'mx_store_probe_v1';
  var state = {ok:false, blocked:false, quota:false, inconsistent:false, inTx:false, reason:''};
  var shown = {}; // 每种提示每会话只弹一次（inconsistent 除外：每次出现都提示）
  function isQuota(e){ return !!e && (e.name==='QuotaExceededError' || e.name==='NS_ERROR_DOM_QUOTA_REACHED' || e.code===22); }
  function wrap(v){ return {v:SCHEMA_V, data:v}; }
  function unwrap(p){
    if(p && typeof p==='object' && p.v===SCHEMA_V && ('data' in p)) return p.data;
    if(p && typeof p==='object' && typeof p.v==='number' && p.v!==SCHEMA_V){
      try{ console.warn('[MXSTORE] 未知 schema 版本 v'+p.v+'，按原样读取，不丢数据'); }catch(e){}
      return ('data' in p) ? p.data : p;
    }
    return p; // v0：老版本存的裸值，无版本号字段
  }
  function probe(){
    try{ localStorage.setItem(PROBE_KEY,'1'); localStorage.removeItem(PROBE_KEY); state.ok=true; state.blocked=false; state.reason=''; }
    catch(e){ state.ok=false; state.blocked=true; state.reason=isQuota(e)?'quota':'denied'; }
    return state.ok;
  }
  function notice(kind){
    if(kind!=='inconsistent' && shown[kind]) return;
    shown[kind]=true;
    var msgs={
      blocked:'⚠️ 这台设备现在存不下学习记录（可能是无痕模式或浏览器限制），这次的学习进度只会留在当前页面里，关掉页面就没了。换成普通模式重新打开，就能正常保存。',
      quota:'⚠️ 这台设备的学习记录快存满了，这次的进度可能保存不下来。已经学过的内容不受影响。可以请爸爸妈妈帮忙清理一下这个浏览器的旧数据，或者换一个浏览器再试一次。',
      inconsistent:'⚠️ 刚才有两处学习记录没能一起保存下来，已经恢复到刚才的样子。请刷新页面后重试一次；如果一直出现，可以请爸爸妈妈帮忙清理一下浏览器数据。'
    };
    showBanner(msgs[kind]||msgs.blocked);
  }
  function showBanner(text){
    function mount(){
      var old=document.getElementById('mx-store-notice');
      if(old){ old.querySelector('.mx-store-notice-text').textContent=text; old.style.display='block'; return; }
      var bar=document.createElement('div');
      bar.id='mx-store-notice';
      bar.setAttribute('role','status');
      bar.style.cssText='position:fixed;left:12px;right:12px;top:12px;z-index:99999;background:#fdf6e3;border:2px solid #e8a13a;border-radius:12px;padding:10px 12px;font-size:14px;line-height:1.7;color:#5b4a1f;box-shadow:0 4px 16px rgba(0,0,0,.18)';
      var span=document.createElement('span');
      span.className='mx-store-notice-text';
      span.textContent=text; // 文案走 textContent，不拼 HTML，不引入转义问题
      var btn=document.createElement('button');
      btn.type='button';
      btn.textContent='知道了 ✕';
      btn.style.cssText='float:right;margin-left:10px;border:1px solid #d9c48a;background:#fff;border-radius:8px;padding:2px 10px;font-size:13px;cursor:pointer';
      btn.addEventListener('click', function(){ bar.style.display='none'; });
      bar.appendChild(btn);
      bar.appendChild(span);
      document.body.appendChild(bar);
    }
    if(document.body) mount();
    else document.addEventListener('DOMContentLoaded', mount);
  }
  function get(k){
    var raw=null;
    try{ raw=localStorage.getItem(k); }catch(e){ /* 被阻断：走内存回退 */ }
    if(raw!=null){ try{ return unwrap(JSON.parse(raw)); }catch(e){ /* 存坏了：走内存回退 */ } }
    if(k in _MEMSTORE) return _MEMSTORE[k];
    return null;
  }
  function set(k,v){
    var raw;
    try{ raw=JSON.stringify(wrap(v)); }catch(e){ return {ok:false,reason:'stringify'}; }
    if(!state.ok){
      _MEMSTORE[k]=v;
      if(!state.inTx) notice(state.reason==='quota'?'quota':'blocked');
      return {ok:false,reason:state.reason||'denied'};
    }
    try{ localStorage.setItem(k,raw); return {ok:true}; }
    catch(e){
      _MEMSTORE[k]=v;
      if(isQuota(e)){ state.quota=true; if(!state.inTx) notice('quota'); return {ok:false,reason:'quota'}; }
      state.blocked=true; if(!state.inTx) notice('blocked'); return {ok:false,reason:'denied'};
    }
  }
  function migrateAll(){
    if(!state.ok) return 0;
    var n=0;
    KEYS.forEach(function(k){
      try{
        var raw=localStorage.getItem(k); if(raw==null) return;
        var p=JSON.parse(raw);
        if(p && typeof p==='object' && p.v===SCHEMA_V && ('data' in p)) return; // 已是新格式
        localStorage.setItem(k, JSON.stringify(wrap(p))); n++; // v0 裸值 → 包一层版本号，原值原样放进 data
      }catch(e){ /* 单个 key 迁移失败不影响其他 key，也不丢数据 */ }
    });
    return n;
  }
  function txPair(pairs, fn){
    if(!state.ok){ try{ fn(); }catch(e){} return {ok:true, memOnly:true}; }
    var snaps={};
    pairs.forEach(function(e){ try{ snaps[e.k]=localStorage.getItem(e.k); }catch(err){ snaps[e.k]=undefined; } });
    state.inTx=true;
    try{ fn(); }catch(err){ /* 写流程抛错也走下面的校验与回滚 */ }
    state.inTx=false;
    var bad=[];
    pairs.forEach(function(e){
      var cur=null; try{ cur=e.get(); }catch(err){ cur=null; }
      if(cur==null) return; // 读不到内存值时无法校验，跳过（不误报）
      var want=null; try{ want=JSON.stringify(wrap(cur)); }catch(err){ want=null; }
      if(want===null){ bad.push(e.k); return; }
      var got=null; try{ got=localStorage.getItem(e.k); }catch(err){ got=null; }
      if(got!==want) bad.push(e.k);
    });
    if(!bad.length) return {ok:true};
    pairs.forEach(function(e){ // 尽力回滚到写前快照
      try{ var s=snaps[e.k]; if(s===null||s===undefined){ localStorage.removeItem(e.k); } else { localStorage.setItem(e.k,s); } }catch(err){}
    });
    state.inconsistent=true;
    notice('inconsistent');
    return {ok:false, failed:bad};
  }
  probe();
  if(state.ok){ try{ migrateAll(); }catch(e){} }
  else { notice('blocked'); }
  return {SCHEMA_V:SCHEMA_V, KEYS:KEYS, state:state, wrap:wrap, unwrap:unwrap,
    get:get, set:set, probe:probe, notice:notice, txPair:txPair, migrateAll:migrateAll,
    dismissNotice:function(){ var b=document.getElementById('mx-store-notice'); if(b) b.style.display='none'; },
    status:function(){ return {ok:state.ok, blocked:state.blocked, quota:state.quota, inconsistent:state.inconsistent}; }};
})();
window.MXSTORE = MXSTORE;
function lsGet(k){ return MXSTORE.get(k); }
function lsSet(k, v){ MXSTORE.set(k, v); }'''

REPLACEMENTS = []


def rep(name, old, new):
    REPLACEMENTS.append((name, old, new))


# --- R1：3.1 共享块（lsGet/lsSet 改走 MXSTORE） ---
rep('R1-MXSTORE-block',
    r'''function lsGet(k){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; }catch(e){ return (k in _MEMSTORE) ? _MEMSTORE[k] : null; } }
function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){ _MEMSTORE[k] = v; } }''',
    MXSTORE_BLOCK)

# --- R2：3.1 RV 账本加载改走 MXSTORE.get（解包；裸值 v0 照读） ---
rep('R2-RV-load',
    r'''try{var raw=localStorage.getItem(LSKEY); if(raw){var p=JSON.parse(raw); if(p&&p.items&&p.wrong) store=p;}}catch(e){}''',
    r'''try{var p=(window.MXSTORE&&MXSTORE.get)?MXSTORE.get(LSKEY):(function(){var raw=localStorage.getItem(LSKEY); return raw?JSON.parse(raw):null;})(); if(p&&p.items&&p.wrong) store=p;}catch(e){}''')

# --- R3：3.1 RV save() 改走 MXSTORE.set（带版本号 + 配额提示），并返回写结果供 pruneOrphans 校验 ---
rep('R3-RV-save',
    r'''function save(){ try{localStorage.setItem(LSKEY,JSON.stringify(store));}catch(e){} }''',
    r'''function save(){ if(window.MXSTORE&&MXSTORE.set) return MXSTORE.set(LSKEY,store); try{localStorage.setItem(LSKEY,JSON.stringify(store));}catch(e){} return {ok:false,reason:'nostore'}; }''')

# --- R4：3.3 就绪检查 + 孤儿清理函数（挂在 POOL 声明处） ---
rep('R4-pool-helpers',
    r'''var POOL=null, BYKEY={}, DUPKEYS=[];''',
    r'''var POOL=null, BYKEY={}, DUPKEYS=[];
var POOL_NOT_READY=false, POOL_PARTIAL=false, POOL_RETRY_TIMER=null, POOL_RETRY_N=0;
var ORPHAN_REPORT={removed:0, removedWrong:0, at:0, keys:[], persisted:false}; // 孤儿键清理记录（buildPool 建池时产生）
function mxPoolReady(){ // 数据就绪检查：LAWDATA 与 6 个 RV_* 题源须齐（均为内联脚本，正常情况解析即就绪；任一数据脚本出错导致未定义时返回 false）
  if(!window.LAWDATA || typeof window.LAWDATA!=='object' || !Object.keys(window.LAWDATA).length) return false;
  var need=['RV_TA','RV_SPINE','RV_ZONE','RV_MORPH','RV_PREP','RV_GENQ'];
  for(var i=0;i<need.length;i++){ if(!Array.isArray(window[need[i]])) return false; }
  return true;
}
function pruneOrphans(){ // 保守清理：只删 BYKEY 里没有的 key（即对应题目已从题源删除）；须在完整建池后调用，部分池不清理
  if(POOL_PARTIAL) return ORPHAN_REPORT;
  var removed=0, removedWrong=0, keys=[];
  Object.keys(store.items).forEach(function(k){ if(!BYKEY[k]){ delete store.items[k]; removed++; keys.push(k); } });
  Object.keys(store.wrong).forEach(function(k){ if(!BYKEY[k]){ delete store.wrong[k]; removedWrong++; keys.push(k); } });
  if(!removed && !removedWrong) return ORPHAN_REPORT;
  var saved=false;
  try{ var r=save(); saved=!!(r && r.ok); }catch(e){ saved=false; }
  if(saved){ // 只有落盘成功才记为“已清理”；写失败时内存里照样清了（本会话一致），但不对外宣称已清理
    ORPHAN_REPORT={removed:removed, removedWrong:removedWrong, at:Date.now(), keys:keys, persisted:true};
    try{ console.info('[RV] 孤儿键清理：items '+removed+' 条，wrong '+removedWrong+' 条'); }catch(e){}
  } else {
    ORPHAN_REPORT={removed:0, removedWrong:0, at:Date.now(), keys:[], persisted:false};
  }
  return ORPHAN_REPORT;
}''')

# --- R5：3.3 buildPool 加数据就绪检查（未就绪不建空池、延迟重试；重试耗尽才建部分池）+ 建池后清理孤儿键 ---
rep('R5-buildPool-ready',
    r'''function buildPool(){
  if(POOL) return POOL;
  var items=[], seen={};
  function push(it){ // 去重规则：同 key 先到者胜，后到者丢弃并记入 DUPKEYS（key 是 SRS 户口，不许覆盖）
    if(seen[it.key]){ DUPKEYS.push(it.key); return; }
    seen[it.key]=1; items.push(it);
  }
  SOURCES.forEach(function(s){ s(push); });
  items.forEach(function(it){BYKEY[it.key]=it});
  POOL=items; return POOL;
}''',
    r'''function buildPool(){
  if(POOL) return POOL;
  if(!mxPoolReady() && POOL_RETRY_N<10){
    POOL_NOT_READY=true;
    if(!POOL_RETRY_TIMER){
      POOL_RETRY_N++;
      POOL_RETRY_TIMER=setTimeout(function(){
        POOL_RETRY_TIMER=null;
        if(!POOL){ buildPool(); var root=document.getElementById('rv-root'); if(root && root.innerHTML) render(); }
      },300);
    }
    return []; // 不建空池：POOL 保持 null，等数据就绪后由重试重建；本次调用方拿到空数组，不缓存
  }
  if(!mxPoolReady()){
    // 重试 10 次（约 3 秒）仍未就绪：不再空等，用已有数据建部分池，避免复习页一直卡在“准备中”
    POOL_PARTIAL=true;
    try{ console.warn('[RV] 题库数据未完全就绪（重试 10 次），先用已有数据建池'); }catch(e){}
  }
  POOL_NOT_READY=false;
  var items=[], seen={};
  function push(it){ // 去重规则：同 key 先到者胜，后到者丢弃并记入 DUPKEYS（key 是 SRS 户口，不许覆盖）
    if(seen[it.key]){ DUPKEYS.push(it.key); return; }
    seen[it.key]=1; items.push(it);
  }
  SOURCES.forEach(function(s){ s(push); });
  items.forEach(function(it){BYKEY[it.key]=it});
  POOL=items; pruneOrphans(); return POOL;
}''')

# --- R6：3.3 deriveMastery 孤儿计数改为“清理后残留”（清理本身在 buildPool 里做，推导层仍只读） ---
rep('R6-deriveMastery-orphan-comment',
    r'''  Object.keys(store.items).forEach(function(k){ if(!BYKEY[k]) orphan++; }); // 孤儿键只计数，不入任何律''',
    r'''  Object.keys(store.items).forEach(function(k){ if(!BYKEY[k]) orphan++; }); // 孤儿键：buildPool 建池时已由 pruneOrphans 清理（部分池不清理）；此处只计清理后残留，正常为 0，不入任何律''')

# --- R7：3.3 deriveMastery 返回值加 pruned（本会话清理掉的条数） ---
rep('R7-deriveMastery-pruned',
    r'''  return {laws:laws,items:itemSt,counts:counts,orphan:orphan,now:now};''',
    r'''  return {laws:laws,items:itemSt,counts:counts,orphan:orphan,pruned:(ORPHAN_REPORT.removed+ORPHAN_REPORT.removedWrong),now:now};''')

# --- R8：3.1 判答出口 1（RV finalize）成对写 mxReviewV1 + mxWrongBookV1 ---
rep('R8-finalize-txPair',
    r'''  answer(it.key, ok);
  if(window.MXW) MXW.record(it, ok); /* 错题本三分法挂点：复习判答统一出口 */''',
    r'''  if(window.MXSTORE&&MXSTORE.txPair){ MXSTORE.txPair([{k:'mxReviewV1',get:function(){return store;}},{k:'mxWrongBookV1',get:function(){return (window.MXW&&MXW.store)?MXW.store():null;}}], function(){ answer(it.key, ok); if(window.MXW) MXW.record(it, ok); /* 错题本三分法挂点：复习判答统一出口 */ }); }
  else { answer(it.key, ok); if(window.MXW) MXW.record(it, ok); /* 错题本三分法挂点：复习判答统一出口 */ }''')

# --- R9：3.3 render() 在数据未就绪时显示“准备中”，而不是空队列 ---
rep('R9-render-not-ready',
    r'''function render(){
  var root=document.getElementById('rv-root'); if(!root) return;
  buildPool();''',
    r'''function render(){
  var root=document.getElementById('rv-root'); if(!root) return;
  buildPool();
  if(POOL_NOT_READY && !POOL){ root.innerHTML='<div class="box">📚 题库正在准备，请稍等片刻再回来……</div>'; return; }''')

# --- R10：3.3 复习统计行显示孤儿清理计数（用户可见的提示） ---
rep('R10-statsHtml-orphan-line',
    r'''    ' · 已建档 '+seen+' 题 · 今日到期 '+dueN+' 题 · 错题本 '+Object.keys(store.wrong).length+' 题 · 已攻克 '+store.fixed+' 题'+(stableN>0?' · 已稳规律 '+stableN+' 条':'')+'<br>'+''',
    r'''    ' · 已建档 '+seen+' 题 · 今日到期 '+dueN+' 题 · 错题本 '+Object.keys(store.wrong).length+' 题 · 已攻克 '+store.fixed+' 题'+(stableN>0?' · 已稳规律 '+stableN+' 条':'')+((ORPHAN_REPORT.removed+ORPHAN_REPORT.removedWrong)>0?' · 已清理 '+(ORPHAN_REPORT.removed+ORPHAN_REPORT.removedWrong)+' 条失效旧记录（对应题目已下架）':'')+'<br>'+''')

# --- R11：3.3 导出 refreshPool / orphans / poolReady（供重试与外部检查用） ---
rep('R11-RV-exports',
    r'''window.RV={render:render,buildPool:buildPool,buildQueue:buildQueue,answer:answer,
  mastery:deriveMastery,todaySeg:function(){return LASTTODAY},
  store:function(){return store},byKey:function(){return BYKEY},dups:function(){return DUPKEYS}};''',
    r'''window.RV={render:render,buildPool:buildPool,buildQueue:buildQueue,answer:answer,
  mastery:deriveMastery,todaySeg:function(){return LASTTODAY},
  store:function(){return store},byKey:function(){return BYKEY},dups:function(){return DUPKEYS},
  refreshPool:function(){ if(!mxPoolReady()) return buildPool(); POOL=null; POOL_NOT_READY=false; POOL_PARTIAL=false; return buildPool(); },
  orphans:function(){ return ORPHAN_REPORT; },poolReady:function(){ return mxPoolReady(); },poolPartial:function(){ return POOL_PARTIAL; }};''')

# --- R12：3.1 lsRead/lsWrite（错题本、闯关）改走 MXSTORE ---
rep('R12-lsRead-lsWrite',
    r'''function lsRead(k){try{var r=localStorage.getItem(k);return r?JSON.parse(r):null;}catch(e){return null;}}
function lsWrite(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}''',
    r'''function lsRead(k){ if(window.MXSTORE&&MXSTORE.get) return MXSTORE.get(k); try{var r=localStorage.getItem(k);return r?JSON.parse(r):null;}catch(e){return null;} }
function lsWrite(k,v){ if(window.MXSTORE&&MXSTORE.set) return MXSTORE.set(k,v); try{localStorage.setItem(k,JSON.stringify(v));}catch(e){} return {ok:false,reason:'nostore'}; }''')

# --- R13：3.1 判答出口 2（MXW wJudge）成对写 ---
rep('R13-wJudge-txPair',
    r'''  if(window.RV&&RV.answer) RV.answer(it.key,ok);
  wRecord(it,ok);''',
    r'''  if(window.MXSTORE&&MXSTORE.txPair){ MXSTORE.txPair([{k:'mxReviewV1',get:function(){return (window.RV&&RV.store)?RV.store():null;}},{k:'mxWrongBookV1',get:function(){return wstore;}}], function(){ if(window.RV&&RV.answer) RV.answer(it.key,ok); wRecord(it,ok); }); }
  else { if(window.RV&&RV.answer) RV.answer(it.key,ok); wRecord(it,ok); }''')

# --- R14：3.1 判答出口 3（MXR rJudge）成对写 ---
rep('R14-rJudge-txPair',
    r'''  if(window.RV&&RV.answer) RV.answer(it.key,ok);
  if(window.MXW) MXW.record(it,ok);''',
    r'''  if(window.MXSTORE&&MXSTORE.txPair){ MXSTORE.txPair([{k:'mxReviewV1',get:function(){return (window.RV&&RV.store)?RV.store():null;}},{k:'mxWrongBookV1',get:function(){return (window.MXW&&MXW.store)?MXW.store():null;}}], function(){ if(window.RV&&RV.answer) RV.answer(it.key,ok); if(window.MXW) MXW.record(it,ok); }); }
  else { if(window.RV&&RV.answer) RV.answer(it.key,ok); if(window.MXW) MXW.record(it,ok); }''')

# --- R15：3.1 首页统计 ls()（只读）解包新格式，裸值 v0 照读 ---
rep('R15-dashboard-ls',
    r'''  function ls(k){ try{ var r=localStorage.getItem(k); return r?JSON.parse(r):null; }catch(e){ return null; } }''',
    r'''  function ls(k){ try{ var r=localStorage.getItem(k); if(!r) return null; var p=JSON.parse(r); return (window.MXSTORE&&MXSTORE.unwrap)?MXSTORE.unwrap(p):p; }catch(e){ return null; } }''')


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else MAIN_DEFAULT
    path = os.path.abspath(path)
    if not os.path.isfile(path):
        print('FAIL: 找不到主文件：%s' % path)
        return 1
    s = open(path, encoding='utf-8').read()
    if MARKER in s:
        print('ABORT: 补丁已应用过（检测到 %s），拒绝重复打补丁' % MARKER)
        return 1
    for name, old, new in REPLACEMENTS:
        n = s.count(old)
        if n != 1:
            print('FAIL: %s 锚点出现 %d 次（应为 1 次），未写入，已中止' % (name, n))
            return 1
        s = s.replace(old, new, 1)
        print('OK: %s' % name)
    open(path, 'w', encoding='utf-8').write(s)
    print('写回完成：%s（共 %d 处替换）' % (path, len(REPLACEMENTS)))
    print('下一步验收：python3 docs/whiteboard/src/jscheck.py %s' % path)
    return 0


if __name__ == '__main__':
    sys.exit(main())
