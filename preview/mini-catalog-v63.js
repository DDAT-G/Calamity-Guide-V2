/* V54: compact contextual catalog popover. No copied catalog data. */
(()=>{
'use strict';
const root=$('view-guides');
const pop=node('section',undefined,'mini-catalog-v54');
pop.id='miniCatalogV58';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-modal','false');pop.setAttribute('aria-labelledby','miniCatalogTitleV58');document.body.append(pop);
let anchor=null,entry=null,trail=[];
const allowed=(t,id)=>['items','npcs'].includes(t)&&!!D[t]?.[id];
const key=(t,id)=>t+'|'+id;
const short=(value,max=190)=>{if(typeof value!=='string')return '';let s=value.trim().replace(/\s+/g,' ');if(s.length<=max)return s;let p=s.lastIndexOf('. ',max);return p>max*.55?s.slice(0,p+1):s.slice(0,max).trimEnd()+'…'};
const aliases=(x)=>[x.ko,x.en,x.raw,name(x)].filter(v=>typeof v==='string'&&v.trim().length>=1&&v.length<90&&!/[<>\n]/.test(v)).map(v=>v.trim());
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
/* V63: use the full registered item index, not a length-limited subset. */
const fold=s=>s.toLocaleLowerCase('en-US');
const word=c=>!!c&&/[\p{L}\p{N}_]/u.test(c);
const hangul=c=>!!c&&/[가-힣]/.test(c);
const particles=/^(?:으로부터|에서부터|에게서는|에게서|에서는|으로는|으로도|으로만|이라면|이라도|이라서|이라고|이라든지|이라는|이라며|이라고도|이라|로부터|으로써|으로서|으로|에서|에게|한테|까지|부터|처럼|보다|하고|이나|이랑|랑|나|라도|이며|이고|인|이다|입니다|용으로|용도|용|은|는|이|가|을|를|의|에|와|과|도|만|로)(?![가-힣])/;
function boundary(text,start,end){
if(word(text[start-1]))return false;
return !word(text[end])||(hangul(text[end])&&particles.test(text.slice(end)));
}
const allItems=Object.entries(D.items||{}), enIndex=new Map(), added=new Map();
for(const [id,x] of allItems){if(typeof x.en!=='string')continue;const k=fold(x.en.trim());if(!enIndex.has(k))enIndex.set(k,[]);enIndex.get(k).push(id)}
function addAlias(id,a){if(!D.items[id]||!a)return;if(!added.has(id))added.set(id,new Set());added.get(id).add(a)}
/* Explicit alternate names used in the actual walkthrough, resolved by the registered
   English name. Never create a synthetic catalog entry or guess a numeric ID. */
const alternate={
'Wood':['목재','나무'],'Stone Block':['돌','돌 블록'],'Gel':['젤'],
'Torch':['횃불'],'Work Bench':['작업대'],'Iron Anvil':['철 모루','모루'],'Lead Anvil':['납 모루','모루'],
'Wood Platform':['나무 발판','발판'],'Wooden Platform':['나무 발판','발판'],'Rope':['밧줄'],
'Healing Potion':['회복 물약'],'Lesser Healing Potion':['하급 회복 물약'],'Recall Potion':['귀환 물약'],
'Fallen Star':['떨어진 별','떨어지는 별'],'Mana Crystal':['마나 수정'],'Life Crystal':['생명 수정'],'Life Fruit':['생명 열매'],
'Campfire':['모닥불'],'Heart Lantern':['하트 랜턴'],'Ironskin Potion':['철피부 물약'],'Regeneration Potion':['재생 물약'],'Swiftness Potion':['신속 물약'],
'Gravitation Potion':['중력 물약'],'Obsidian Skin Potion':['흑요석 피부 물약'],'Bottle':['병'],'Bottled Water':['물병','병에 담긴 물'],
'Wooden Door':['나무 문'],'Wooden Chair':['나무 의자'],'Chest':['상자'],'Gold Chest':['황금 상자'],'Frozen Chest':['설원 상자'],
'Iron Ore':['철 광석'],'Lead Ore':['납 광석'],'Gold Ore':['금 광석'],'Platinum Ore':['백금 광석'],
'Iron Bar':['철 주괴'],'Lead Bar':['납 주괴'],'Gold Bar':['금 주괴'],'Platinum Bar':['백금 주괴'],
'Gold Broadsword':['금 브로드소드'],'Platinum Broadsword':['백금 브로드소드'],
'Gold Bow':['금 활'],'Platinum Bow':['백금 활'],'Wooden Bow':['나무 활'],'Wooden Arrow':['나무 화살'],'Jester’s Arrow':['광대의 화살'],"Jester's Arrow":['광대의 화살'],
'Enchanted Sword':['마법의 검'],'Wand of Sparking':['반짝임의 완드'],'Amethyst Staff':['자수정 지팡이'],
'Flurry Boots':['플러리 부츠'],'Hermes Boots':['헤르메스 부츠'],'Cloud in a Bottle':['병 속 구름'],
'Cobweb':['거미줄'],'Silk':['비단'],'Loom':['베틀'],'Sand Block':['모래'],'Cactus':['선인장'],
'Lens':['렌즈'],'Suspicious Looking Eye':['수상한 눈'],'Shield of Cthulhu':['크툴루의 방패'],
'Slime Crown':['슬라임 왕관'],'Gold Crown':['금 왕관'],'Platinum Crown':['백금 왕관'],'Slime Hook':['슬라임 갈고리'],
'Coral':['산호'],'Seashell':['조개껍데기'],'Starfish':['불가사리'],'Glowing Mushroom':['발광 버섯'],
'Demonite Ore':['악마석'],'Crimtane Ore':['진홍석'],'Shadow Scale':['그림자 비늘'],'Tissue Sample':['조직 표본'],
'Nightmare Pickaxe':['악몽의 곡괭이','악몽 곡괭이'],'Deathbringer Pickaxe':['죽음의 인도자 곡괭이'],'Feather':['깃털'],'Bee Wax':['밀랍'],
'Golden Key':['황금 열쇠'],'Shadow Key':['그림자 열쇠'],'Shadow Chest':['그림자 상자'],
'Hellstone':['지옥석'],'Hellstone Bar':['지옥석 주괴'],'Obsidian':['흑요석'],'Hellforge':['지옥 화로'],
'Solidifier':['슬라임 제작대'],'Guide Voodoo Doll':['가이드 부두 인형'],'Demon Heart':['악마의 심장'],
'Gelatin Crystal':['젤라틴 크리스탈'],'Soul of Flight':['비행의 영혼'],'Soul of Light':['빛의 영혼'],'Soul of Night':['밤의 영혼'],'Soul of Sight':['시야의 영혼'],'Soul of Might':['힘의 영혼'],'Soul of Fright':['공포의 영혼'],
'Spider Fang':['거미 송곳니'],'Temple Key':['사원 열쇠'],'Lihzahrd Power Cell':['리자드 파워 셀'],'Picksaw':['픽소우'],'Beetle Husk':['딱정벌레 껍질'],
'Luminite':['루미나이트'],'Luminite Bar':['루미나이트 주괴'],'Ancient Manipulator':['고대의 매니퓰레이터'],
'Hallowed Bar':['신성한 주괴'],'Chlorophyte Ore':['녹조류 광석'],'Chlorophyte Bar':['녹조류 주괴'],
'Mechanical Eye':['기계 눈'],'Mechanical Worm':['기계 지렁이'],'Mechanical Skull':['기계 해골'],
'Power Cell':['파워 셀'],'Draedon Power Cell':['파워 셀'],'Draedon’s Power Cell':['파워 셀'],"Draedon's Power Cell":['파워 셀'],
'Wulfrum Metal Scrap':['울프럼 금속 파편','울프럼 파편'],'Energy Core':['에너지 코어'],
'Stormlion Mandible':['스톰라이언 턱'],'Aerialite Bar':['창공석 주괴'],'Pearl Shard':['진주 파편'],'Ashes of Calamity':['재앙의 잿가루'],
'Perennial Ore':['다년생 광석'],'Perennial Bar':['다년생 주괴'],'Hallowed Ore':['신성한 광석']
};
for(const [en,values] of Object.entries(alternate))for(const id of enIndex.get(fold(en))||[])for(const a of values)addAlias(id,a);
for(const [en,ko] of [['Cobalt','코발트'],['Palladium','팔라듐'],['Mythril','미스릴'],['Orichalcum','오리칼쿰'],['Adamantite','아다만타이트'],['Titanium','티타늄']]){
for(const suffix of ['Ore','Bar','Pickaxe','Anvil','Forge'])for(const id of enIndex.get(fold(en+' '+suffix))||[]){const korean={Ore:'광석',Bar:'주괴',Pickaxe:'곡괭이',Anvil:'모루',Forge:'제련로'}[suffix];addAlias(id,ko+' '+korean);if(suffix==='Ore'||suffix==='Bar')addAlias(id,ko)}
}
const armorSets=[['Victide','빅타이드'],['Aerospec','창공석'],['Wulfrum','울프럼'],['Statigel','스태티젤'],['Desert Prowler','사막 방랑자'],['Daedalus','다이달로스'],['Reaver','리버'],['Crystal Assassin','크리스탈 암살자'],['Spider','거미'],['Bee','벌'],['Beetle','딱정벌레'],['Spectre','스펙터'],['Shroomite','쉬루마이트'],['Tiki','티키'],['Spooky','으스스'],['Hallowed','신성'],['Astral','아스트랄'],['Empyrean','엠피리언'],['Solar Flare','태양 플레어'],['Vortex','볼텍스'],['Nebula','성운'],['Stardust','스타더스트']];
for(const [en,ko] of armorSets){const prefix=fold(en)+' ';for(const [id,x] of allItems){if(!Array.isArray(x.categories)||!x.categories.includes('armor')||!fold(x.en||'').startsWith(prefix))continue;for(const a of [en+' armor',en+' 방어구',ko+' 방어구',en+' 세트',ko+' 세트'])addAlias(id,a)}}
for(const [en,ko] of [['Solar','태양'],['Vortex','볼텍스'],['Nebula','성운'],['Stardust','스타더스트']])for(const id of enIndex.get(fold(en+' Fragment'))||[]){addAlias(id,en+' 파편');addAlias(id,ko+' 파편')}
const single=new Set(['젤','돌']);
const generic=new Set(['무기','방어구','장신구','재료','광석','주괴','도구','아이템','보스','몬스터','이벤트','물약','날개','곡괭이','도끼','검','활','화살','총','지팡이','탄약','머리','몸통','다리','손','눈','벽','문','의자','공격','회복','마법','소환','근접','원거리','로그','강화','정리','제작','탐험','선택','조건','사용','지상','지하','물','불','밤','낮','별']);
function names(t,id){const x=D[t]?.[id];if(!x)return[];const all=[...aliases(x),...(extra[id]||[]),...(t==='items'?[...(added.get(id)||[])]:[])];const out=new Set();for(const a of all){if(!a||!a.trim())continue;out.add(a.trim());if(/[가-힣]/.test(a)&&/ /.test(a)&&!/[A-Za-z]/.test(a))out.add(a.replace(/\s+/g,''))}return [...out]}
function insert(map,k,t,id,a){let v=map.get(k);if(!v){v={k,a,entries:[]};map.set(k,v)}if(!v.entries.some(e=>e.id===id&&e.t===t))v.entries.push({t,id})}
const globalNames=new Map();
for(const [id] of allItems)for(const a of names('items',id)){const k=fold(a);if((k.length<2&&!single.has(a))||/^[\d\s\p{P}\p{S}]+$/u.test(k)||generic.has(a))continue;insert(globalNames,k,'items',id,a)}
function buckets(map){const b=new Map();for(const v of map.values()){const c=v.k[0];if(!b.has(c))b.set(c,[]);b.get(c).push(v)}for(const list of b.values())list.sort((a,b)=>b.k.length-a.k.length);return b}
const byFirst=buckets(globalNames);
function localNames(refs){const map=new Map();for(const [t,id] of refs){if(!allowed(t,id))continue;for(const a of names(t,id)){const k=fold(a);if(k.length<2&&!single.has(a)||generic.has(a))continue;insert(map,k,t,id,a)}}return buckets(map)}
/* Shared suffix shorthand: e.g. 철피부·재생·신속 물약 or 금/백금 활.
   Link each displayed term only if every expanded name resolves in the catalog. */
function sharedNames(text,local){
const out=new Map();
const re=/(?<![\p{L}\p{N}_])((?:[가-힣A-Za-z]+(?:\s*[·/]\s*|\s+또는\s+|\s+및\s+)){1,6}[가-힣A-Za-z]+)\s+(물약|광석|주괴|곡괭이|브로드소드|활|왕관|파편)(?![A-Za-z0-9_])/gu;
for(const m of text.matchAll(re)){const parts=[...m[1].matchAll(/[가-힣A-Za-z]+/g)].filter(x=>!['또는','및'].includes(x[0]));const resolved=parts.map(x=>{const k=fold(x[0]+' '+m[2]);return (local.get(k[0])||[]).find(v=>v.k===k)||globalNames.get(k)});if(resolved.some(x=>!x))continue;
for(let j=0;j<parts.length;j++){const p=parts[j],start=m.index+p.index,end=j===parts.length-1?m.index+m[0].length:start+p[0].length;if(!boundary(text,start,end))continue;out.set(start,{start,end,entries:resolved[j].entries})}
}return out
}
function matches(text,local){const lower=fold(text),out=[],shared=sharedNames(text,local);for(let i=0;i<text.length;){if(shared.has(i)){const h=shared.get(i);out.push(h);i=h.end;continue}if(i>0&&word(text[i-1])){i++;continue}
let hit=null;
for(const v of local.get(lower[i])||[]){if(lower.startsWith(v.k,i)&&boundary(text,i,i+v.k.length)){hit=v;break}}
for(const v of byFirst.get(lower[i])||[]){if(hit&&v.k.length<=hit.k.length){if(v.k===hit.k&&/(?: armor| 방어구| 세트)$/i.test(v.a)&&v.entries.length>hit.entries.length)hit=v;break}if(lower.startsWith(v.k,i)&&boundary(text,i,i+v.k.length)){hit=v;break}}
if(hit){out.push({start:i,end:i+hit.k.length,entries:hit.entries});i+=hit.k.length}else i++}
return out}
function trigger(b,t,id){b.type='button';b.dataset.miniTable=t;b.dataset.miniId=id;b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',pop.id);b.setAttribute('aria-expanded','false');b.title='미니 도감 · '+name(D[t][id]);b.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();if(anchor===b&&!pop.hidden){close(true);return}open(b,t,id)});return b}
function triggerChoices(b,entries){
 b.type='button';b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',pop.id);b.setAttribute('aria-expanded','false');b.title='도감 항목 선택';
 b.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();if(anchor===b&&!pop.hidden){close(true);return}close(false);anchor=b;trail=[];b.setAttribute('aria-expanded','true');pop.replaceChildren();
 const h=add(pop,'header',undefined,'mini-head-v54'),names=add(h,'div',undefined,'mini-name-v54');const title=add(names,'h3',b.textContent);title.id='miniCatalogTitleV58';action(h,'×',()=>close(true),'mini-close-v54').setAttribute('aria-label','닫기');
 const body=add(pop,'div',undefined,'mini-content-v54');add(body,'p','관련 도감 항목을 선택하세요.','muted');for(const e of entries){if(!allowed(e.t,e.id))continue;const x=D[e.t][e.id];const row=add(body,'div',undefined,'mini-choice-v63');sprite(row,x,'mini');const btn=action(row,name(x),()=>{entry=e;paint();position();pop.querySelector('.mini-close-v54')?.focus({preventScroll:true})},'mini-material-v54');add(row,'small',x.owner==='Terraria'?'바닐라':'칼라미티','muted')}
 pop.hidden=false;position();pop.querySelector('.mini-close-v54')?.focus({preventScroll:true})});
}
function renderText(p,refs){
const local=localNames(refs);const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
for(const n of nodes){if(n.parentElement?.closest('button,a,code'))continue;const text=n.nodeValue||'',hits=matches(text,local);if(!hits.length)continue;const frag=document.createDocumentFragment();let last=0;for(const m of hits){if(m.start>last)frag.append(document.createTextNode(text.slice(last,m.start)));const b=node('button',text.slice(m.start,m.end),'mini-inline-v54');if(m.entries.length===1)trigger(b,m.entries[0].t,m.entries[0].id);else triggerChoices(b,m.entries);frag.append(b);last=m.end}if(last<text.length)frag.append(document.createTextNode(text.slice(last)));n.replaceWith(frag)}
}
function decorate(){
close(false);
for(const sec of root.querySelectorAll('.walk-step-v49')){
const refs=[];for(const b of sec.querySelectorAll('[data-guide-ref-table][data-guide-ref-id]')){const t=b.dataset.guideRefTable,id=b.dataset.guideRefId;if(!allowed(t,id))continue;refs.push([t,id]);b.onclick=null;trigger(b,t,id);b.textContent=name(D[t][id])}
for(const p of sec.querySelectorAll(':scope > p,:scope > h3,:scope > ul li'))renderText(p,refs);
}
for(const p of root.querySelectorAll('.walk-done-v49 li,#guideChapterDescV43,#guideChapterTitleV43'))renderText(p,[]);
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
const header=add(pop,'header',undefined,'mini-head-v54');sprite(header,x,'mini');const namesBox=add(header,'div',undefined,'mini-name-v54');add(namesBox,'small','MINI CATALOG','mini-kicker-v54');const title=add(namesBox,'h3',name(x));title.id='miniCatalogTitleV58';action(header,'×',()=>close(true),'mini-close-v54').setAttribute('aria-label','미니 도감 닫기');
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
const style=node('style');style.textContent='.mini-inline-v54{display:inline!important;appearance:none;background:none!important;border:0!important;box-shadow:none!important;padding:0 1px!important;margin:0;color:#8ce3d1!important;font:inherit;text-decoration:underline dotted;text-underline-offset:3px;cursor:pointer;white-space:normal;text-align:left;vertical-align:baseline}.mini-inline-v54:hover,.mini-inline-v54[aria-expanded=true]{color:#c4fff1!important;text-decoration:underline}.mini-inline-v54:focus-visible{outline:2px solid #8ce3d1;outline-offset:2px;border-radius:2px}.mini-catalog-v54[hidden]{display:none!important}.mini-catalog-v54{position:fixed;z-index:950;width:min(350px,calc(100vw - 20px));max-height:min(510px,calc(100dvh - 20px));display:flex;flex-direction:column;background:#172735;color:#eaf0fa;border:1px solid #528b83;border-radius:12px;box-shadow:0 12px 36px #000a;font-size:13px;line-height:1.6;isolation:isolate}.mini-catalog-v54[data-side=below]::before,.mini-catalog-v54[data-side=above]::before{content:"";position:absolute;left:var(--mini-arrow-x,22px);width:10px;height:10px;background:#172735;border-left:1px solid #528b83;border-top:1px solid #528b83;transform:rotate(45deg);top:-6px;z-index:-1}.mini-catalog-v54[data-side=above]::before{top:auto;bottom:-6px;transform:rotate(225deg)}.mini-head-v54{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #344652;flex:none}.mini-head-v54 .sprite{flex:none;width:40px;height:40px}.mini-name-v54{flex:1;min-width:0;overflow-wrap:anywhere}.mini-head-v54 h3{font-size:16px;margin:0;color:#c6f6ea;line-height:1.4}.mini-kicker-v54{font-size:9px;color:#8ce3d1;letter-spacing:.12em}.mini-close-v54{padding:3px 9px!important;align-self:flex-start;line-height:1.2;font-size:20px!important}.mini-content-v54{padding:12px 14px;overflow:auto;min-height:0;overscroll-behavior:contain}.mini-content-v54 p{margin:4px 0 8px;overflow-wrap:anywhere;word-break:keep-all}.mini-content-v54 h4{font-size:12px;color:#9ee3d2;margin:12px 0 5px}.mini-recipe-v54{margin:0 0 8px;padding:0;list-style:none}.mini-recipe-v54 li{display:flex;align-items:center;gap:6px;margin:4px 0}.mini-recipe-v54 .sprite{width:24px;height:24px;flex:none}.mini-material-v54{padding:0!important;background:none!important;border:0!important;color:#a9e5d4!important;white-space:normal;text-align:left;font-size:inherit!important;text-decoration:underline dotted;cursor:pointer}.mini-qty-v54{margin-left:auto;white-space:nowrap;color:#d4e6ef}.mini-loot-v54{margin:3px 0}.mini-foot-v54{padding:8px 14px;display:flex;gap:8px;align-items:center;justify-content:flex-end;border-top:1px solid #344652;flex:none}.mini-foot-v54 button{font-size:12px;padding:5px 8px}.mini-full-v54{color:#a9e5d4!important}.mini-note-v54{padding:0 14px 9px;font-size:10px;color:#aabccc;flex:none}';style.textContent+='.mini-choice-v63{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #344652}.mini-choice-v63 .sprite{width:30px;height:30px;flex:none}.mini-choice-v63 button{flex:1;text-align:left}.mini-choice-v63 small{font-size:10px;white-space:nowrap}';document.head.append(style);
const previousRender=renderGuideV43;renderGuideV43=function(){previousRender();decorate()};
const previousShow=showView;showView=function(v,scroll=true){if(v!=='guides')close(false);previousShow(v,scroll)};
const notice=root.querySelector('.guide-notice');const tip=add(notice,'p','본문의 밑줄 친 아이템 이름을 클릭하면 미니 도감이 열립니다.','muted');
document.title='Calamity Guide · 한국어 종합 공략집 V63';$('version').textContent='Calamity '+D.version+' · V63';renderGuideV43();
})();
