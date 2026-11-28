/* V64: compact step cards and isolated, paginated step reader. */
(()=>{
const root=$('view-guides'),container=root.querySelector('.walkthrough-v49'),mini=window.guideMiniV64;
const modes={beginner:'뉴비',normal:'일반',advanced:'심화'};
const pageKinds={beginner:'STEP',normal:'STEP',advanced:'STEP'};
const dialog=node('dialog',undefined,'walk-dialog-v64');dialog.id='walkDialogV64';dialog.setAttribute('aria-labelledby','walkDialogTitleV64');document.body.append(dialog);
const top=add(dialog,'header',undefined,'walk-dialog-head-v64'),topText=add(top,'div'),crumb=add(topText,'small',undefined,'kicker'),title=add(topText,'h2');title.id='walkDialogTitleV64';
const topRight=add(top,'div',undefined,'walk-step-status-v65'),stepStatus=add(topRight,'span'),x=add(topRight,'button','×');x.type='button';x.setAttribute('aria-label','스텝 설명 닫기');
const stepRail=add(dialog,'nav',undefined,'walk-step-rail-v65');stepRail.setAttribute('aria-label','현재 챕터 스텝 이동');
const content=add(dialog,'div',undefined,'walk-dialog-scroll-v64');
const footer=add(dialog,'footer',undefined,'walk-dialog-foot-v64'),prev=add(footer,'button','← 이전'),pagination=add(footer,'div',undefined,'walk-pagination-v64'),next=add(footer,'button','다음 →','primary');prev.type=next.type='button';
let context=null,page=0,opener=null,pages=[],returnState=null;const expandedGuideRefs=new Set();let refSerial=0;
const stepLabel=n=>'STEP '+String(n+1).padStart(2,'0');
function stepInfo(mode,ch,idx){const sections=walkthroughModesV52[mode]?.[ch]?.sections||[];return {sections,previous:sections[idx-1]||null,next:sections[idx+1]||null}}
function navigationState(page,total,idx,count){return {previous:page>0?'page':idx>0?'step':'none',next:page<total-1?'page':idx<count-1?'step':'finish'}}
const uniq=refs=>[...new Map((refs||[]).filter(r=>D[r[0]]?.[r[1]]).map(r=>[r.join('|'),r])).values()];
function buttonRef(parent,t,id,withImage=false){
 const obj=D[t]?.[id];if(!obj)return;
 const b=add(parent,'button',undefined,withImage?'walk-visual-ref-v64':'link');b.type='button';
 if(withImage)sprite(b,obj,'mini');add(b,'span',name(obj));mini.bind(b,t,id);return b
}
function firstSentence(s,max=115){const t=(s||'').trim();const end=t.search(/[.!?](?:\s|$)/);const a=end>=0?t.slice(0,end+1):t;return a.length>max?a.slice(0,max-1).trimEnd()+'…':a}
function pagesFor(mode,ch,idx,section){
 const refs=uniq(section.refs),custom=mode==='advanced'&&ch<6?null:guideExtraV88[mode]?.[ch]?.[idx];
 const result=section.lines.map((line,j)=>({kind:'text',title:line.label,text:line.text,detail:custom?.[j]?.[1],detailTitle:custom?.[j]?.[0],art:custom?.[j]?.[2]}));
 if(custom?.length>section.lines.length)for(const v of custom.slice(section.lines.length))result.push({kind:'text',title:v[0],text:v[1],art:v[2]});
 if(refs.length&&!(mode==='advanced'&&ch<6))for(let j=0;j<refs.length;j+=5)result.push({kind:'refs',title:mode==='advanced'?'투자 후보와 재료':mode==='normal'?'준비할 장비와 재료':'관련 아이템 및 획득 정보',refs:refs.slice(j,j+5)});
 return result.length?result:[{kind:'text',title:section.title,text:'현재 이 단계의 추가 설명은 준비 중입니다.'}]
}
function resolveGuideRef(ref){
 const sections=walkthroughModesV52[ref.mode]?.[ref.ch]?.sections||[];
 const matching=sections.map((section,idx)=>({section,idx})).filter(x=>x.section.title===ref.step);
 if(matching.length!==1)return null;
 const {section,idx}=matching[0],matches=section.lines.map((line,j)=>({line,j})).filter(x=>x.line.label===ref.topic);
 if(matches.length!==1)return null;
 const {line,j}=matches[0],p=pagesFor(ref.mode,ref.ch,idx,section)[j];
 if(!p||p.kind!=='text')return null;
 return {mode:ref.mode,ch:ref.ch,idx,section,page:j,p,structured:guideStructuredV88[[ref.mode,ref.ch,idx,j].join('/')]};
}
function findGuideRefs(block,anchor){
 if(!context||context.mode!=='advanced'||returnState)return null;
 const key=[context.mode,context.ch,context.idx,page].join('/')+'|'+block.title+'|'+anchor;
 const sources=(guideRefsV88[key]||[]).map(resolveGuideRef).filter(Boolean);
 return sources.length?{key,sources}:null;
}
function jumpToGuideRef(src){
 if(!context||returnState)return;
 mini.close();returnState={context,page,scroll:content.scrollTop};
 context={mode:src.mode,ch:src.ch,idx:src.idx,section:src.section};
 pages=pagesFor(src.mode,src.ch,src.idx,src.section);draw(src.page);
 content.querySelector('.walk-ref-return-v71 button')?.focus({preventScroll:true});
}
function returnToGuideOrigin(){
 if(!returnState)return;
 mini.close();const origin=returnState;returnState=null;context=origin.context;
 pages=pagesFor(context.mode,context.ch,context.idx,context.section);draw(origin.page);
 content.scrollTop=origin.scroll;
}
function renderGuideRefPanel(panel,entry){
 for(const src of entry.sources){
 const article=add(panel,'article',undefined,'walk-ref-source-v71');
 const head=add(article,'div',undefined,'walk-ref-source-head-v71');
 add(head,'small',modes[src.mode]+' 공략 · CHAPTER '+String(src.ch+1).padStart(2,'0')+' · '+stepLabel(src.idx),'walk-ref-source-tag-v71');
 const jump=add(head,'button','원본 페이지 보기 →','walk-ref-jump-v71');jump.type='button';jump.onclick=()=>jumpToGuideRef(src);
 add(article,'h5',src.section.title+' · '+(src.structured?.title||src.p.title));
 const refs=uniq(src.section.refs);
 if(src.structured){renderStructured(article,src.structured,refs,false)}
 else {
 const p=add(article,'p',src.p.text);mini.inline(p,refs);
 if(src.p.detail&&src.p.detail!==src.p.text){const detail=add(article,'div',undefined,'walk-ref-detail-v71');add(detail,'strong',src.p.detailTitle||'추가 설명');const copy=add(detail,'p',src.p.detail);mini.inline(copy,refs)}
 }
 }
}
function attachGuideRef(buttonParent,panel,entry){
 const id='walkGuideRefV71-'+(++refSerial);panel.id=id;panel.classList.add('walk-ref-panel-v71');
 const button=add(buttonParent,'button','상세 설명 ▾','walk-ref-toggle-v71');button.type='button';button.setAttribute('aria-controls',id);
 let rendered=false;
 function show(open){button.setAttribute('aria-expanded',String(open));button.textContent=open?'설명 접기 ▴':'상세 설명 ▾';const wrapper=panel.closest('tr.walk-ref-extra-row-v71')||panel;wrapper.hidden=!open;if(open&&!rendered){renderGuideRefPanel(panel,entry);rendered=true}}
 show(expandedGuideRefs.has(entry.key));
 button.onclick=()=>{const open=button.getAttribute('aria-expanded')!=='true';if(open)expandedGuideRefs.add(entry.key);else expandedGuideRefs.delete(entry.key);show(open)};
}
function renderStructured(parent,s,refs,allowRefs=true){
 const intro=add(parent,'p',s.intro,'walk-page-copy-v64');mini.inline(intro,refs);
 for(const b of s.blocks){
 const section=add(parent,'section',undefined,'walk-block-v69'+(b.type==='note'?' walk-note-v69':''));
 const title=add(section,'h4',b.title);
 if(b.type==='table'){
 const wrap=add(section,'div',undefined,'walk-table-wrap-v69');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',b.title);
 const table=add(wrap,'table',undefined,'walk-table-v69');table.setAttribute('aria-label',b.title);
 const head=add(table,'thead'),tr=add(head,'tr');for(const c of b.columns){const th=add(tr,'th',c);th.scope='col'}
 const entries=b.rows.map(row=>allowRefs?findGuideRefs(b,row[0]):null),hasHelp=entries.some(Boolean);
 if(hasHelp){const th=add(tr,'th','공략 참조');th.scope='col';th.className='walk-ref-action-col-v71'}
 const body=add(table,'tbody');for(const [rowIdx,row] of b.rows.entries()){const rowEl=add(body,'tr');row.forEach((v,j)=>{const cell=add(rowEl,j===0?'th':'td');if(j===0)cell.scope='row';if(b.keys&&j===0)add(cell,'kbd',v);else{cell.textContent=v;if(b.links&&!(b.columns[0]==='직업'&&j===0))mini.inline(cell,refs)}});
 if(hasHelp){const cell=add(rowEl,'td',undefined,'walk-ref-action-v71');const entry=entries[rowIdx];if(entry){const extra=add(body,'tr',undefined,'walk-ref-extra-row-v71'),td=add(extra,'td');td.colSpan=b.columns.length+1;const panel=add(td,'div');attachGuideRef(cell,panel,entry)}}
 }
 }else if(b.type==='steps'||b.type==='list'){const ol=add(section,b.type==='steps'?'ol':'ul',undefined,'walk-steps-v69');for(const text of b.items){const li=add(ol,'li');const entry=allowRefs?findGuideRefs(b,text):null;if(entry){const line=add(li,'div',undefined,'walk-ref-list-line-v71');const copy=add(line,'span',text);mini.inline(copy,refs);const panel=add(li,'div');attachGuideRef(line,panel,entry)}else{li.textContent=text;mini.inline(li,refs)}}}
 else if(b.type==='note'){const copy=add(section,'p',b.text);mini.inline(copy,refs)}
 }
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
 const info=stepInfo(mode,ch,idx);crumb.textContent=modes[mode]+' 공략 · CHAPTER '+String(ch+1).padStart(2,'0');title.textContent=stepLabel(idx)+' · '+section.title;stepStatus.textContent=stepLabel(idx)+' / '+String(info.sections.length).padStart(2,'0');
 stepRail.replaceChildren();for(const [j,s] of info.sections.entries()){const b=add(stepRail,'button',String(j+1).padStart(2,'0'));b.type='button';b.title=stepLabel(j)+' · '+s.title;b.setAttribute('aria-label',b.title);if(j===idx)b.setAttribute('aria-current','step');b.onclick=()=>goStep(j,0)}
 const active=stepRail.querySelector('[aria-current=step]');if(active){const left=active.offsetLeft-stepRail.offsetLeft-(stepRail.clientWidth-active.offsetWidth)/2;stepRail.scrollLeft=Math.max(0,left)}
 content.replaceChildren();if(returnState){const back=add(content,'div',undefined,'walk-ref-return-v71');const button=add(back,'button','← 원래 심화 공략으로 돌아가기');button.type='button';button.onclick=returnToGuideOrigin;add(back,'small','참조용 원본 공략 · 기존 읽던 위치는 유지됩니다.','muted')}const cap=add(content,'div',undefined,'walk-page-cap-v64');add(cap,'span','PAGE '+String(page+1).padStart(2,'0')+' / '+String(pages.length).padStart(2,'0'));const bar=add(cap,'progress');bar.max=pages.length;bar.value=page+1;bar.setAttribute('aria-label','팝업 읽기 진행');
 const structured=guideStructuredV88[[mode,ch,idx,page].join('/')];const h=add(content,'h3',structured?.title||p.title);if(!structured)mini.inline(h,refs);
 if(structured){renderStructured(content,structured,refs)}
 else if(p.kind==='refs'){add(content,'p','아이템을 선택하면 미니 도감이 열립니다. 제작법은 현재 도감에 등록된 대표 경로입니다.','muted');const list=add(content,'div',undefined,'walk-object-grid-v64');for(const [t,id] of p.refs)itemDetail(list,t,id)}
 else{
 const text=add(content,'p',p.text,'walk-page-copy-v64');mini.inline(text,refs);
 if(p.detail){const block=add(content,'section',undefined,'walk-practical-v64');const h=add(block,'h4',p.detailTitle);mini.inline(h,refs);const copy=add(block,'p',p.detail);mini.inline(copy,refs)}

 const matched=uniq(mini.related([p.title,p.text,p.detailTitle,p.detail].filter(Boolean).join(' '),refs)).slice(0,6);
 if(matched.length){add(content,'h4','이 페이지에 등장한 항목');visualRefs(content,matched)}
 }
 pagination.replaceChildren();for(let j=0;j<pages.length;j++){const b=add(pagination,'button',String(j+1));b.type='button';b.setAttribute('aria-label',(j+1)+'페이지: '+pages[j].title);if(j===page)b.setAttribute('aria-current','step');b.onclick=()=>draw(j)}
 const state=navigationState(page,pages.length,idx,info.sections.length);prev.disabled=state.previous==='none';prev.textContent=state.previous==='step'?'← 이전 STEP':'← 이전 페이지';prev.title=state.previous==='step'?(stepLabel(idx-1)+' · '+info.previous.title):'';next.textContent=state.next==='page'?'다음 페이지 →':state.next==='step'?'다음 '+stepLabel(idx+1)+' →':'챕터 마무리 ✓';if(returnState&&state.next==='finish')next.textContent='원래 공략으로 돌아가기 →';next.title=state.next==='step'?info.next.title:'';next.classList.toggle('walk-next-step-v65',state.next!=='page');
 if(state.next==='step'||state.next==='finish'){const end=add(content,'aside',undefined,'walk-step-end-v65');add(end,'small',stepLabel(idx)+' 끝','muted');add(end,'strong',state.next==='step'?'다음 '+stepLabel(idx+1)+' · '+info.next.title:'이 챕터의 마지막 STEP입니다.');if(state.next==='step')add(end,'p','다음 STEP을 누르면 새로운 주제의 첫 페이지부터 시작합니다.','muted');else add(end,'p',returnState?'원래 읽던 심화 공략으로 돌아갑니다.':'챕터 마무리를 누르면 공략 카드 화면으로 돌아갑니다.','muted')}
 content.scrollTop=0;
}
function dismiss(){mini.unmount();if(dialog.open)dialog.close();document.body.classList.remove('walk-open-v64');const b=opener;context=null;opener=null;returnState=null;expandedGuideRefs.clear();if(b?.isConnected&&currentView==='guides')b.focus({preventScroll:true})}
function goStep(idx,targetPage=0){if(!context)return;const {mode,ch}=context,section=stepInfo(mode,ch,idx).sections[idx];if(!section)return;context={mode,ch,idx,section};if(!returnState)opener=container.querySelector('[data-step-index="'+idx+'"]')||opener;pages=pagesFor(mode,ch,idx,section);draw(targetPage==='last'?pages.length-1:targetPage);next.focus({preventScroll:true})}
function openStep(mode,ch,idx,section,b){returnState=null;expandedGuideRefs.clear();context={mode,ch,idx,section};opener=b;pages=pagesFor(mode,ch,idx,section);mini.mount(dialog);draw(0);dialog.showModal();document.body.classList.add('walk-open-v64');x.focus({preventScroll:true})}
function previousPage(){if(!context)return;if(page>0)draw(page-1);else if(context.idx>0)goStep(context.idx-1,'last')}
function nextPage(){if(!context)return;if(page<pages.length-1)draw(page+1);else if(stepInfo(context.mode,context.ch,context.idx).next)goStep(context.idx+1);else if(returnState)returnToGuideOrigin();else dismiss()}
x.onclick=()=>returnState?returnToGuideOrigin():dismiss();prev.onclick=previousPage;next.onclick=nextPage;
dialog.addEventListener('cancel',e=>{e.preventDefault();if(mini.isOpen())mini.close();else if(returnState)returnToGuideOrigin();else dismiss()});
dialog.addEventListener('close',()=>{if(!dialog.open&&context)dismiss()});
dialog.addEventListener('keydown',e=>{if(e.defaultPrevented||mini.isOpen()||e.target.closest('input,select,textarea,.walk-table-wrap-v69,.walk-ref-panel-v71'))return;if(e.key==='ArrowLeft'){e.preventDefault();previousPage()}else if(e.key==='ArrowRight'){e.preventDefault();nextPage()}});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){if(mini.isOpen())mini.close();else if(returnState)returnToGuideOrigin();else dismiss()}});
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
 const foot=add(card,'div',undefined,'walk-card-foot-v64');add(foot,'small',pagesFor(mode,ch,idx,section).length+'페이지','muted');const b=add(foot,'button','자세히 보기 →','walk-open-button-v64');b.type='button';b.dataset.stepIndex=String(idx);b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',dialog.id);b.setAttribute('aria-label',stepLabel(idx)+' '+section.title+' 자세히 보기');b.onclick=()=>openStep(mode,ch,idx,section,b);
 });
 const end=add(container,'section',undefined,'walk-done-v49');add(end,'h3',mode==='beginner'?'다음 단계로 넘어가기 전':mode==='normal'?'완료 기준':'전환 판단');const ul=add(end,'ul');for(const t of chapter.done){const li=add(ul,'li',t);mini.inline(li,[])}
 const notice=root.querySelector('.guide-notice');notice.querySelector('strong').textContent=mode==='beginner'?'뉴비 · 학습형 공략':mode==='normal'?'일반 · 진행형 공략':'심화 · 전략·빌드형 공략';notice.querySelector('p').textContent=mode==='beginner'?'처음 플레이하는 유저를 위한 조작·제작·탐험과 전투 안내.':mode==='normal'?'기본 시스템을 아는 유저를 위한 칼라미티 진행 순서 및 해금 안내.':ch<6?'기본 생존 과정은 생략합니다. 목표와 준비물 → 직업별 빌드 → 전략 및 다음 계획 순서로 확인하세요.':'기존 전략 공략입니다. 직업별 빌드 표는 후속 검수 대상입니다.';
 for(const e of notice.querySelectorAll('p:nth-of-type(n+2)'))e.remove();
 add(notice,'p',mode==='advanced'&&ch<6?'아이템 이름은 미니 도감, 상세 설명 버튼은 해당 항목의 뉴비·일반 공략을 엽니다.':'아이템 이름을 누르면 미니 도감이 열립니다.','muted');
 root.querySelector('.guide-outline-v43 > p').textContent='1~6장 · 버전별 독립 공략';
}
const oldRender=renderGuideV43;renderGuideV43=function(){oldRender.apply(this,arguments);cards()};
const oldShow=showView;showView=function(v,scroll=true){if(dialog.open)dismiss();return oldShow(v,scroll)};
const style=node('style');style.textContent=
'.walk-cards-v64{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:12px}.walk-card-v64{display:flex;flex-direction:column;gap:8px;min-width:0;padding:17px;border:1px solid #344652;border-radius:12px;background:#14212e}.walk-card-v64 h3{font-size:19px;margin:0;line-height:1.45}.walk-card-v64 .walk-card-copy-v64{font-size:14px;color:#c0d1df;line-height:1.65;margin:0}.walk-card-v64 .walk-num-v49{margin:0}.walk-card-refs-v64{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.walk-card-refs-v64 .walk-visual-ref-v64{padding:4px 7px;font-size:11px;max-width:100%}.walk-card-refs-v64 .sprite{width:20px;height:20px;flex:none}.walk-card-foot-v64{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:10px;padding-top:10px}.walk-open-button-v64{border-color:#416b67;color:#a9ebdb;font-size:13px;padding:7px 11px}.walk-open-v64{overflow:hidden}.walk-dialog-v64{width:min(880px,calc(100vw - 24px));max-height:calc(100dvh - 28px);padding:0;border:1px solid #497c77;border-radius:16px;background:#111d2b;color:#e5edf5;overflow:visible;box-shadow:0 24px 90px #0009}.walk-dialog-v64[open]{display:flex;flex-direction:column}.walk-dialog-v64::backdrop{background:#050b13d9;backdrop-filter:blur(4px)}.walk-dialog-head-v64,.walk-dialog-foot-v64{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 22px;background:#142333;flex:none}.walk-dialog-head-v64{border-radius:15px 15px 0 0;border-bottom:1px solid #314654}.walk-dialog-head-v64 h2{font-size:clamp(18px,2.5vw,25px);line-height:1.35;margin:0;overflow-wrap:anywhere}.walk-dialog-head-v64 small{display:block;font-size:11px;margin-bottom:4px;letter-spacing:.05em}.walk-dialog-head-v64>button{font-size:23px;padding:4px 11px;flex:none}.walk-dialog-scroll-v64{min-height:0;overflow:auto;overscroll-behavior:contain;padding:clamp(16px,3vw,30px);flex:1 1 auto;min-width:0}.walk-dialog-scroll-v64 h3{font-size:clamp(23px,3vw,31px);line-height:1.35;margin:8px 0 16px}.walk-dialog-scroll-v64 h4{font-size:15px;color:#a6dfcf;margin:16px 0 7px}.walk-dialog-scroll-v64 p{font-size:15px;line-height:1.8;word-break:keep-all;overflow-wrap:anywhere}.walk-page-cap-v64{display:flex;gap:12px;align-items:center;color:#a6dfcf;font-size:11px;letter-spacing:.08em}.walk-page-cap-v64 progress{width:95px;height:7px;accent-color:#9ae0cb}.walk-page-copy-v64{font-size:17px!important;line-height:1.9!important}.walk-practical-v64{background:#172938;border-left:3px solid #7dc9b7;border-radius:7px;padding:14px 16px;margin:15px 0}.walk-practical-v64 h4{margin:0 0 7px}.walk-practical-v64 p{margin:0}.walk-visual-grid-v64,.walk-ingredient-v64{display:flex;gap:8px;flex-wrap:wrap}.walk-visual-ref-v64{display:inline-flex;align-items:center;gap:8px;text-align:left;min-width:0;max-width:100%;padding:7px 10px;font-size:13px;color:#b8eddf;background:#192d3a;border-color:#3f625f}.walk-visual-ref-v64 span:last-child{overflow-wrap:anywhere}.walk-visual-ref-v64 .sprite{width:32px;height:32px;flex:none}.walk-object-grid-v64{display:grid;gap:12px}.walk-object-v64{padding:13px;border:1px solid #344652;border-radius:10px;background:#142532}.walk-object-v64>p{font-size:13px;margin:7px 0}.walk-object-v64 h4{margin:10px 0 6px}.walk-ingredient-v64>div{display:flex;align-items:center;gap:4px}.walk-ingredient-v64 .walk-visual-ref-v64{font-size:12px;padding:5px}.walk-ingredient-v64 .sprite{width:24px;height:24px}.walk-figure-v64{margin:18px 0}.walk-figure-v64 svg{display:block;width:100%;max-width:560px;height:auto;margin:auto;border-radius:10px}.walk-figure-v64 figcaption{text-align:center;font-size:11px;margin-top:6px}.walk-dialog-foot-v64{border-radius:0 0 15px 15px;border-top:1px solid #314654}.walk-dialog-foot-v64>button{padding:8px 12px;white-space:nowrap}.walk-pagination-v64{display:flex;gap:5px;flex-wrap:wrap;justify-content:center}.walk-pagination-v64 button{font-size:12px;min-width:29px;padding:4px 8px}.walk-pagination-v64 [aria-current=step]{background:#a5e3d1;color:#10202a;border-color:#a5e3d1}@media(max-width:540px){.walk-dialog-head-v64,.walk-dialog-foot-v64{padding:11px 13px}.walk-dialog-foot-v64{flex-wrap:wrap}.walk-pagination-v64{order:3;width:100%}.walk-page-copy-v64{font-size:15px!important}.walk-card-v64{padding:13px}}';
style.textContent+=`
.walk-dialog-v64{width:min(1420px,calc(100vw - 56px));height:calc(100dvh - 56px);max-height:calc(100dvh - 56px);max-width:none}
.walk-dialog-head-v64,.walk-dialog-foot-v64{padding:17px 28px}
.walk-dialog-head-v64 h2{font-size:clamp(22px,2.4vw,32px)}
.walk-dialog-head-v64>div:first-child{min-width:0}
.walk-step-status-v65{display:flex;align-items:center;gap:14px;flex:none}
.walk-step-status-v65 span{font-size:12px;color:#a6dfcf;white-space:nowrap}
.walk-step-status-v65 button{font-size:25px;line-height:1;padding:8px 12px}
.walk-step-rail-v65{display:flex;flex:none;gap:6px;overflow-x:auto;overscroll-behavior:contain;position:relative;padding:10px 28px;border-bottom:1px solid #314654;background:#101e2b;scrollbar-width:thin}
.walk-step-rail-v65 button{flex:none;min-width:39px;padding:6px 9px;font-size:12px}
.walk-step-rail-v65 [aria-current=step]{background:#244a45;border-color:#8ce0cb;color:#d9fff4;font-weight:700}
.walk-dialog-scroll-v64{padding:clamp(20px,4vw,48px)}
.walk-dialog-scroll-v64>*{max-width:1080px;margin-left:auto;margin-right:auto}
.walk-dialog-scroll-v64 h3{font-size:clamp(26px,3vw,36px)}
.walk-dialog-scroll-v64 .walk-page-copy-v64{font-size:clamp(17px,1.4vw,21px)!important}
.walk-practical-v64{padding:20px 24px}
.walk-practical-v64 p{font-size:clamp(15px,1.2vw,18px)}
.walk-figure-v64 svg{max-width:800px}
.walk-dialog-foot-v64>button{min-width:110px}
.walk-dialog-foot-v64 .walk-next-step-v65{background:#91ddc9;color:#102820;border-color:#91ddc9;font-weight:700}
.walk-step-end-v65{display:grid;gap:4px;border-top:1px solid #49746e;padding-top:16px;margin-top:28px}
.walk-step-end-v65 strong{font-size:17px;color:#a6dfcf}
.walk-step-end-v65 p{margin:0;font-size:13px}
@media(max-width:700px){.walk-dialog-v64{width:calc(100vw - 16px);height:calc(100dvh - 16px);max-height:calc(100dvh - 16px)}.walk-dialog-head-v64,.walk-dialog-foot-v64{padding:12px}.walk-step-rail-v65{padding:8px 12px}.walk-step-status-v65 span{display:none}.walk-step-status-v65{gap:6px}.walk-dialog-scroll-v64{padding:20px 16px}.walk-dialog-foot-v64>button{min-width:0}.walk-practical-v64{padding:14px}.walk-dialog-head-v64 h2{font-size:20px}}
@media(max-height:500px){.walk-dialog-v64{height:calc(100dvh - 12px);max-height:calc(100dvh - 12px)}.walk-dialog-head-v64,.walk-dialog-foot-v64{padding-top:7px;padding-bottom:7px}.walk-step-rail-v65{padding-top:4px;padding-bottom:4px}}
`;
style.textContent+=`
.walk-dialog-scroll-v64{--reader-max:1080px}
.walk-dialog-scroll-v64>:is(h3,h4,p,section,aside,div,figure){width:min(100%,var(--reader-max));margin-inline:auto}
.walk-dialog-scroll-v64>h3{margin:12px auto 20px}
.walk-dialog-scroll-v64>h4{margin:20px auto 10px}
.walk-block-v69{margin-block:20px}
.walk-block-v69>h4{font-size:18px;margin:0 0 10px;color:#b1e9da}
.walk-table-wrap-v69{overflow-x:auto;border:1px solid #344b5c;border-radius:10px}
.walk-table-v69{width:100%;border-collapse:collapse;text-align:left;line-height:1.6;font-size:15px}
.walk-table-v69 th,.walk-table-v69 td{padding:12px 16px;border-bottom:1px solid #304454;text-align:left;vertical-align:middle;overflow-wrap:anywhere;word-break:keep-all}
.walk-table-v69 thead th{background:#223747;color:#bcebdd;font-size:13px;white-space:nowrap}
.walk-table-v69 tbody th{color:#e0eff7;font-weight:600;min-width:90px}
.walk-table-v69 tbody tr:nth-child(even){background:#192a38}
.walk-table-v69 tbody tr:last-child>*{border-bottom:0}
.walk-table-v69 kbd{display:inline-block;font:600 13px system-ui,sans-serif;white-space:nowrap;background:#253c4b;border:1px solid #456271;border-bottom-width:3px;border-radius:6px;padding:4px 9px;color:#e5f6f1}
.walk-steps-v69{display:grid;gap:9px;margin:0;padding-left:27px;font-size:16px;line-height:1.7}
.walk-steps-v69 li::marker{color:#91ddc9;font-weight:700}
.walk-note-v69{background:#172938;border-left:3px solid #7dc9b7;border-radius:8px;padding:15px 19px}
.walk-note-v69 p{margin:0}
@media(max-width:600px){.walk-table-v69{font-size:13px}.walk-table-v69 th,.walk-table-v69 td{padding:9px 10px}.walk-table-v69 kbd{font-size:11px;padding:3px 5px}.walk-block-v69>h4{font-size:16px}.walk-steps-v69{font-size:14px}}
`;
style.textContent+=`
.walk-ref-toggle-v71,.walk-ref-jump-v71{font-size:12px;line-height:1.35;padding:6px 10px;color:#bcebdd;border:1px solid #466d70;border-radius:20px;background:transparent;white-space:nowrap;cursor:pointer}
.walk-ref-toggle-v71:hover,.walk-ref-jump-v71:hover,.walk-ref-toggle-v71[aria-expanded=true]{background:#25463f;border-color:#8acbbd}
.walk-ref-action-col-v71,.walk-ref-action-v71{width:1%;text-align:right!important;white-space:nowrap}
.walk-ref-extra-row-v71[hidden],.walk-ref-panel-v71[hidden]{display:none!important}
.walk-table-v69 .walk-ref-extra-row-v71>td{padding:8px 14px 14px;background:#132531}
.walk-ref-panel-v71{border:1px solid #365c61;border-radius:9px;background:#192d3c;padding:15px 17px;margin:7px 0;min-width:0;white-space:normal}
.walk-ref-source-v71+.walk-ref-source-v71{border-top:1px solid #385363;margin-top:15px;padding-top:15px}
.walk-ref-source-head-v71{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.walk-ref-source-tag-v71{color:#91d8ca;font-size:12px}
.walk-ref-source-v71 h5{font-size:16px;color:#dceeea;margin:10px 0 7px;line-height:1.5}
.walk-ref-source-v71 p{font-size:14px!important;line-height:1.75!important;margin:5px 0;white-space:normal}
.walk-ref-source-v71 .walk-block-v69{margin:12px 0}
.walk-ref-source-v71 .walk-block-v69>h4{font-size:15px;margin:0 0 6px}
.walk-ref-source-v71 .walk-table-v69{font-size:13px}
.walk-ref-source-v71 .walk-table-v69 th,.walk-ref-source-v71 .walk-table-v69 td{padding:8px}
.walk-ref-source-v71 .walk-steps-v69{font-size:14px}
.walk-ref-detail-v71{border-left:2px solid #548b84;padding:5px 10px;margin-top:10px;background:#152632}
.walk-ref-detail-v71 strong{font-size:13px;color:#a8ddce}
.walk-ref-list-line-v71{display:flex;align-items:center;justify-content:space-between;gap:10px}
.walk-ref-list-line-v71 span{min-width:0;flex:1}
.walk-ref-return-v71{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 12px;background:#203d3a;border:1px solid #49746e;border-radius:8px;margin-bottom:15px}
.walk-ref-return-v71 button{font-size:13px;color:#bcebdd;border-color:#507e76}
@media(max-width:600px){.walk-ref-panel-v71{padding:10px}.walk-ref-toggle-v71,.walk-ref-jump-v71{font-size:11px;padding:5px 7px}.walk-ref-list-line-v71{align-items:flex-start;flex-wrap:wrap}.walk-ref-list-line-v71 span{flex-basis:100%}.walk-table-v69 .walk-ref-extra-row-v71>td{padding:5px}.walk-ref-source-v71 h5{font-size:14px}}
`;
document.head.append(style);renderGuideV43();
})();
