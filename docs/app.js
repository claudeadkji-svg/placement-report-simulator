/* 게재보고 시뮬레이터 — 정적 사이트판 */
(function(){
"use strict";

// ── 아이콘 ──
function signalSvg(level){ // 0~4
  var bars=[[0,9,5],[5,6,8],[10,3,11],[15,0,14]];
  var r=bars.map(function(b,i){ var op=i<level?1:0.28;
    return '<rect x="'+b[0]+'" y="'+b[1]+'" width="3" height="'+b[2]+'" rx="1" fill="#fff" opacity="'+op+'"/>'; }).join('');
  return '<svg class="icn" style="width:17px;height:14px" viewBox="0 0 18 14">'+r+'</svg>';
}
var WIFI='<svg class="icn" style="width:17px;height:14px" viewBox="0 0 20 15" fill="#fff"><path d="M10 3C6.3 3 3 4.5.7 6.9l1.8 1.8C4.4 6.8 7.1 5.7 10 5.7s5.6 1.1 7.5 3l1.8-1.8C17 4.5 13.7 3 10 3zm0 4.6c-2 0-3.8.8-5.1 2.1l1.8 1.8c.9-.9 2-1.4 3.3-1.4s2.5.5 3.3 1.4l1.8-1.8A7.2 7.2 0 0 0 10 7.6zm0 4.3L11.8 14 10 15.7 8.2 14 10 11.9z"/></svg>';
var BELL='<svg class="icn" style="width:12px;height:12px" viewBox="0 0 24 24" fill="#fff"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm7-6v-5c0-3.2-1.7-5.9-4.7-6.6V3.7a1.3 1.3 0 0 0-2.6 0v.7C8.7 5.1 7 7.8 7 11v5l-2 2v1h14v-1l-2-2z"/></svg>';
var BACK='<svg class="icn" style="width:20px;height:20px" viewBox="0 0 24 24" fill="#fff"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"/></svg>';
var CLEAR='<svg class="icn" style="width:20px;height:20px" viewBox="0 0 24 24" fill="#aaa"><path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>';
var MIC='<svg class="icn" style="width:20px;height:20px" viewBox="0 0 24 24" fill="#fff"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>';
var KEBAB='<svg class="icn" style="width:6px;height:20px" viewBox="0 0 6 24" fill="#fff"><circle cx="3" cy="4" r="2"/><circle cx="3" cy="12" r="2"/><circle cx="3" cy="20" r="2"/></svg>';
var KEBAB_H='<svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';
var HEART='<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12 21s-7-4.5-9.3-8.7C1 9.5 2.4 6 5.7 6c1.9 0 3.2 1 4.3 2.3C11.1 7 12.4 6 14.3 6c3.3 0 4.7 3.5 3 6.3C19 16.5 12 21 12 21z"/></svg>';
var COMMENT='<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.7 6.1L5 21l4.2-2.2c.9.2 1.8.2 2.8.2 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>';
var SHARE='<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M14 9V5l7 7-7 7v-4C7 12 4 16 3 20c0-9 5-11 11-11z"/></svg>';
// PC 전용
var SEARCH='<svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="#e8e8e8"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>';
var BURGER='<svg style="width:22px;height:22px;flex:none" viewBox="0 0 24 24" fill="#fff"><path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/></svg>';
var LOGO='<span class="yt-logo"><svg style="width:29px;height:20px" viewBox="0 0 29 20"><rect width="29" height="20" rx="4.6" fill="#f03"/><path d="M11.6 5.8l7.2 4.2-7.2 4.2z" fill="#fff"/></svg><span>YouTube</span></span>';
var BELL_L='<svg style="width:22px;height:22px;flex:none" viewBox="0 0 24 24" fill="#fff"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm7-6v-5c0-3.2-1.7-5.9-4.7-6.6V3.7a1.3 1.3 0 0 0-2.6 0v.7C8.7 5.1 7 7.8 7 11v5l-2 2v1h14v-1l-2-2z"/></svg>';
var CAM='<svg style="width:22px;height:22px;flex:none" viewBox="0 0 24 24" fill="#fff"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>';

function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function batt(pct){ return '<div class="batt"><div class="cap"><div class="fill" style="width:'+pct+'%"></div><span class="pct">'+pct+'</span></div></div>'; }
function creativeBg(url){ return url ? 'background-image:url('+url+');background-size:cover;background-position:center;' : ''; }

// ── 인피드(VVC/VRC · MO) 렌더 ──
function renderInfeed(c){
  var chips = c.showChips ? '<div class="chips"><div class="chip on">전체</div><div class="chip">Shorts</div><div class="chip">시청하지 않음</div><div class="chip">감상한 동영상</div></div>' : '';
  var vid = '<div class="video" style="height:202px;'+creativeBg(c.creative)+'">'
    + (c.creative?'':'<div class="ph">여기에 광고 소재</div>')
    + '<div class="dur">'+esc(c.duration)+'</div></div>';
  var prog = c.showProgress ? '<div class="progress" style="width:'+c.progress+'%"></div>' : '';
  return '<div class="phone">'
    + '<div class="statusbar"><div class="sb-l"><span>'+esc(c.time)+'</span>'+(c.showBell?BELL:'')+'</div>'
      + '<div class="sb-r">'+signalSvg(c.signal)+(c.wifi?WIFI:'')+batt(c.battery)+'</div></div>'
    + '<div class="searchbar">'+BACK+'<div class="field"><span class="kw">'+esc(c.keyword)+'</span>'+CLEAR+'</div>'+MIC+KEBAB+'</div>'
    + chips
    + vid + prog
    + '<div class="meta"><div class="avatar" style="background:'+esc(c.avatarColor)+'">'+esc(c.avatarText)+'</div>'
      + '<div class="mtext"><div class="mtitle">'+esc(c.title)+'</div>'
      + (c.subtitle?'<div class="msub">'+esc(c.subtitle)+'</div>':'')
      + '<div class="msponsor">'+(c.showSponsorLabel?'<b>스폰서</b> · ':'')+esc(c.sponsor)+'</div></div>'
      + '<div class="kebab">'+KEBAB_H+'</div></div>'
    + '<div class="cta" style="background:'+esc(c.ctaColor)+'">'+esc(c.cta)+'</div>'
    + (c.showOrganic?'<div class="organic"><div class="org-h">'+esc(c.keyword)+'</div><div class="org-s">비디오 게임 · 출시일: 2016</div></div>':'')
    + '<div class="pad"></div></div>';
}

// ── Shorts(MO) 렌더 ──
function renderShorts(c){
  var net = c.network ? '<span style="font-size:12px;font-weight:700">'+esc(c.network)+'</span>' : '';
  var rail = c.showRail ? '<div class="rail">'
    + '<div class="act">'+HEART+'<span class="lbl">'+esc(c.likes)+'</span></div>'
    + '<div class="act">'+COMMENT+'<span class="lbl">'+esc(c.comments)+'</span></div>'
    + '<div class="act">'+SHARE+'<span class="lbl">'+esc(c.shareLabel)+'</span></div>'
    + '<div class="act">'+KEBAB+'</div></div>' : '';
  return '<div class="sphone">'
    + '<div class="s-creative" style="'+creativeBg(c.creative)+'">'+(c.creative?'':'<div class="s-ph">세로 소재(9:16)</div>')+'</div>'
    + '<div class="scrim-top"></div><div class="scrim-bot"></div>'
    + '<div class="statusbar"><span>'+esc(c.time)+'</span><div class="sb-r">'+signalSvg(c.signal)+net+batt(c.battery)+'</div></div>'
    + '<div class="topbar"><div style="display:flex;align-items:center;gap:14px">'+(c.showBack?BACK:'')+'</div>'
      + '<div style="display:flex;align-items:center;gap:12px">'+(c.showAdBadge?'<span class="adbadge">'+esc(c.adBadge)+'</span>':'')+KEBAB+'</div></div>'
    + rail
    + '<div class="s-bottom"><div class="channel"><div class="av" style="background:'+esc(c.avatarColor)+'">'+esc(c.avatarText)+'</div>'
      + '<span class="nm">'+esc(c.sponsor)+'</span><span class="sp"> · 스폰서</span></div>'
      + '<div class="adtext">'+esc(c.adtext)+'</div></div>'
    + '<div class="s-cta" style="background:'+esc(c.ctaColor)+'">'+esc(c.cta)+'</div>'
    + (c.showGesture?'<div class="gesture"></div>':'')+'</div>';
}

// ── 인피드(VVC/VRC · PC) 렌더 ──
function renderInfeedPC(c){
  var chips = c.showChips ? '<div class="pc-chips"><div class="chip on">전체</div><div class="chip">Shorts</div><div class="chip">시청하지 않음</div><div class="chip">최근에 업로드됨</div><div class="chip">감상한 동영상</div></div>' : '';
  var organic = c.showOrganic ? '<div class="pc-card pc-organic">'
    + '<div class="pc-thumb"><div class="ph">오가닉 검색결과</div><div class="dur">10:24</div></div>'
    + '<div class="pc-info"><div class="pc-title">'+esc(c.keyword)+' 공식 영상</div>'
    + '<div class="pc-meta">조회수 12만회 · 3일 전</div>'
    + '<div class="pc-ch"><div class="avatar" style="width:24px;height:24px;font-size:12px;background:#555">'+esc(String(c.keyword).charAt(0).toUpperCase())+'</div><span class="pc-chname">'+esc(c.keyword)+'</span></div></div></div>' : '';
  return '<div class="pc">'
    + '<div class="pc-top">'+BURGER+LOGO
      + '<div class="pc-search"><div class="pc-field">'+esc(c.keyword)+'</div><div class="pc-sbtn">'+SEARCH+'</div><div class="pc-mic">'+MIC+'</div></div>'
      + '<div class="pc-right">'+CAM+BELL_L+'<div class="pc-avatar"></div></div></div>'
    + chips
    + '<div class="pc-body">'
      + '<div class="pc-card">'
        + '<div class="pc-thumb" style="'+creativeBg(c.creative)+'">'+(c.creative?'':'<div class="ph">여기에 광고 소재</div>')+'<div class="dur">'+esc(c.duration)+'</div></div>'
        + '<div class="pc-info">'
          + '<div class="pc-title">'+esc(c.title)+'</div>'
          + '<div class="pc-meta">'+(c.showSponsorLabel?'<b>스폰서</b> · ':'')+esc(c.sponsor)+'</div>'
          + '<div class="pc-ch"><div class="avatar" style="width:24px;height:24px;font-size:12px;background:'+esc(c.avatarColor)+'">'+esc(c.avatarText)+'</div><span class="pc-chname">'+esc(c.sponsor)+'</span></div>'
          + (c.subtitle?'<div class="pc-sub">'+esc(c.subtitle)+'</div>':'')
          + '<div class="pc-cta" style="background:'+esc(c.ctaColor)+'">'+esc(c.cta)+'</div>'
        + '</div>'
        + '<div class="pc-kebab">'+KEBAB_H+'</div>'
      + '</div>'
      + organic
    + '</div></div>';
}

// ── Shorts(PC) 렌더 ──
function renderShortsPC(c){
  var head = c.showHeader ? '<div class="pcs-head">'+BURGER+LOGO
    + '<div class="pc-search"><div class="pc-field" style="color:#888">'+esc(c.searchText)+'</div><div class="pc-sbtn">'+SEARCH+'</div><div class="pc-mic">'+MIC+'</div></div>'
    + '<div class="pc-right">'+CAM+BELL_L+'<div class="pc-avatar"></div></div></div>' : '';
  var rail = c.showRail ? '<div class="pcs-rail">'
    + '<div class="pcs-act"><div class="pcs-btn">'+HEART+'</div><span class="lbl">'+esc(c.likes)+'</span></div>'
    + '<div class="pcs-act"><div class="pcs-btn">'+COMMENT+'</div><span class="lbl">'+esc(c.comments)+'</span></div>'
    + '<div class="pcs-act"><div class="pcs-btn">'+SHARE+'</div><span class="lbl">'+esc(c.shareLabel)+'</span></div>'
    + '<div class="pcs-act"><div class="pcs-btn">'+KEBAB_H+'</div></div></div>' : '';
  return '<div class="pcs">'+head
    + '<div class="pcs-stage">'
      + '<div class="pcs-player" style="'+creativeBg(c.creative)+'">'
        + (c.creative?'':'<div class="s-ph">세로 소재(9:16)</div>')
        + '<div class="scrim-top"></div><div class="scrim-bot"></div>'
        + '<div class="pcs-topbar">'+(c.showAdBadge?'<span class="adbadge">'+esc(c.adBadge)+'</span>':'<span></span>')+KEBAB_H+'</div>'
        + '<div class="pcs-bottom"><div class="channel"><div class="av" style="background:'+esc(c.avatarColor)+'">'+esc(c.avatarText)+'</div>'
          + '<span class="nm">'+esc(c.sponsor)+'</span><span class="sp"> · 스폰서</span></div>'
          + '<div class="adtext">'+esc(c.adtext)+'</div>'
          + '<div class="pcs-cta" style="background:'+esc(c.ctaColor)+'">'+esc(c.cta)+'</div></div>'
      + '</div>'+rail
    + '</div></div>';
}

// ── 컨트롤 정의 ──
var OLIVE='#67584f';
var DEF={
  infeed:{ time:'7:08', signal:4, wifi:true, showBell:true, battery:88,
    keyword:'메이플스토리m', showChips:false, duration:'0:30', showProgress:true, progress:100,
    avatarText:'M', avatarColor:'#e8552d', title:'보스 부담 확 줄인 메이플M 지금 사전등록하고 도전하자',
    subtitle:'메이플M 지금 사전등록하면 특별 보상 모두 받아가기', showSponsorLabel:true, sponsor:'메이플스토리M',
    cta:'사전등록', ctaColor:OLIVE, showOrganic:true, creative:null },
  shorts:{ time:'7:11', signal:4, network:'5G', battery:88, showBack:true, showAdBadge:true, adBadge:'광고',
    showRail:true, likes:'906', comments:'24', shareLabel:'공유', avatarText:'M', avatarColor:'#e8552d',
    sponsor:'메이플스토리M', adtext:'지금 사전등록하고 특별 사전 이벤트 보상 모두 받아가기',
    cta:'사전등록', ctaColor:OLIVE, showGesture:true, creative:null },
  infeedPc:{ keyword:'메이플스토리m', showChips:false, duration:'0:30',
    avatarText:'M', avatarColor:'#e8552d', title:'보스 부담 확 줄인 메이플M 지금 사전등록하고 도전하자',
    subtitle:'메이플M 지금 사전등록하면 특별 보상 모두 받아가기', showSponsorLabel:true, sponsor:'메이플스토리M',
    cta:'사전등록', ctaColor:OLIVE, showOrganic:true, creative:null },
  shortsPc:{ showHeader:true, searchText:'검색', showAdBadge:true, adBadge:'광고',
    showRail:true, likes:'906', comments:'24', shareLabel:'공유', avatarText:'M', avatarColor:'#e8552d',
    sponsor:'메이플스토리M', adtext:'지금 사전등록하고 특별 사전 이벤트 보상 모두 받아가기',
    cta:'사전등록', ctaColor:OLIVE, creative:null }
};
var CTRL={
  infeed:[
    ['H','상태바'],['time','시간','text'],['signal','신호 강도','range',0,4],['wifi','와이파이','check'],['showBell','알림벨','check'],['battery','배터리 %','range',0,100],
    ['H','검색·영상'],['keyword','검색어','text'],['showChips','필터칩(VRC)','check'],['duration','재생시간','text'],['showProgress','진행바','check'],['progress','진행바 %','range',0,100],
    ['H','광고 정보'],['avatarText','아바타 글자','text'],['avatarColor','아바타 색','color'],['title','제목','text'],['subtitle','부제','text'],['showSponsorLabel','"스폰서" 라벨','check'],['sponsor','채널/스폰서명','text'],['showOrganic','하단 오가닉','check'],
    ['H','CTA'],['cta','버튼 문구','text'],['ctaColor','버튼 색','color'],
  ],
  shorts:[
    ['H','상태바'],['time','시간','text'],['signal','신호 강도','range',0,4],['network','네트워크(5G/LTE)','text'],['battery','배터리 %','range',0,100],
    ['H','상단'],['showBack','뒤로가기','check'],['showAdBadge','광고 배지','check'],['adBadge','배지 문구','text'],
    ['H','우측 액션'],['showRail','액션 표시','check'],['likes','좋아요 수','text'],['comments','댓글 수','text'],['shareLabel','공유 라벨','text'],
    ['H','하단 정보'],['avatarText','아바타 글자','text'],['avatarColor','아바타 색','color'],['sponsor','스폰서명','text'],['adtext','광고 안내문','text'],
    ['H','CTA'],['cta','버튼 문구','text'],['ctaColor','버튼 색','color'],['showGesture','제스처 바','check'],
  ],
  infeedPc:[
    ['H','검색·영상'],['keyword','검색어','text'],['showChips','필터칩(VRC)','check'],['duration','재생시간','text'],
    ['H','광고 정보'],['avatarText','아바타 글자','text'],['avatarColor','아바타 색','color'],['title','제목','text'],['subtitle','부제','text'],['showSponsorLabel','"스폰서" 라벨','check'],['sponsor','채널/스폰서명','text'],['showOrganic','하단 오가닉','check'],
    ['H','CTA'],['cta','버튼 문구','text'],['ctaColor','버튼 색','color'],
  ],
  shortsPc:[
    ['H','페이지'],['showHeader','상단 헤더','check'],['searchText','검색창 문구','text'],
    ['H','플레이어 상단'],['showAdBadge','광고 배지','check'],['adBadge','배지 문구','text'],
    ['H','우측 액션'],['showRail','액션 표시','check'],['likes','좋아요 수','text'],['comments','댓글 수','text'],['shareLabel','공유 라벨','text'],
    ['H','하단 정보'],['avatarText','아바타 글자','text'],['avatarColor','아바타 색','color'],['sponsor','스폰서명','text'],['adtext','광고 안내문','text'],
    ['H','CTA'],['cta','버튼 문구','text'],['ctaColor','버튼 색','color'],
  ]
};

var KIND={ vvc:'infeed', vrc:'infeed', shorts:'shorts', 'vvc-pc':'infeedPc', 'vrc-pc':'infeedPc', 'shorts-pc':'shortsPc' };
var state={ template:'vvc', cfg:{ creative:null } };
function kind(){ return KIND[state.template]; }

function draw(){
  var c=state.cfg, k=kind(), html;
  if(k==='shorts') html=renderShorts(c);
  else if(k==='shortsPc') html=renderShortsPC(c);
  else{
    var cc=Object.assign({},c,{showChips:(state.template==='vrc'||state.template==='vrc-pc')?true:c.showChips});
    html = k==='infeedPc' ? renderInfeedPC(cc) : renderInfeed(cc);
  }
  document.getElementById('stage').innerHTML=html;
}

function buildControls(){
  var box=document.getElementById('ctrl'); box.innerHTML='';
  CTRL[kind()].forEach(function(f){
    if(f[0]==='H'){ var h=document.createElement('div'); h.className='sec'; h.innerHTML='<h2>'+f[1]+'</h2>'; box.appendChild(h); return; }
    var key=f[0],label=f[1],type=f[2];
    var wrap=document.createElement('div'); wrap.className='fld';
    var v=state.cfg[key];
    if(type==='check'){
      wrap.className='chk';
      wrap.innerHTML='<input type="checkbox" id="c_'+key+'" '+(v?'checked':'')+'><label for="c_'+key+'" style="margin:0">'+label+'</label>';
      box.appendChild(wrap);
      wrap.querySelector('input').addEventListener('change',function(e){ state.cfg[key]=e.target.checked; draw(); });
    } else if(type==='range'){
      wrap.innerHTML='<label>'+label+': <b id="v_'+key+'">'+v+'</b></label><input type="range" min="'+f[3]+'" max="'+f[4]+'" value="'+v+'" id="c_'+key+'">';
      box.appendChild(wrap);
      wrap.querySelector('input').addEventListener('input',function(e){ state.cfg[key]=+e.target.value; document.getElementById('v_'+key).textContent=e.target.value; draw(); });
    } else if(type==='color'){
      wrap.innerHTML='<label>'+label+'</label><input type="color" value="'+v+'" id="c_'+key+'">';
      box.appendChild(wrap);
      wrap.querySelector('input').addEventListener('input',function(e){ state.cfg[key]=e.target.value; draw(); });
    } else {
      wrap.innerHTML='<label>'+label+'</label><input type="text" value="'+esc(v)+'" id="c_'+key+'">';
      box.appendChild(wrap);
      wrap.querySelector('input').addEventListener('input',function(e){ state.cfg[key]=e.target.value; draw(); });
    }
  });
}

function setTemplate(t){
  state.template=t;
  var creative=state.cfg.creative;
  state.cfg=Object.assign({},DEF[kind()],{creative:creative});
  if(t==='vrc'||t==='vrc-pc') state.cfg.showChips=true;
  buildControls(); draw();
}

// ── 소재 입력 ──
function setCreative(url){ state.cfg.creative=url; draw(); }

document.getElementById('img').addEventListener('change',function(e){
  var f=e.target.files[0]; if(!f) return;
  var r=new FileReader(); r.onload=function(){ setCreative(r.result); document.getElementById('vidtools').style.display='none'; }; r.readAsDataURL(f);
});

var vid=document.createElement('video'); vid.muted=true; vid.playsInline=true;
document.getElementById('vidfile').addEventListener('change',function(e){
  var f=e.target.files[0]; if(!f) return;
  vid.src=URL.createObjectURL(f);
  vid.addEventListener('loadeddata',function(){
    document.getElementById('vidtools').style.display='';
    var sl=document.getElementById('scrub'); sl.max=Math.floor(vid.duration*10); sl.value=Math.floor(vid.duration*5);
    captureFrame();
  },{once:true});
});
function captureFrame(){
  var cv=document.createElement('canvas'); cv.width=vid.videoWidth; cv.height=vid.videoHeight;
  cv.getContext('2d').drawImage(vid,0,0); setCreative(cv.toDataURL('image/png'));
}
document.getElementById('scrub').addEventListener('input',function(e){
  vid.currentTime=e.target.value/10; document.getElementById('tstamp').textContent=(e.target.value/10).toFixed(1)+'s';
});
vid.addEventListener('seeked',captureFrame);

// ── 유튜브 URL 소재 ──
function ytId(input){
  var u=String(input||'').trim();
  if(!u) return null;
  if(!/^https?:\/\//i.test(u)) u='https://'+u;
  try{
    var url=new URL(u);
    var h=url.hostname.replace(/^(www|m|music)\./,'');
    if(h==='youtu.be'){ var p=url.pathname.slice(1).split('/')[0]; if(p) return p; }
    if(/(^|\.)youtube(-nocookie)?\.com$/.test(h)){
      if(url.searchParams.get('v')) return url.searchParams.get('v');
      var m=url.pathname.match(/^\/(shorts|embed|live|v)\/([\w-]{6,})/); if(m) return m[2];
    }
  }catch(e){}
  var m2=u.match(/[?&]v=([\w-]{6,})|youtu\.be\/([\w-]{6,})/);
  return m2 ? (m2[1]||m2[2]) : null;
}

// 썸네일 후보를 순서대로 시도 (직접 → CORS 프록시). 1.5KB 미만은 유튜브의 회색 대체이미지로 간주.
function tryThumb(id,names,idx,ok,fail){
  if(idx>=names.length){ fail('사용 가능한 썸네일을 찾지 못했습니다.'); return; }
  var path='i.ytimg.com/vi/'+id+'/'+names[idx]+'.jpg';
  fetch('https://'+path)
    .then(function(r){ if(!r.ok) throw 0; return r.blob(); })
    .catch(function(){
      return fetch('https://images.weserv.nl/?url='+encodeURIComponent(path))
        .then(function(r){ if(!r.ok) throw 0; return r.blob(); });
    })
    .then(function(b){ if(b && b.size>1500) ok(b,names[idx]); else tryThumb(id,names,idx+1,ok,fail); })
    .catch(function(){ tryThumb(id,names,idx+1,ok,fail); });
}

function applyYt(){
  var st=document.getElementById('ytstatus');
  var id=ytId(document.getElementById('yturl').value);
  if(!id){ st.textContent='유튜브 URL을 인식하지 못했습니다. 주소를 확인해주세요.'; return; }
  st.textContent='소재 가져오는 중…';
  var vertical = kind()==='shorts'||kind()==='shortsPc';
  var names = vertical ? ['oardefault','oar2','frame0','maxresdefault','sddefault','hqdefault']
                       : ['maxresdefault','frame0','sddefault','hqdefault'];
  tryThumb(id,names,0,function(blob,name){
    var r=new FileReader();
    r.onload=function(){ setCreative(r.result); document.getElementById('vidtools').style.display='none'; st.textContent='적용 완료 ('+name+')'; };
    r.readAsDataURL(blob);
  },function(msg){ st.textContent='가져오기 실패: '+msg; });
  if(document.getElementById('ytmeta').checked){
    fetch('https://noembed.com/embed?url='+encodeURIComponent('https://www.youtube.com/watch?v='+id))
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(!d||!d.title) return;
        var k=kind();
        if(k==='infeed'||k==='infeedPc') state.cfg.title=d.title;
        if(d.author_name){ state.cfg.sponsor=d.author_name; state.cfg.avatarText=String(d.author_name).charAt(0).toUpperCase(); }
        buildControls(); draw();
      }).catch(function(){});
  }
}
document.getElementById('ytapply').addEventListener('click',applyYt);
document.getElementById('yturl').addEventListener('keydown',function(e){ if(e.key==='Enter') applyYt(); });

// 입력 탭
document.querySelectorAll('.tab').forEach(function(tab){
  tab.onclick=function(){
    document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on');}); tab.classList.add('on');
    ['img','vid','url'].forEach(function(m){ document.getElementById('in-'+m).style.display = m===tab.dataset.m?'':'none'; });
  };
});

document.getElementById('template').addEventListener('change',function(e){ setTemplate(e.target.value); });

// ── PNG 내보내기 ──
document.getElementById('dl').addEventListener('click',function(){
  var node=document.getElementById('stage').firstElementChild;
  var btn=this, old=btn.textContent; btn.textContent='내보내는 중…'; btn.disabled=true;
  html2canvas(node,{scale:3,backgroundColor:null,useCORS:true,logging:false}).then(function(canvas){
    var a=document.createElement('a'); a.href=canvas.toDataURL('image/png'); a.download='게재면_'+state.template+'.png'; a.click();
  }).catch(function(err){ alert('내보내기 실패: '+err.message); })
   .finally(function(){ btn.textContent=old; btn.disabled=false; });
});

setTemplate('vvc');
})();
