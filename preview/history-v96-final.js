/* V47: native browser history for in-page guide navigation. */
(()=>{
const key='calamityNavigationV461',views=['home','catalog','guides','shelf','about','roadmap','search'];
let restoring=false,enabled=true,position=0,scrollTimer,eventTimer,epoch=0;
const browser=window.history;
function capture(){return {reader:currentView==='guides'?window.guideReaderV91?.capture()||null:null,guideReturn:currentView==='catalog'?guideReturnV43:null,view:currentView,globalQuery:$('globalQueryV47').value,table,entry:currentEntry?{...currentEntry}:null,selected,query:$('query').value,scope:$('scope').value,itemKind,npcKind,specialFilter,page,compact,mode:uiV43.mode,chapter:uiV43.chapters[uiV43.mode],y:window.scrollY,listY:$('results').scrollTop,detailY:$('detail').scrollTop,catalogY:document.querySelector('#view-catalog .layout').scrollTop,roadY:$('roadScrollV59').scrollTop,searchY:document.querySelector('.global-results-v47').scrollTop,details:currentView==='catalog'?[...$('detail').querySelectorAll('details')].map(d=>d.open):[]}}
function cleanNav(s){
 if(!s||!views.includes(s.view))return null;
 const own=(o,k)=>!!o&&typeof k==='string'&&Object.prototype.hasOwnProperty.call(o,k);
 const str=(v,max=500)=>typeof v==='string'?v.slice(0,max):'';
 const pos=v=>Number.isFinite(v)?Math.max(0,v):0;
 const int=v=>Number.isSafeInteger(v)&&v>=0?v:0;
 const choice=(v,a,f)=>a.includes(v)?v:f;
 const mode=choice(s.mode,modesV43,uiV43.mode),chapter=Math.min(int(s.chapter),guideModesV43[mode].chapters.length-1);
 const t=choice(s.table,['items','npcs'],'items');
 let selected=own(D[t],s.selected)?s.selected:null,entry=null;
 if(s.entry?.table===t&&own(D[t],s.entry.id)){
  const root=t==='npcs'?encounterRoot(s.entry.id):s.entry.id;
  if(own(D[t],root)&&selected===root)entry={table:t,id:s.entry.id};
 }
 if(selected&&t==='npcs'){const root=encounterRoot(selected);selected=own(D[t],root)?root:null}
 if(selected&&!entry)entry={table:t,id:selected};
 const r=s.guideReturn;let guideReturn=null;
 if(s.view==='catalog'&&r&&modesV43.includes(r.mode)&&Number.isInteger(r.chapter)&&r.chapter>=0&&r.chapter<guideModesV43[r.mode].chapters.length)guideReturn={mode:r.mode,chapter:r.chapter,scroll:pos(r.scroll),reader:r.reader||null};
 return {...s,mode,chapter,table:t,selected,entry,guideReturn,reader:s.view==='guides'?s.reader||null:null,globalQuery:str(s.globalQuery),query:str(s.query),scope:choice(s.scope,['all','calamity','vanilla'],'all'),itemKind:choice(s.itemKind,['all','weapon','armor','accessory','material','consumable','tool','placeable','ammo','summon','other'],'all'),npcKind:choice(s.npcKind,['all','npc','boss','enemy','other'],'all'),specialFilter:t==='items'?choice(s.specialFilter,['','ore','mining'],''):'',page:int(s.page),compact:s.compact===true,y:pos(s.y),listY:pos(s.listY),detailY:pos(s.detailY),catalogY:pos(s.catalogY),roadY:pos(s.roadY),searchY:pos(s.searchY),details:Array.isArray(s.details)?s.details.map(v=>v===true):[]};
}
function route(s){return JSON.stringify(s.view==='catalog'?[s.view,s.table,s.entry?.id||s.selected]:s.view==='guides'?[s.view,s.mode,s.chapter]:[s.view])}
function put(s,push=false){if(!enabled)return;try{const n=push?position+1:position;browser[push?'pushState':'replaceState']({...browser.state,[key]:{position:n,s}},'');position=n}catch(e){enabled=false;console.warn('Browser history unavailable',e)}}
function controls(){const b=$('detail').querySelector('[data-back]');if(!b)return;if(!enabled){b.disabled=!historyV42.length;b.textContent='← 이전 항목';b.onclick=backEntry;return}b.disabled=position===0;b.textContent='← 이전 페이지';b.onclick=()=>{if(position>0)browser.back()}}
const oldDecorate=decorateControls;decorateControls=function(){oldDecorate();controls()};
// Defer to a later task, not a microtask: trusted DOM dispatch can run microtasks between listeners.
// Capture-phase scheduling survives stopPropagation and replaced DOM nodes.
function settle(token){
 if(restoring||!enabled||token!==epoch)return;
 const prev=browser.state?.[key]?.s,s=capture();
 put(s,!!prev&&route(prev)!==route(s));controls();
}
function interaction(e){
 if(restoring||!enabled)return;
 clearTimeout(scrollTimer);clearTimeout(eventTimer);
 const token=++epoch;
 // Input/change handlers see the already edited value; keep the last complete
 // pre-edit state instead of mixing new input with the old selected entry.
 if(e.type==='click'||e.type==='submit'||e.type==='keydown')put(capture());
 eventTimer=setTimeout(()=>settle(token),0);
}
for(const type of ['click','submit','change','input','keydown','toggle'])document.addEventListener(type,interaction,true);
function restore(s){s=cleanNav(s);if(!s)return;restoring=true;++epoch;clearTimeout(scrollTimer);clearTimeout(eventTimer);try{guideReturnV43=null;uiV43.mode=modesV43.includes(s.mode)?s.mode:uiV43.mode;if(Number.isInteger(s.chapter)&&s.chapter>=0&&s.chapter<guideModesV43[uiV43.mode].chapters.length)uiV43.chapters[uiV43.mode]=s.chapter;if(s.view==='catalog'){
guideReturnV43=s.guideReturn;
setTable(s.table==='npcs'?'npcs':'items');setItemKind(s.itemKind||'all');setNpcKind(s.npcKind||'all');specialFilter=s.specialFilter||'';$('scope').value=s.scope||'all';$('query').value=s.query||'';page=s.page||0;compact=!!s.compact;$('results').classList.toggle('compact',compact);$('toggleList').setAttribute('aria-pressed',String(compact));$('toggleList').textContent=compact?'카드형 보기':'목록형 보기';selected=s.selected;currentEntry=s.entry;if(selected&&!matching().some(x=>x.id===selected)){selected=null;currentEntry=null}showView('catalog',false);if(selected){detail(selected);if(table==='npcs'&&currentEntry){const c=document.getElementById('part-'+currentEntry.id)||document.getElementById('child-'+npcRoot(currentEntry.id));if(c)c.classList.add('part-highlight')}if(Array.isArray(s.details))$('detail').querySelectorAll('details').forEach((d,i)=>{if(i<s.details.length)d.open=s.details[i]})}else emptyDetail();$('results').scrollTop=s.listY||0;
}else{if(s.view==='search')$('globalQueryV47').value=s.globalQuery||'';showView(s.view,false)}controls();$('detail').scrollTop=s.detailY||0;document.querySelector('#view-catalog .layout').scrollTop=s.catalogY||0;$('roadScrollV59').scrollTop=s.roadY||0;document.querySelector('.global-results-v47').scrollTop=s.searchY||0;window.scrollTo({top:s.y||0,behavior:'instant'});if(s.view==='guides'&&s.reader)window.guideReaderV91?.restore(s.reader);}finally{restoring=false}}
window.addEventListener('popstate',e=>{const v=e.state?.[key];++epoch;clearTimeout(scrollTimer);clearTimeout(eventTimer);if(!v||!Number.isSafeInteger(v.position)||v.position<0)return;position=v.position;restore(v.s)});
window.addEventListener('scroll',()=>{if(restoring||!enabled)return;clearTimeout(scrollTimer);const token=epoch;scrollTimer=setTimeout(()=>{if(!restoring&&token===epoch)put(capture())},150)},{passive:true,capture:true});
window.addEventListener('pagehide',()=>{if(!restoring&&enabled){clearTimeout(scrollTimer);clearTimeout(eventTimer);settle(epoch)}});
const oldShow=showView;showView=function(v,scroll=true){if(v!=='catalog')guideReturnV43=null;return oldShow(v,scroll)};
const saved=browser.state?.[key];if(saved&&Number.isSafeInteger(saved.position)&&saved.position>=0&&cleanNav(saved.s)){position=saved.position;restore(saved.s)}else put(capture());try{browser.scrollRestoration='manual'}catch(e){}controls();
document.title='Calamity Guide · 한국어 종합 공략집 V47';$('version').textContent='Calamity '+D.version+' · V47';
})();
