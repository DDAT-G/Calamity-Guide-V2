/* V92: inspect all displayed source fields for automatic link confidence. */
window.guideLinkAuditV92=function(){
 const mini=window.guideMiniV64,groups=new Map(),accepted=new Map();let strings=0,occurrences=0;
 function scan(value,refs,location){
  if(typeof value!=='string'||!value.trim())return;strings++;
  for(const hit of mini.auditSuppressed(value,refs)){occurrences++;const k=hit.text;let g=groups.get(k);if(!g){g={text:k,count:0,entries:hit.entries,examples:[]};groups.set(k,g)}g.count++;if(g.examples.length<4)g.examples.push({location,value})}
  for(const hit of mini.auditNames(value,refs)){const k=hit.text;accepted.set(k,(accepted.get(k)||0)+1)}
 }
 for(const [mode,chapters] of Object.entries(walkthroughModesV52))for(const [ch,chapter] of chapters.entries()){
  const base=mode+'/'+ch;scan(chapter.goal,[],base+'/goal');for(const value of chapter.done)scan(value,[],base+'/done');
  for(const [idx,section] of chapter.sections.entries()){
   const loc=base+'/'+idx,refs=section.refs||[];scan(section.title,refs,loc+'/title');
   for(const [j,line] of section.lines.entries()){
    const p=loc+'/'+j;scan(line.label,refs,p+'/label');scan(line.text,refs,p+'/text');
    const st=guideStructuredV89[p];if(st){scan(st.title,refs,p+'/title');scan(st.intro,refs,p+'/intro');for(const block of st.blocks){
     scan(block.title,refs,p+'/block-title');for(const row of block.rows||[])for(const cell of row)scan(cell,refs,p+'/cell');for(const item of block.items||[])scan(item,refs,p+'/item');scan(block.text,refs,p+'/note')
    }}
    else if(mode!=='advanced'){const extra=guideExtraV89[mode]?.[ch]?.[idx]?.[j];if(extra){scan(extra[0],refs,p+'/extra-title');scan(extra[1],refs,p+'/extra')}}
   }
   if(mode!=='advanced')for(const [j,extra] of (guideExtraV89[mode]?.[ch]?.[idx]||[]).entries())if(j>=section.lines.length){scan(extra[0],refs,loc+'/extra-title');scan(extra[1],refs,loc+'/extra')}
  }
 }
 return {strings,suppressedOccurrences:occurrences,suppressed:[...groups.values()].sort((a,b)=>b.count-a.count),accepted:[...accepted].sort((a,b)=>b[1]-a[1])};
};
