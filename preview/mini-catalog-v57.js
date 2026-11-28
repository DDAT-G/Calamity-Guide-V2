/* V54: compact contextual catalog popover. No copied catalog data. */
(()=>{
'use strict';
const root=$('view-guides');
const pop=node('section',undefined,'mini-catalog-v54');
pop.id='miniCatalogV57';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-modal','false');pop.setAttribute('aria-labelledby','miniCatalogTitleV57');document.body.append(pop);
let anchor=null,entry=null,trail=[];
const allowed=(t,id)=>['items','npcs'].includes(t)&&!!D[t]?.[id];
const key=(t,id)=>t+'|'+id;
const short=(value,max=190)=>{if(typeof value!=='string')return '';let s=value.trim().replace(/\s+/g,' ');if(s.length<=max)return s;let p=s.lastIndexOf('. ',max);return p>max*.55?s.slice(0,p+1):s.slice(0,max).trimEnd()+'…'};
const aliases=(x)=>[x.ko,x.en,name(x)].filter(v=>typeof v==='string'&&v.trim().length>=2&&v.length<90&&!/[<>\n]/.test(v)).map(v=>v.trim());
const extra={
'CalamityMod/CharredIdol':['Charred Idol','불타버린 우상'],
'CalamityMod/Seafood':['Seafood','해산물'],
'CalamityMod/InfernalSuevite':['Infernal Suevite','불지옥의 수베이트'],
'CalamityMod/RoseStone':['Rose Stone','장미석'],
'CalamityMod/DesertMedallion':['Desert Medallion','사막의 메달'],
'CalamityMod/StarterBag':['Starter Bag','스타터팩'],
'CalamityMod/AerialiteOre':['Aerialite Ore','창공석'],
'CalamityMod/CryonicOre':['Cryonic Ore','냉동석'],
'CalamityMod/AstralOre':['Astral Ore','아스트랄 광석'],
'CalamityMod/PurifiedGel':['Purified Gel','정제된 젤'],
'CalamityMod/AquaticScourgeHead':['Aquatic Scourge','수중의 무법자','바다의 무법자'],
'CalamityMod/BrimstoneElemental':['Brimstone Elemental','유황 정령','브림스톤 엘레멘탈'],
'CalamityMod/DesertScourgeHead':['Desert Scourge','사막의 무법자'],
'Terraria/npcs/396':['Moon Lord','문 로드','달의 군주'],
'Terraria/npcs/113':['Wall of Flesh','월 오브 플레시'],
'Terraria/items/29':['Life Crystal','생명 수정'],
'Terraria/items/54':['Hermes Boots','헤르메스 부츠'],
'Terraria/items/53':['Cloud in a Bottle','병 속 구름'],
'CalamityMod/SlimeGodCore':['The Slime God','슬라임 갓']
};
function names(t,id){const x=D[t]?.[id];return x?[...new Set([...aliases(x),...(extra[id]||[])])]:[]}
const fold=s=>s.toLocaleLowerCase('en-US');
const word=c=>!!c&&/[\p{L}\p{N}_]/u.test(c);
const hangul=c=>!!c&&/[가-힣]/.test(c);
const particles=/^(?:으로부터|에게서|에서는|으로는|이라면|이라도|으로|에서|에게|까지|부터|처럼|보다|하고|이나|라도|이며|이다|입니다|은|는|이|가|을|를|의|에|와|과|도|만|로)(?![가-힣])/;
function boundary(text,start,end,term){
const before=text[start-1],after=text[end];if(word(before))return false;
if(!word(after))return true;
return hangul(after)&&particles.test(text.slice(end));
}
// Match unambiguous, sufficiently specific item names even if the author omitted a reference.
// Common short names only match inside a section with an explicit catalog reference.
const globalNames=new Map();
const generic=new Set(['회복 물약','철피부 물약','기본 무기','보스 소환','나무','목재','작업대','방어구','장신구','발판','광석','상자','재료']);
for(const [id,x] of Object.entries(D.items||{}))for(const a of names('items',id)){
if(generic.has(a)||(!(/\s/.test(a)&&a.length>=6)&&!(/[가-힣]/.test(a)&&a.replace(/\s/g,'').length>=5)))continue;
const k=fold(a),prior=globalNames.get(k);if(prior===undefined)globalNames.set(k,{t:'items',id,a});else if(prior&&prior.id!==id)globalNames.set(k,null);
}
const byFirst=new Map();
for(const [k,v] of globalNames){if(!v)continue;const c=k[0];if(!byFirst.has(c))byFirst.set(c,[]);byFirst.get(c).push({...v,k})}
for(const a of byFirst.values())a.sort((x,y)=>y.k.length-x.k.length);
function localNames(refs){
const map=new Map();
for(const [t,id] of refs){if(!allowed(t,id))continue;for(const a of names(t,id)){const k=fold(a);if(k.length<2)continue;const prior=map.get(k);if(prior===undefined)map.set(k,{t,id,a,k});else if(prior&&(prior.t!==t||prior.id!==id))map.set(k,null)}}
return [...map.values()].filter(Boolean).sort((a,b)=>b.k.length-a.k.length)
}
function matches(text,local){
const lower=fold(text),out=[];for(let i=0;i<text.length;){if(i>0&&word(text[i-1])){i++;continue}
let hit=null;
for(const v of local){if(lower.startsWith(v.k,i)&&boundary(text,i,i+v.k.length,v.a)){hit=v;break}}
for(const v of byFirst.get(lower[i])||[]){if(hit&&v.k.length<=hit.k.length)break;if(lower.startsWith(v.k,i)&&boundary(text,i,i+v.k.length,v.a)){hit=v;break}}
if(hit){out.push({start:i,end:i+hit.k.length,t:hit.t,id:hit.id});i+=hit.k.length}else i++}
return out;
}
function trigger(b,t,id){b.type='button';b.dataset.miniTable=t;b.dataset.miniId=id;b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',pop.id);b.setAttribute('aria-expanded','false');b.title='미니 도감 · '+name(D[t][id]);b.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();if(anchor===b&&!pop.hidden){close(true);return}open(b,t,id)});return b}
function renderText(p,refs){
const local=localNames(refs);const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
for(const n of nodes){if(n.parentElement?.closest('button,a,code,strong'))continue;const text=n.nodeValue||'',hits=matches(text,local);if(!hits.length)continue;const frag=document.createDocumentFragment();let last=0;for(const m of hits){if(m.start>last)frag.append(document.createTextNode(text.slice(last,m.start)));const b=node('button',text.slice(m.start,m.end),'mini-inline-v54');trigger(b,m.t,m.id);frag.append(b);last=m.end}if(last<text.length)frag.append(document.createTextNode(text.slice(last)));n.replaceWith(frag)}
}
function decorate(){
close(false);
for(const sec of root.querySelectorAll('.walk-step-v49')){
const refs=[];for(const b of sec.querySelectorAll('[data-guide-ref-table][data-guide-ref-id]')){const t=b.dataset.guideRefTable,id=b.dataset.guideRefId;if(!allowed(t,id))continue;refs.push([t,id]);b.onclick=null;trigger(b,t,id);b.textContent=name(D[t][id])+' · 미니'}
for(const p of sec.querySelectorAll(':scope > p'))renderText(p,refs);
}
}
function action(parent,label,fn,cls){const b=add(parent,'button',label,cls);b.type='button';b.onclick=fn;return b}
function link(parent,t,id,label){if(!allowed(t,id)){add(parent,'span',label||id);return}const b=action(parent,label||name(D[t][id]),()=>{trail.push(entry);entry={t,id};paint();position();pop.querySelector('.mini-close-v54')?.focus()},'mini-material-v54');return b}
function paragraph(p,label,value){const s=short(value);if(!s)return false;const r=add(p,'p');if(label)add(r,'strong',label+' · ');r.append(document.createTextNode(s));return true}
function recipe(p,x){
const rs=(x.recipes||[]).map(id=>D.recipes?.[id]).filter(Boolean);if(!rs.length)return false;
const r=rs[0];add(p,'h4','대표 등록 제작법'+(rs.length>1?' · 1/'+rs.length:''));
const list=add(p,'ul',undefined,'mini-recipe-v54');
for(const ing of (r.ingredients||[]).slice(0,8)){const li=add(list,'li');if(D.items[ing.id])sprite(li,D.items[ing.id],'mini');link(li,'items',ing.id);add(li,'span','×'+ing.stack,'mini-qty-v54')}
if((r.ingredients||[]).length>8)add(p,'small','나머지 재료는 전체 도감에서 확인','muted');
const stations=(r.tiles||[]).map(k=>D.stationsV41?.tiles?.[k]?.label||String(k));paragraph(p,'제작대',stations.join(' / ')||'지정 없음 · 별도 조건 확인');if(r.stack!==undefined&&r.stack!==1)paragraph(p,'제작 결과',String(r.stack)+'개');
if(r.conditions?.length)paragraph(p,'조건',r.conditions.join(' / '));if(r.groups?.length)paragraph(p,'대체 재료','등록 재료 그룹 있음 · 전체 도감에서 확인');
if(rs.length>1)add(p,'small','다른 제작법 '+(rs.length-1)+'개는 전체 도감에서 확인','muted');
return true;
}
function loot(p,x){const rows=(x.loot||[]).filter(r=>r.source||r.label).slice(0,2);if(!rows.length)return false;add(p,'h4','등록 드롭·개봉 경로');for(const r of rows){const line=add(p,'div',undefined,'mini-loot-v54');link(line,r.kind==='npc'?'npcs':'items',r.source,r.source&&D[r.kind==='npc'?'npcs':'items']?.[r.source]?undefined:r.label||'획득처 미확인');if(r.conditions?.length||r.simple===false)add(line,'small',' · 조건부/복합 보고','muted')}return true}
function paint(){
const {t,id}=entry,x=D[t][id],e=D.editorial?.[id]||{};
pop.replaceChildren();
const header=add(pop,'header',undefined,'mini-head-v54');sprite(header,x,'mini');const namesBox=add(header,'div',undefined,'mini-name-v54');add(namesBox,'small','MINI CATALOG','mini-kicker-v54');const title=add(namesBox,'h3',name(x));title.id='miniCatalogTitleV57';if(x.en&&x.en!==name(x))add(namesBox,'small',x.en,'muted');action(header,'×',()=>close(true),'mini-close-v54').setAttribute('aria-label','미니 도감 닫기');
const main=add(pop,'div',undefined,'mini-content-v54');
const use=t==='items'?(e.usageV35?.use||e.summaryV11||e.effectPreviewV11?.find(v=>typeof v==='string')||e.base||e.authored||e.registrationV18?.text):e.authored;
if(!paragraph(main,t==='items'?'핵심 용도':'소개',use))add(main,'p','요약 설명은 아직 등록되지 않았습니다.','muted');
if(t==='items'){
if(e.miningV30){const v=e.miningV30;add(main,'h4','광석 획득');paragraph(main,'해금',v.generation);paragraph(main,'위치',v.location);paragraph(main,'채광',v.miningCondition)}
else if(e.acquisitionV34||e.acquisitionV14||e.usageV35?.where){add(main,'h4','획득');paragraph(main,'조건',e.acquisitionV34?.gate);paragraph(main,'방법',e.acquisitionV34?.where||e.acquisitionV14||e.usageV35?.where)}
const made=recipe(main,x);if(!made)loot(main,x);
if(!made&&!x.loot?.length&&!e.miningV30&&!e.acquisitionV34&&!e.acquisitionV14&&!e.usageV35?.where)add(main,'p','등록 제작법·획득 경로 없음 · 전체 도감 참고','muted');
}else{
const related=(e.encounterItemsV12||[]).filter(id=>allowed('items',id)).slice(0,3);
if(e.conditions?.length)paragraph(main,'등장',e.conditions.slice(0,2).join(' / '));
if(related.length){add(main,'h4','관련 소환·해금 아이템');for(const id of related)link(main,'items',id)}
}
const foot=add(pop,'footer',undefined,'mini-foot-v54');
if(trail.length)action(foot,'← 이전 항목',()=>{entry=trail.pop();paint();position();pop.querySelector('.mini-close-v54')?.focus()});
action(foot,'전체 도감 보기 →',()=>{const {t,id}=entry;const mode=uiV43.mode,chapter=uiV43.chapters[mode],scroll=window.scrollY;close(false);guideReturnV43={mode,chapter,scroll};openRef(t,id)},'mini-full-v54');
add(pop,'small','도감 등록 자료 요약 · 실제 게임 검증 전','mini-note-v54');
}
function position(){if(pop.hidden||!anchor)return;if(!anchor.isConnected||currentView!=='guides'){close(false);return}const a=anchor.getBoundingClientRect();if(a.bottom<0||a.top>window.innerHeight){close(false);return}const margin=10,w=pop.offsetWidth,h=pop.offsetHeight;const left=Math.max(margin,Math.min(a.left,window.innerWidth-w-margin));const below=a.bottom+9,above=a.top-h-9;const top=below+h<=window.innerHeight-margin?below:above>=margin?above:Math.max(margin,Math.min(below,window.innerHeight-h-margin));pop.style.left=left+'px';pop.style.top=top+'px';pop.style.setProperty('--mini-arrow-x',Math.max(12,Math.min(w-16,a.left+a.width/2-left))+'px');pop.dataset.side=top>=a.bottom?'below':top+h<=a.top?'above':'overlap'}
function open(b,t,id){if(!allowed(t,id))return;close(false);anchor=b;entry={t,id};trail=[];b.setAttribute('aria-expanded','true');paint();pop.hidden=false;position();pop.querySelector('.mini-close-v54')?.focus({preventScroll:true})}
function close(restore){const old=anchor;if(old)old.setAttribute('aria-expanded','false');anchor=null;entry=null;trail=[];pop.hidden=true;if(restore&&old?.isConnected)old.focus({preventScroll:true})}
document.addEventListener('pointerdown',e=>{if(!pop.hidden&&!pop.contains(e.target)&&!anchor?.contains(e.target))close(false)},true);
document.addEventListener('keydown',e=>{if(!pop.hidden&&e.key==='Escape'){e.preventDefault();close(true)}});
window.addEventListener('resize',position);window.addEventListener('scroll',position,{passive:true,capture:true});
const style=node('style');style.textContent='.mini-inline-v54{display:inline!important;appearance:none;background:none!important;border:0!important;box-shadow:none!important;padding:0 1px!important;margin:0;color:#8ce3d1!important;font:inherit;text-decoration:underline dotted;text-underline-offset:3px;cursor:pointer;white-space:normal;text-align:left;vertical-align:baseline}.mini-inline-v54:hover,.mini-inline-v54[aria-expanded=true]{color:#c4fff1!important;text-decoration:underline}.mini-inline-v54:focus-visible{outline:2px solid #8ce3d1;outline-offset:2px;border-radius:2px}.mini-catalog-v54[hidden]{display:none!important}.mini-catalog-v54{position:fixed;z-index:950;width:min(350px,calc(100vw - 20px));max-height:min(510px,calc(100dvh - 20px));display:flex;flex-direction:column;background:#172735;color:#eaf0fa;border:1px solid #528b83;border-radius:12px;box-shadow:0 12px 36px #000a;font-size:13px;line-height:1.6;isolation:isolate}.mini-catalog-v54[data-side=below]::before,.mini-catalog-v54[data-side=above]::before{content:"";position:absolute;left:var(--mini-arrow-x,22px);width:10px;height:10px;background:#172735;border-left:1px solid #528b83;border-top:1px solid #528b83;transform:rotate(45deg);top:-6px;z-index:-1}.mini-catalog-v54[data-side=above]::before{top:auto;bottom:-6px;transform:rotate(225deg)}.mini-head-v54{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #344652;flex:none}.mini-head-v54 .sprite{flex:none;width:40px;height:40px}.mini-name-v54{flex:1;min-width:0;overflow-wrap:anywhere}.mini-head-v54 h3{font-size:16px;margin:0;color:#c6f6ea;line-height:1.4}.mini-kicker-v54{font-size:9px;color:#8ce3d1;letter-spacing:.12em}.mini-close-v54{padding:3px 9px!important;align-self:flex-start;line-height:1.2;font-size:20px!important}.mini-content-v54{padding:12px 14px;overflow:auto;min-height:0;overscroll-behavior:contain}.mini-content-v54 p{margin:4px 0 8px;overflow-wrap:anywhere;word-break:keep-all}.mini-content-v54 h4{font-size:12px;color:#9ee3d2;margin:12px 0 5px}.mini-recipe-v54{margin:0 0 8px;padding:0;list-style:none}.mini-recipe-v54 li{display:flex;align-items:center;gap:6px;margin:4px 0}.mini-recipe-v54 .sprite{width:24px;height:24px;flex:none}.mini-material-v54{padding:0!important;background:none!important;border:0!important;color:#a9e5d4!important;white-space:normal;text-align:left;font-size:inherit!important;text-decoration:underline dotted;cursor:pointer}.mini-qty-v54{margin-left:auto;white-space:nowrap;color:#d4e6ef}.mini-loot-v54{margin:3px 0}.mini-foot-v54{padding:8px 14px;display:flex;gap:8px;align-items:center;justify-content:flex-end;border-top:1px solid #344652;flex:none}.mini-foot-v54 button{font-size:12px;padding:5px 8px}.mini-full-v54{color:#a9e5d4!important}.mini-note-v54{padding:0 14px 9px;font-size:10px;color:#aabccc;flex:none}';document.head.append(style);
const previousRender=renderGuideV43;renderGuideV43=function(){previousRender();decorate()};
const previousShow=showView;showView=function(v,scroll=true){if(v!=='guides')close(false);previousShow(v,scroll)};
const notice=root.querySelector('.guide-notice');const tip=add(notice,'p','본문의 밑줄 친 아이템 이름을 클릭하면 미니 도감이 열립니다.','muted');
document.title='Calamity Guide · 한국어 종합 공략집 V57';$('version').textContent='Calamity '+D.version+' · V57';renderGuideV43();
})();
