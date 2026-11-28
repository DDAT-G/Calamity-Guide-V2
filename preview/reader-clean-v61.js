/* V61: reader-focused display. Source data remains intact for attribution and audit. */
(()=>{
const main=$('main'), pop=$('miniCatalogV58');
const sourceBlock='.guide-source,.walk-source-v49,.tutorial-source-v483,.drop-raw-v37,.recipe-condition-v38,.review-visible-v38,.stat-review-v33';
const sourceHeading=/^(?:부위 )?출처(?: 및|·| |$)|^채광 정보 출처|^설명 근거|^게임 원문|^참고 (?:문서|자료)|^등록 조건 원문|^게임 등록 제작 조건 원문/;
const sourceText=/^(?:설명|채광 정보|세트 효과|전투 기믹) 검수 등급:|^획득 설명 C ·|^사용 조건 C ·|^채광력 등록값 B ·|^등록 드롭 대조 |^등록 제작법 대조 |^등록 consumable=|^한글패치 원문:|^공식 위키 변경 기록 기준 ·|^문서 및 등록값 기반 ·/;
const labels=new Map([['주의 및 추가 검수','주의 사항'],['등록 툴팁에 적힌 효과 (실제 동작 미검증)','효과'],['자료 불일치 · 추가 검수','확인 필요'],['공식 버전 변경 기록','버전 변경 기록']]);
function clean(root){
 if(!root||root.nodeType!==1||root.closest('#creditsV61'))return;
 if(root.matches(sourceBlock)){root.remove();return}
 for(const e of root.querySelectorAll(sourceBlock))e.remove();
 for(const e of root.querySelectorAll('details')){const title=e.querySelector(':scope > summary')?.textContent.trim()||'';if(sourceHeading.test(title))e.remove()}
 for(const e of root.querySelectorAll('a[href]')){
  let u;try{u=new URL(e.href,location.href)}catch{continue}
  if(/(?:^|\.)wiki\.gg$|(?:^|\.)fandom\.com$/.test(u.hostname)||/출처|근거 문서|위키 원문|위키 문서|제작 그룹 API 문서/.test(e.textContent)){
   const p=e.parentElement,next=e.nextSibling;
   e.remove();if(next?.nodeType===1&&next.tagName==='SPAN'&&/^[\s·]*$/.test(next.textContent))next.remove();
   if(p?.matches('p,.row')&&!p.querySelector('button,img,a')&&/^(?:참고:)?[\s·]*$/.test(p.textContent))p.remove();
  }
 }
 for(const e of root.querySelectorAll('small,p,div.muted,h4,strong')){
  if(e.children.length)continue;
  const t=e.textContent.trim();
  if(sourceText.test(t)){e.remove();continue}
  if(labels.has(t))e.textContent=labels.get(t);
 }
 for(const b of root.querySelectorAll('.detail-jumps button'))if(sourceHeading.test(b.textContent.trim()))b.remove();
}
const oldRender=render;render=function(){const out=oldRender.apply(this,arguments);clean($('results'));return out};
const oldDetail=detail;detail=function(){const out=oldDetail.apply(this,arguments);clean($('detail'));return out};
const oldGuide=renderGuideV43;renderGuideV43=function(){const out=oldGuide.apply(this,arguments);clean($('view-guides'));return out};
const oldShow=showView;showView=function(){const out=oldShow.apply(this,arguments);const view=$('view-'+currentView);clean(view);return out};
clean(main);clean(pop);
for(const d of document.querySelectorAll('.tutorial-v48'))clean(d);
const observer=new MutationObserver(records=>{
 const roots=new Set();
 for(const r of records){if(!r.addedNodes.length)continue;const t=r.target.nodeType===1?r.target:r.target.parentElement;
  if(!t||t.closest('#creditsV61'))continue;
  const root=t.closest('#detail,#results,#view-guides,#view-roadmap,#view-about,#view-search,.tutorial-v48,#miniCatalogV58');
  if(root)roots.add(root);
  for(const n of r.addedNodes)if(n.nodeType===1&&n.matches('.tutorial-v48'))roots.add(n);
 }for(const r of roots)clean(r)
});
observer.observe(document.body,{childList:true,subtree:true});
const side=document.querySelector('.side-bottom');
const creditButton=add(side,'button','자료 이용 안내','credits-link-v61');creditButton.type='button';
const dialog=add(document.body,'dialog',undefined,'credits-dialog-v61');dialog.id='creditsV61';dialog.setAttribute('aria-labelledby','creditsTitleV61');
const head=add(dialog,'div',undefined,'credits-head-v61');const h=add(head,'h2','자료 이용 안내');h.id='creditsTitleV61';const close=add(head,'button','닫기');close.type='button';close.onclick=()=>dialog.close();
const body=add(dialog,'div',undefined,'credits-body-v61');
add(body,'p','이 사이트는 비공식 비상업용 한국어 공략집입니다. 위키에서 이용한 자료는 원저자 및 기여자에게 귀속되며, 번역·요약·편집한 부분이 포함됩니다.');
for(const [title,url,license,licenseUrl] of [
 ['Calamity Mod Wiki 기여자','https://calamitymod.wiki.gg/wiki/Calamity_Mod_Wiki:Copyrights','CC BY-NC-SA 3.0','https://creativecommons.org/licenses/by-nc-sa/3.0/'],
 ['Terraria Wiki 기여자','https://terraria.wiki.gg/wiki/Terraria_Wiki:Copyrights','CC BY-NC-SA 4.0','https://creativecommons.org/licenses/by-nc-sa/4.0/']
]){const p=add(body,'p');const a=add(p,'a',title);a.href=url;a.target='_blank';a.rel='noopener noreferrer';p.append(document.createTextNode(' · '));const lic=add(p,'a',license);lic.href=licenseUrl;lic.target='_blank';lic.rel='noopener noreferrer'}
add(body,'p','위키의 해당 라이선스가 적용되는 번역·편집 자료에는 원자료의 조건이 적용됩니다. 게임 이미지 및 한글패치 등 별도 권리 자료의 공개 권한은 추가 확인이 필요합니다. 실제 게임 동작과 자료 정확성도 검증 중입니다.','muted');
add(body,'h3','참고 문서 색인');add(body,'p','도감 및 진행 공략의 자료 기록에서 확인할 수 있는 위키 문서를 모았습니다. 일반 화면에서는 표시하지 않습니다.','muted');
const q=add(body,'input');q.type='search';q.placeholder='문서명 또는 항목명 검색';q.setAttribute('aria-label','참고 문서 검색');
const list=add(body,'div',undefined,'credits-list-v61');const nav=add(body,'div',undefined,'credits-nav-v61');const prev=add(nav,'button','이전');const count=add(nav,'span');const next=add(nav,'button','다음');let entries=null,page=0;
function build(){
 const map=new Map(),wiki='https://calamitymod.wiki.gg/wiki/';
 function record(url,label){
  if(typeof url!=='string'||!/^https?:\/\//.test(url))return;
  let u;try{u=new URL(url)}catch{return}
  if(!/(?:^|\.)wiki\.gg$|(?:^|\.)fandom\.com$/.test(u.hostname))return;
  let title;try{title=decodeURIComponent(u.pathname.split('/').pop()).replaceAll('_',' ')}catch{title=u.pathname}
  const k=u.href;const e=map.get(k)||{url:k,title,labels:new Set()};if(label)e.labels.add(label);map.set(k,e)
 }
 function walk(obj,label){if(typeof obj==='string'){if(obj.startsWith('http'))record(obj,label);return}if(!obj||typeof obj!=='object')return;if(Array.isArray(obj)){for(const x of obj)walk(x,label);return}if(typeof obj.title==='string'&&(obj.rev||obj.revision)){record(wiki+encodeURIComponent(obj.title.replaceAll(' ','_'))+'?oldid='+encodeURIComponent(obj.rev||obj.revision),label)}for(const [k,v] of Object.entries(obj))if(!['image','sprite','texture','stats','raw','tooltip'].includes(k))walk(v,label)}
 for(const t of ['items','npcs'])for(const [id,x] of Object.entries(D[t]||{})){const label=name(x);for(const w of x.wiki||[])if(w.title)record(wiki+encodeURIComponent(w.title.replaceAll(' ','_'))+(w.rev?'?oldid='+encodeURIComponent(w.rev):''),label);walk(D.editorial?.[id],label);walk(D.guideDescriptions?.[id],label)}
 for(const modes of Object.values(walkthroughModesV52))for(const chapter of modes)for(const s of chapter.sections)for(const u of s.sources||[])record(u,s.title);
 for(const line of tutorialPagesV481.trim().split('\n')){const p=line.split('|');for(const u of (p[5]||'').split(','))if(u&&!u.startsWith('@'))record(wiki+u,p[1])}
 walk(D.decraftAuditV39?.sources,'쉬머 분해');
 for(const [path,label] of [['Bosses','보스 로드맵'],['Mod_progression','진행 공략'],['Difficulty_Modes','난이도']])record(wiki+path,label);
 return [...map.values()].sort((a,b)=>a.title.localeCompare(b.title)).map(e=>({...e,labels:[...e.labels].join(' · ')}))
}
function draw(){const key=normalizeSearch(q.value);const found=entries.filter(e=>!key||normalizeSearch(e.title+' '+e.labels).includes(key));const max=Math.max(0,Math.ceil(found.length/40)-1);page=Math.min(page,max);list.replaceChildren();for(const e of found.slice(page*40,page*40+40)){const row=add(list,'div');const a=add(row,'a',e.title);a.href=e.url;a.target='_blank';a.rel='noopener noreferrer';if(e.labels)add(row,'small',e.labels,'muted')}count.textContent=(page+1)+' / '+(max+1)+' · '+found.length+'개';prev.disabled=page===0;next.disabled=page>=max}
q.oninput=()=>{page=0;draw()};prev.onclick=()=>{page--;draw();list.scrollTop=0};next.onclick=()=>{page++;draw();list.scrollTop=0};
creditButton.onclick=()=>{dialog.showModal();if(!entries)entries=build();draw()};
const style=node('style');style.textContent='.credits-link-v61{font-size:11px;padding:5px 8px;text-align:left;background:transparent;color:var(--muted)}.credits-dialog-v61{width:min(720px,calc(100vw - 24px));max-height:90dvh;overflow:auto;background:#14212e;color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:18px}.credits-dialog-v61::backdrop{background:#000a}.credits-head-v61,.credits-nav-v61{display:flex;justify-content:space-between;align-items:center;gap:12px}.credits-head-v61 h2{margin:0}.credits-body-v61{margin-top:16px}.credits-body-v61 input{width:100%;min-width:0}.credits-list-v61{max-height:36dvh;overflow:auto;margin:12px 0}.credits-list-v61>div{padding:7px 0;border-bottom:1px solid var(--line)}.credits-list-v61 small{display:block;overflow-wrap:anywhere}.credits-dialog-v61 a{color:var(--accent)}';document.head.append(style);
})();
