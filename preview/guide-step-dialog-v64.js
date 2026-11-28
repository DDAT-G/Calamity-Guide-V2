/* V64: compact step cards and isolated, paginated step reader. */
(()=>{
const root=$('view-guides'),container=root.querySelector('.walkthrough-v49'),mini=window.guideMiniV64;
const modes={beginner:'뉴비',normal:'일반',advanced:'심화'};
const pageKinds={beginner:'실행 단계',normal:'진행 경로',advanced:'전략 판단'};
const dialog=node('dialog',undefined,'walk-dialog-v64');dialog.id='walkDialogV64';dialog.setAttribute('aria-labelledby','walkDialogTitleV64');document.body.append(dialog);
const top=add(dialog,'header',undefined,'walk-dialog-head-v64'),topText=add(top,'div'),crumb=add(topText,'small',undefined,'kicker'),title=add(topText,'h2');title.id='walkDialogTitleV64';
const x=add(top,'button','×');x.type='button';x.setAttribute('aria-label','스텝 설명 닫기');
const content=add(dialog,'div',undefined,'walk-dialog-scroll-v64');
const footer=add(dialog,'footer',undefined,'walk-dialog-foot-v64'),prev=add(footer,'button','← 이전'),pagination=add(footer,'div',undefined,'walk-pagination-v64'),next=add(footer,'button','다음 →','primary');prev.type=next.type='button';
let context=null,page=0,opener=null,pages=[];
const uniq=refs=>[...new Map((refs||[]).filter(r=>D[r[0]]?.[r[1]]).map(r=>[r.join('|'),r])).values()];
function buttonRef(parent,t,id,withImage=false){
 const obj=D[t]?.[id];if(!obj)return;
 const b=add(parent,'button',undefined,withImage?'walk-visual-ref-v64':'link');b.type='button';
 if(withImage)sprite(b,obj,'mini');add(b,'span',name(obj));mini.bind(b,t,id);return b
}
function firstSentence(s,max=115){const t=(s||'').trim();const end=t.search(/[.!?](?:\s|$)/);const a=end>=0?t.slice(0,end+1):t;return a.length>max?a.slice(0,max-1).trimEnd()+'…':a}
function svgEl(tag,attrs={},text){const a=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v] of Object.entries(attrs))a.setAttribute(k,v);if(text!==undefined)a.textContent=text;return a}
function schematic(parent,kind){
 const fig=add(parent,'figure',undefined,'walk-figure-v64');
 const svg=svgEl('svg',{viewBox:'0 0 520 230',role:'img','aria-label':kind==='house'?'NPC 집 구성 예시':kind==='cave'?'동굴 안전 이동 예시':'제작대 순서 예시'});fig.append(svg);
 const rect=(x,y,w,h,fill,stroke='#426079')=>svg.append(svgEl('rect',{x,y,width:w,height:h,rx:4,fill,stroke}));
 const label=(x,y,t,fs=13,anchor='middle',color='#dcebf3')=>svg.append(svgEl('text',{x,y,'font-size':fs,'text-anchor':anchor,fill:color,'font-family':'system-ui,sans-serif'},t));
 const line=(x1,y1,x2,y2,color='#90e0ca')=>svg.append(svgEl('line',{x1,y1,x2,y2,stroke:color,'stroke-width':2,'stroke-dasharray':'5 3'}));
 rect(0,0,520,230,'#0e1925');
 if(kind==='house'){
  rect(54,39,266,153,'#70513d','#c6996a');rect(68,53,238,125,'#423c39','#9a785c');
  for(let y=67;y<177;y+=17)for(let xx=74;xx<300;xx+=23)rect(xx,y,19,13,'#524740','#625349');
  rect(288,123,18,55,'#c49659');rect(105,143,73,9,'#c99b62');rect(110,152,7,26,'#c99b62');rect(166,152,7,26,'#c99b62');
  rect(203,151,25,7,'#c99b62');rect(203,130,5,21,'#c99b62');rect(207,158,5,20,'#c99b62');
  svg.append(svgEl('circle',{cx:179,cy:76,r:11,fill:'#ffd57c',opacity:.9}));rect(176,83,6,13,'#b37c47');
  for(const [a,b,c,d,t] of [[68,44,358,32,'외벽·바닥'],[230,106,358,77,'배경 벽'],[179,76,358,109,'횃불'],[296,150,358,140,'문'],[175,151,358,176,'작업대·의자']]){line(a,b,c,d);label(c+9,d+4,t,12,'start')}
 }else if(kind==='cave'){
  rect(28,27,458,177,'#393b40');rect(52,40,100,34,'#142333');rect(126,60,58,95,'#142333');rect(145,136,238,50,'#142333');rect(353,105,78,81,'#142333');
  for(let y=76;y<147;y+=17)rect(149,y,5,12,'#ad8757');
  for(const xx of [200,234,268])rect(xx,161,28,5,'#b7905c');rect(395,142,20,20,'#9a6d3f','#e0b36e');svg.append(svgEl('path',{d:'M 339 150 L 349 140 L 359 150 L 349 166 Z',fill:'#dd737e'}));
  line(87,56,150,110);line(152,110,152,160);line(154,160,340,160);
  label(92,22,'입구',12);label(125,112,'밧줄',12);label(244,198,'발판과 횃불로 복귀 동선 확보',12);label(402,92,'상자',12);label(350,133,'생명 수정',12)
 }else{
  for(const [j,t,sub] of [[0,'작업대','화로 제작'],[1,'화로','광석 → 주괴'],[2,'모루','금속 장비 제작']]){const xx=24+j*171;rect(xx,68,132,97,'#1b3441','#5a928a');label(xx+66,105,t,18);label(xx+66,137,sub,12);if(j<2)label(xx+151,120,'→',22)}
  label(260,36,'초반 제작 환경 확장',16)
 }
 add(fig,'figcaption','설명용 개념도 · 실제 게임 화면이 아닙니다.','muted');
}
function pagesFor(mode,ch,idx,section){
 const refs=uniq(section.refs),custom=ch===0?guideExtraV64[mode]?.[idx]:null;
 const result=section.lines.map((line,j)=>({kind:'text',title:line.label,text:line.text,detail:custom?.[j]?.[1],detailTitle:custom?.[j]?.[0],art:custom?.[j]?.[2]}));
 if(custom?.length>section.lines.length)for(const v of custom.slice(section.lines.length))result.push({kind:'text',title:v[0],text:v[1],art:v[2]});
 if(refs.length)for(let j=0;j<refs.length;j+=5)result.push({kind:'refs',title:mode==='advanced'?'투자 후보와 재료':mode==='normal'?'준비할 장비와 재료':'관련 아이템 및 획득 정보',refs:refs.slice(j,j+5)});
 return result.length?result:[{kind:'text',title:section.title,text:'현재 이 단계의 추가 설명은 준비 중입니다.'}]
}
function visualRefs(parent,refs){if(!refs.length)return;const box=add(parent,'div',undefined,'walk-visual-grid-v64');for(const [t,id] of refs)buttonRef(box,t,id,true)}
function itemDetail(parent,t,id){
 const x=D[t][id],e=D.editorial?.[id]||{},box=add(parent,'article',undefined,'walk-object-v64');
 buttonRef(box,t,id,true);
 const summary=t==='items'?(e.usageV35?.use||e.summaryV11||e.registrationV18?.text||e.authored||e.effectPreviewV11?.[0]):e.authored;
 if(typeof summary==='string'&&summary.trim()){const p=add(box,'p',firstSentence(summary,155));mini.inline(p,[[t,id]])}
 if(t==='items'){
 const r=(x.recipes||[]).map(id=>D.recipes?.[id]).find(Boolean);
 if(r){add(box,'h4','대표 제작법');const row=add(box,'div',undefined,'walk-ingredient-v64');for(const a of (r.ingredients||[]).slice(0,8)){const el=add(row,'div');buttonRef(el,'items',a.id,true);add(el,'small','×'+a.stack,'muted')}if((r.ingredients||[]).length>8)add(box,'small','나머지 재료는 미니 도감에서 확인하세요.','muted');const station=(r.tiles||[]).map(k=>D.stationsV41?.tiles?.[k]?.label).filter(Boolean).join(' / ');if(station)add(box,'p','제작대 · '+station,'muted')}
 else if(e.acquisitionV34?.where||e.acquisitionV14||e.usageV35?.where){const p=add(box,'p',firstSentence(e.acquisitionV34?.where||e.acquisitionV14||e.usageV35?.where,155));mini.inline(p,[[t,id]])}
 }else if(e.conditions?.length){const p=add(box,'p',e.conditions.slice(0,2).join(' · '));mini.inline(p,[[t,id]])}
}
function draw(n){
 if(!context)return;mini.close();page=Math.max(0,Math.min(pages.length-1,n));const p=pages[page],{mode,ch,idx,section}=context,refs=uniq(section.refs);
 crumb.textContent=modes[mode]+' · '+(ch+1)+'장 · '+pageKinds[mode]+' '+String(idx+1).padStart(2,'0');title.textContent=section.title;
 content.replaceChildren();const cap=add(content,'div',undefined,'walk-page-cap-v64');add(cap,'span','PAGE '+String(page+1).padStart(2,'0')+' / '+String(pages.length).padStart(2,'0'));const bar=add(cap,'progress');bar.max=pages.length;bar.value=page+1;bar.setAttribute('aria-label','팝업 읽기 진행');
 const h=add(content,'h3',p.title);mini.inline(h,refs);
 if(p.kind==='refs'){add(content,'p','아이템을 선택하면 미니 도감이 열립니다. 제작법은 현재 도감에 등록된 대표 경로입니다.','muted');const list=add(content,'div',undefined,'walk-object-grid-v64');for(const [t,id] of p.refs)itemDetail(list,t,id)}
 else{
 const text=add(content,'p',p.text,'walk-page-copy-v64');mini.inline(text,refs);
 if(p.detail){const block=add(content,'section',undefined,'walk-practical-v64');const h=add(block,'h4',p.detailTitle);mini.inline(h,refs);const copy=add(block,'p',p.detail);mini.inline(copy,refs)}
 if(p.art)schematic(content,p.art);
 const matched=uniq(mini.related([p.title,p.text,p.detailTitle,p.detail].filter(Boolean).join(' '),refs)).slice(0,6);
 if(matched.length){add(content,'h4','이 페이지에 등장한 항목');visualRefs(content,matched)}
 }
 pagination.replaceChildren();for(let j=0;j<pages.length;j++){const b=add(pagination,'button',String(j+1));b.type='button';b.setAttribute('aria-label',(j+1)+'페이지: '+pages[j].title);if(j===page)b.setAttribute('aria-current','step');b.onclick=()=>draw(j)}
 prev.disabled=page===0;next.textContent=page===pages.length-1?'닫기':'다음 →';content.scrollTop=0;
}
function dismiss(){mini.unmount();if(dialog.open)dialog.close();document.body.classList.remove('walk-open-v64');const b=opener;context=null;opener=null;if(b?.isConnected&&currentView==='guides')b.focus({preventScroll:true})}
function openStep(mode,ch,idx,section,b){context={mode,ch,idx,section};opener=b;pages=pagesFor(mode,ch,idx,section);mini.mount(dialog);draw(0);dialog.showModal();document.body.classList.add('walk-open-v64');x.focus({preventScroll:true})}
x.onclick=dismiss;prev.onclick=()=>draw(page-1);next.onclick=()=>page===pages.length-1?dismiss():draw(page+1);
dialog.addEventListener('cancel',e=>{e.preventDefault();if(mini.isOpen())mini.close();else dismiss()});
dialog.addEventListener('close',()=>{if(!dialog.open&&context)dismiss()});
dialog.addEventListener('keydown',e=>{if(e.defaultPrevented||mini.isOpen()||e.target.closest('input,select,textarea'))return;if(e.key==='ArrowLeft'){e.preventDefault();draw(page-1)}else if(e.key==='ArrowRight'){e.preventDefault();draw(page+1)}});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismiss()});
function cards(){
 if(dialog.open)dismiss();
 const mode=uiV43.mode,ch=uiV43.chapters[mode],chapter=walkthroughModesV52[mode]?.[ch];if(!chapter)return;
 container.replaceChildren();
 const grid=add(container,'div',undefined,'walk-cards-v64');
 chapter.sections.forEach((section,idx)=>{
 const refs=uniq(section.refs),card=add(grid,'article',undefined,'walk-card-v64');
 add(card,'div',pageKinds[mode]+' '+String(idx+1).padStart(2,'0'),'walk-num-v49');const h=add(card,'h3',section.title);mini.inline(h,refs);
 const p=add(card,'p',firstSentence(section.lines[0]?.text),'walk-card-copy-v64');mini.inline(p,refs);
 if(refs.length){const icons=add(card,'div',undefined,'walk-card-refs-v64');for(const [t,id] of refs.slice(0,4))buttonRef(icons,t,id,true);if(refs.length>4)add(icons,'small','+'+(refs.length-4),'muted')}
 const foot=add(card,'div',undefined,'walk-card-foot-v64');add(foot,'small',pagesFor(mode,ch,idx,section).length+'페이지','muted');const b=add(foot,'button','자세히 보기 →','walk-open-button-v64');b.type='button';b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',dialog.id);b.setAttribute('aria-label',section.title+' 자세히 보기');b.onclick=()=>openStep(mode,ch,idx,section,b);
 });
 const end=add(container,'section',undefined,'walk-done-v49');add(end,'h3',mode==='beginner'?'다음 단계로 넘어가기 전':mode==='normal'?'완료 기준':'전환 판단');const ul=add(end,'ul');for(const t of chapter.done){const li=add(ul,'li',t);mini.inline(li,[])}
 const notice=root.querySelector('.guide-notice');notice.querySelector('strong').textContent='스텝별 상세 공략';notice.querySelector('p').textContent='각 스텝의 자세히 보기를 눌러 해당 단계의 설명을 페이지별로 읽으세요. 실제 게임 검증은 진행 중입니다.';
 for(const e of notice.querySelectorAll('p:nth-of-type(n+2)'))e.remove();
 add(notice,'p','아이템 이름을 누르면 미니 도감이 열립니다.','muted');
 root.querySelector('.guide-outline-v43 > p').textContent='1~6장 · 버전별 독립 공략';
}
const oldRender=renderGuideV43;renderGuideV43=function(){oldRender.apply(this,arguments);cards()};
const oldShow=showView;showView=function(v,scroll=true){if(dialog.open)dismiss();return oldShow(v,scroll)};
const style=node('style');style.textContent=
'.walk-cards-v64{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:12px}.walk-card-v64{display:flex;flex-direction:column;gap:8px;min-width:0;padding:17px;border:1px solid #344652;border-radius:12px;background:#14212e}.walk-card-v64 h3{font-size:19px;margin:0;line-height:1.45}.walk-card-v64 .walk-card-copy-v64{font-size:14px;color:#c0d1df;line-height:1.65;margin:0}.walk-card-v64 .walk-num-v49{margin:0}.walk-card-refs-v64{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.walk-card-refs-v64 .walk-visual-ref-v64{padding:4px 7px;font-size:11px;max-width:100%}.walk-card-refs-v64 .sprite{width:20px;height:20px;flex:none}.walk-card-foot-v64{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:10px;padding-top:10px}.walk-open-button-v64{border-color:#416b67;color:#a9ebdb;font-size:13px;padding:7px 11px}.walk-open-v64{overflow:hidden}.walk-dialog-v64{width:min(880px,calc(100vw - 24px));max-height:calc(100dvh - 28px);padding:0;border:1px solid #497c77;border-radius:16px;background:#111d2b;color:#e5edf5;overflow:visible;box-shadow:0 24px 90px #0009}.walk-dialog-v64[open]{display:flex;flex-direction:column}.walk-dialog-v64::backdrop{background:#050b13d9;backdrop-filter:blur(4px)}.walk-dialog-head-v64,.walk-dialog-foot-v64{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 22px;background:#142333;flex:none}.walk-dialog-head-v64{border-radius:15px 15px 0 0;border-bottom:1px solid #314654}.walk-dialog-head-v64 h2{font-size:clamp(18px,2.5vw,25px);line-height:1.35;margin:0;overflow-wrap:anywhere}.walk-dialog-head-v64 small{display:block;font-size:11px;margin-bottom:4px;letter-spacing:.05em}.walk-dialog-head-v64>button{font-size:23px;padding:4px 11px;flex:none}.walk-dialog-scroll-v64{min-height:0;overflow:auto;overscroll-behavior:contain;padding:clamp(16px,3vw,30px);flex:1 1 auto;min-width:0}.walk-dialog-scroll-v64 h3{font-size:clamp(23px,3vw,31px);line-height:1.35;margin:8px 0 16px}.walk-dialog-scroll-v64 h4{font-size:15px;color:#a6dfcf;margin:16px 0 7px}.walk-dialog-scroll-v64 p{font-size:15px;line-height:1.8;word-break:keep-all;overflow-wrap:anywhere}.walk-page-cap-v64{display:flex;gap:12px;align-items:center;color:#a6dfcf;font-size:11px;letter-spacing:.08em}.walk-page-cap-v64 progress{width:95px;height:7px;accent-color:#9ae0cb}.walk-page-copy-v64{font-size:17px!important;line-height:1.9!important}.walk-practical-v64{background:#172938;border-left:3px solid #7dc9b7;border-radius:7px;padding:14px 16px;margin:15px 0}.walk-practical-v64 h4{margin:0 0 7px}.walk-practical-v64 p{margin:0}.walk-visual-grid-v64,.walk-ingredient-v64{display:flex;gap:8px;flex-wrap:wrap}.walk-visual-ref-v64{display:inline-flex;align-items:center;gap:8px;text-align:left;min-width:0;max-width:100%;padding:7px 10px;font-size:13px;color:#b8eddf;background:#192d3a;border-color:#3f625f}.walk-visual-ref-v64 span:last-child{overflow-wrap:anywhere}.walk-visual-ref-v64 .sprite{width:32px;height:32px;flex:none}.walk-object-grid-v64{display:grid;gap:12px}.walk-object-v64{padding:13px;border:1px solid #344652;border-radius:10px;background:#142532}.walk-object-v64>p{font-size:13px;margin:7px 0}.walk-object-v64 h4{margin:10px 0 6px}.walk-ingredient-v64>div{display:flex;align-items:center;gap:4px}.walk-ingredient-v64 .walk-visual-ref-v64{font-size:12px;padding:5px}.walk-ingredient-v64 .sprite{width:24px;height:24px}.walk-figure-v64{margin:18px 0}.walk-figure-v64 svg{display:block;width:100%;max-width:560px;height:auto;margin:auto;border-radius:10px}.walk-figure-v64 figcaption{text-align:center;font-size:11px;margin-top:6px}.walk-dialog-foot-v64{border-radius:0 0 15px 15px;border-top:1px solid #314654}.walk-dialog-foot-v64>button{padding:8px 12px;white-space:nowrap}.walk-pagination-v64{display:flex;gap:5px;flex-wrap:wrap;justify-content:center}.walk-pagination-v64 button{font-size:12px;min-width:29px;padding:4px 8px}.walk-pagination-v64 [aria-current=step]{background:#a5e3d1;color:#10202a;border-color:#a5e3d1}@media(max-width:540px){.walk-dialog-head-v64,.walk-dialog-foot-v64{padding:11px 13px}.walk-dialog-foot-v64{flex-wrap:wrap}.walk-pagination-v64{order:3;width:100%}.walk-page-copy-v64{font-size:15px!important}.walk-card-v64{padding:13px}}';
document.head.append(style);renderGuideV43();
})();
