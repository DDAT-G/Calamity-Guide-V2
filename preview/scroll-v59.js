/* V59: independent scroll panes; controls remain in the viewport. */
(()=>{
const catalog=$('view-catalog'), layout=catalog.querySelector('.layout'), list=$('results'), panel=$('detail'), search=document.querySelector('.global-results-v47');
layout.tabIndex=0;layout.setAttribute('role','region');layout.setAttribute('aria-label','도감 결과와 상세 정보');
list.tabIndex=0;list.setAttribute('role','region');list.setAttribute('aria-label','도감 검색 결과');
search.tabIndex=0;search.setAttribute('role','region');search.setAttribute('aria-label','통합 검색 결과');
const stateKey=()=>JSON.stringify([table,$('query').value,$('scope').value,itemKind,npcKind,specialFilter,page]);
let lastKey=stateKey();
const oldRender=render;render=function(){const out=oldRender.apply(this,arguments),key=stateKey();if(key!==lastKey){list.scrollTop=0;lastKey=key}return out};
const oldDetail=detail;detail=function(id){panel.scrollTop=0;const out=oldDetail.apply(this,arguments);panel.scrollTop=0;return out};
const oldShow=showView;showView=function(v,scroll=true){const previous=currentView;const out=oldShow(v,scroll);if(scroll&&previous!==v){if(v==='catalog'){layout.scrollTop=0;list.scrollTop=0;panel.scrollTop=0}if(v==='search')search.scrollTop=0;}return out};
$('globalQueryV47').addEventListener('input',()=>{search.scrollTop=0});
document.querySelector('.global-search-form-v47').addEventListener('submit',()=>{search.scrollTop=0});
const style=node('style');style.textContent=`
@media (min-height:500px){
body:has(#view-catalog:not([hidden])),body:has(#view-roadmap:not([hidden])),body:has(#view-search:not([hidden])){height:100vh;height:100dvh;display:flex;flex-direction:column;overflow:hidden}
body:has(#view-catalog:not([hidden])) #main,body:has(#view-roadmap:not([hidden])) #main,body:has(#view-search:not([hidden])) #main{flex:1 1 0;min-height:0;width:100%;margin:0 auto;padding-top:16px;padding-bottom:16px}
body:has(#view-catalog:not([hidden])) .mobile-bar-v43,body:has(#view-roadmap:not([hidden])) .mobile-bar-v43,body:has(#view-search:not([hidden])) .mobile-bar-v43{flex:none}
#view-catalog:not([hidden]),#view-roadmap:not([hidden]),#view-search:not([hidden]){height:100%;min-height:0;display:flex;flex-direction:column}
#view-catalog>.catalog-header,#view-catalog>.filter-panel,#view-roadmap>:not(.road-scroll-v59),#view-search>:not(.global-results-v47){flex:none}
#view-catalog>.catalog-header{margin-bottom:10px}
#view-catalog>.filter-panel{margin-bottom:12px;max-height:44dvh;overflow:auto;overscroll-behavior:contain}
#view-catalog>.layout{flex:1;min-height:0;align-items:stretch;overflow:hidden}
#view-catalog #listPanel{position:relative;top:auto;display:flex;flex-direction:column;min-height:0;min-width:0}
#view-catalog #listPanel>.list-heading,#view-catalog #listPanel>.actions{flex:none}
#view-catalog #results{flex:1;min-height:0;max-height:none;overflow:auto;align-content:start;overscroll-behavior:contain;scrollbar-gutter:stable}
#view-catalog #detail{min-height:0;min-width:0;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable;scroll-padding-top:10px}
#view-catalog #detail .section,#view-catalog #detail .guide-description,#view-catalog #detail .stats,#view-catalog #detail .station-reverse-v41{scroll-margin-top:10px}
#view-roadmap .road-scroll-v59,#view-search .global-results-v47{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable;padding-right:8px;scrollbar-width:thin;scrollbar-color:#54667c transparent;align-content:start}
#view-roadmap .road-jumps-v46{margin:10px 0 12px}
#view-roadmap .road-stage-v46{scroll-margin-top:2px;margin-top:0;margin-bottom:14px}
#view-roadmap .road-scroll-v59>.muted:last-child{margin-bottom:10px}
}
@media (max-width:700px) and (min-height:500px){
#view-catalog>.catalog-header{margin-bottom:6px}
#view-catalog>.catalog-header p{display:none}
#view-catalog>.filter-panel{max-height:40dvh;padding:9px;margin-bottom:8px}
#view-catalog>.layout{display:block;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin}
#view-catalog #listPanel{margin-bottom:12px}
#view-catalog #results{max-height:42dvh;flex:auto}
#view-catalog #detail{overflow:visible;min-height:200px;scroll-margin-top:0}
#view-roadmap>p,#view-search>p{font-size:12px;margin:3px 0}
#view-roadmap .road-jumps-v46{gap:5px;margin:8px 0}
#view-roadmap .road-jumps-v46 button{font-size:12px;padding:5px 8px}
}
#view-catalog #results:focus-visible,#view-catalog>.layout:focus-visible,#view-roadmap .road-scroll-v59:focus-visible,#view-search .global-results-v47:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
`;document.head.append(style);
})();