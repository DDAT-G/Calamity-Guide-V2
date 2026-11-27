/* V47: native browser history for in-page guide navigation. */
(()=>{
const key='calamityNavigationV461',views=['home','catalog','guides','shelf','about','roadmap','search'];
let restoring=false,enabled=true,position=0,scrollTimer;
const browser=window.history;
function capture(){return {view:currentView,globalQuery:$('globalQueryV47').value,table,entry:currentEntry?{...currentEntry}:null,selected,query:$('query').value,scope:$('scope').value,itemKind,npcKind,specialFilter,page,compact,mode:uiV43.mode,chapter:uiV43.chapters[uiV43.mode],y:window.scrollY,listY:$('results').scrollTop,details:currentView==='catalog'?[...$('detail').querySelectorAll('details')].map(d=>d.open):[]}}
function route(s){return JSON.stringify(s.view==='catalog'?[s.view,s.table,s.entry?.id||s.selected]:s.view==='guides'?[s.view,s.mode,s.chapter]:[s.view])}
function put(s,push=false){if(!enabled)return;try{const n=push?position+1:position;browser[push?'pushState':'replaceState']({...browser.state,[key]:{position:n,s}},'');position=n}catch(e){enabled=false;console.warn('Browser history unavailable',e)}}
function controls(){if(!enabled)return;const b=$('detail').querySelector('[data-back]');if(b){b.disabled=position===0;b.textContent='← 이전 페이지';b.onclick=()=>{if(position>0)browser.back()}}}
const oldDecorate=decorateControls;decorateControls=function(){oldDecorate();controls()};
function before(){if(!restoring&&enabled)put(capture())}
function after(){if(restoring||!enabled)return;const prev=browser.state?.[key]?.s;const s=capture();put(s,!!prev&&route(prev)!==route(s));controls()}
for(const type of ['click','submit','change','input']){document.addEventListener(type,before,true);document.addEventListener(type,after)}
function restore(s){if(!s||!views.includes(s.view))return;restoring=true;clearTimeout(scrollTimer);try{guideReturnV43=null;uiV43.mode=modesV43.includes(s.mode)?s.mode:uiV43.mode;if(Number.isInteger(s.chapter))uiV43.chapters[uiV43.mode]=s.chapter;if(s.view==='catalog'){
setTable(s.table==='npcs'?'npcs':'items');setItemKind(s.itemKind||'all');setNpcKind(s.npcKind||'all');specialFilter=s.specialFilter||'';$('scope').value=s.scope||'all';$('query').value=s.query||'';page=s.page||0;compact=!!s.compact;$('results').classList.toggle('compact',compact);$('toggleList').setAttribute('aria-pressed',String(compact));$('toggleList').textContent=compact?'카드형 보기':'목록형 보기';selected=D[table]?.[s.selected]?s.selected:null;currentEntry=s.entry?.table===table&&D[table]?.[s.entry.id]?s.entry:null;showView('catalog',false);if(selected){detail(selected);if(table==='npcs'&&currentEntry){const c=document.getElementById('part-'+currentEntry.id)||document.getElementById('child-'+npcRoot(currentEntry.id));if(c)c.classList.add('part-highlight')}if(Array.isArray(s.details))$('detail').querySelectorAll('details').forEach((d,i)=>{if(i<s.details.length)d.open=s.details[i]})}else emptyDetail();$('results').scrollTop=s.listY||0;
}else{if(s.view==='search')$('globalQueryV47').value=s.globalQuery||'';showView(s.view,false)}controls();window.scrollTo({top:s.y||0,behavior:'instant'});}finally{restoring=false}}
window.addEventListener('popstate',e=>{const v=e.state?.[key];if(!v)return;position=v.position;restore(v.s)});
window.addEventListener('scroll',()=>{if(restoring||!enabled)return;clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{if(!restoring)put(capture())},150)},{passive:true});
const saved=browser.state?.[key];if(saved&&Number.isInteger(saved.position)){position=saved.position;restore(saved.s)}else put(capture());try{browser.scrollRestoration='manual'}catch(e){}controls();
document.title='Calamity Guide · 한국어 종합 공략집 V47';$('version').textContent='Calamity '+D.version+' · V47';
})();
