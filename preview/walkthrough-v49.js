/* V49: first two walkthrough chapters, shared outline, three reading levels. */
(()=>{
'use strict';
const W='https://calamitymod.wiki.gg/wiki/', T='https://terraria.wiki.gg/wiki/';
const data=[
{goal:'첫날에 안전한 거점을 마련하고, 시작 무기와 탐험 도구를 확보합니다.',
sections:[
['캐릭터와 월드 만들기','캐릭터는 소프트코어를 권장합니다. 월드 난이도는 클래식 또는 전문가 중 선택하세요. 리벤전스·데스는 별도의 모드 난이도이므로 처음부터 켤 필요는 없습니다.','소프트코어 / 원하는 월드 난이도 / 난이도 표시기 확인.','전문가 이상에서 추가 보상과 전투 시스템을 고려해 난이도를 선택하세요. 추가 콘텐츠 모드를 사용하면 이 공략의 전제와 달라질 수 있습니다.',[],[W+'Difficulty',W+'Mod_progression']],
['스타터팩 열기','새 캐릭터의 인벤토리에서 스타터팩을 우클릭하세요. 시작 무기를 비교해 마음에 드는 공격 방식으로 출발하면 됩니다. 직업 선택은 고정되지 않습니다.','스타터팩을 열고 무기·탄약 등 지급품을 확인.','초반에 특정 직업을 강제하지 말고 탐험에서 얻은 장비에 맞추세요. 지급 무기의 정확한 종류는 월드 조건과 버전의 영향을 받습니다.',[['items','CalamityMod/StarterBag']],[W+'Starter_Bag']],
['첫 집과 제작 거점','나무를 캐서 작업대를 만들고, 몬스터를 피해 쉴 수 있는 집을 지으세요. NPC용 방에는 배경 벽, 출입구, 의자, 작업대나 탁자, 횃불이 필요합니다. 주거 메뉴로 적합 여부를 확인합니다.','나무 → 작업대 → 주거 공간 → 상자와 횃불.','한 곳에 전부 쌓기보다 제작 공간과 NPC 주거를 분리하고, 탐험에서 돌아올 때 재료를 바로 분류할 수 있게 상자를 놓으세요.',[['items','Terraria/items/9'],['items','Terraria/items/8']],[T+'House']],
['첫 지하 탐험','횃불과 발판을 챙겨 가까운 동굴부터 내려가세요. 상자, 생명 수정, 광석을 발견하면 모으고, 돌아오기 어려운 곳까지 무리해서 들어가지 마세요.','횃불·발판 준비 → 생명 수정·상자·광석 확보 → 귀환.','이동 장신구가 없는 단계에서는 전투력보다 낙사 방지와 탈출 동선이 중요합니다. 귀환 수단이 있다면 단축키로 사용할 수 있게 준비하세요.',[['items','Terraria/items/29']],[W+'Guide:Class_setups/Pre-Hardmode']]
],done:['스타터팩을 열고 사용할 무기를 골랐다.','적합한 NPC 주거와 제작 공간을 확보했다.','첫 동굴에서 생명 수정이나 광석을 확보했다.']},
{goal:'첫 보스에 도전할 수 있도록 체력, 이동기, 방어구와 전투 공간을 준비합니다.',
sections:[
['지상 울프럼 적 사냥','낮에 지상에서 등장하는 울프럼 적을 사냥해 금속 파편을 모으세요. 파편은 초반 장비 제작에 쓰이므로 버리지 말고 보관합니다.','낮 지상 탐험 → 울프럼 파편 확보 → 도감 제작법 확인.','울프럼 장비를 전부 만들 필요는 없습니다. 현재 이동 수단이나 방어 수단의 부족한 부분을 우선 보완하세요.',[['items','CalamityMod/WulfrumMetalScrap'],['items','CalamityMod/WulfrumAcrobaticsPack']],[W+'Wulfrum_enemies',W+'Wulfrum_Acrobatics_Pack']],
['이동 수단과 체력 강화','동굴 상자에서 이동 속도 장신구나 추가 점프 장신구를 찾아보세요. 생명 수정은 발견할 때마다 사용하고, 광석으로 방어구를 준비하면 실수를 줄일 수 있습니다.','이동 장신구 / 최대 체력 / 방어구 확보.','회피할 공간과 이동 가속을 먼저 점검하세요. 얻기 어려운 장비 하나 때문에 다음 단계 전체를 멈추지 않아도 됩니다.',[['items','Terraria/items/29'],['items','Terraria/items/54'],['items','Terraria/items/53']],[W+'Guide:Class_setups/Pre-Hardmode']],
['직업별 무기 선택','근접은 사거리가 있는 무기, 원거리는 활과 충분한 탄약, 마법은 마나 회복 수단, 소환은 소환수, 로그는 투척 무기와 스텔스 지원 장비를 살펴보세요. 시작 무기를 꼭 계속 쓸 필요는 없습니다.','근접·원거리·마법·소환·로그 중 현재 확보한 장비를 기준으로 선택.','초반에는 실제 명중률과 이동 중 공격 가능 여부를 우선 비교하세요. 공식 직업 세팅 문서는 최신 등록 버전과 차이가 있으므로 정확한 수치나 최적 순위로 단정하지 않습니다.',[['items','CalamityMod/StarterBag']],[W+'Guide:Class_setups',W+'Rogue']],
['전투 공간 만들기','평평한 지형에 길게 발판을 설치하고 장애물을 치우세요. 회복 물약을 챙기고 보스 소환 전에 달리기와 점프를 연습합니다.','발판 / 회복 물약 / 회피 동선.','보스가 나올 지형을 유지하면서 좌우와 위아래 이동 경로를 확보하세요. 무기 교체보다 회피 공간 확보가 더 효과적일 때도 있습니다.',[],[W+'Guide:Desert_Scourge_strategies']],
['첫 보스 선택','킹 슬라임은 선택 가능한 첫 목표입니다. 사막의 무법자는 칼라미티 초반 보스로, 사막의 메달을 이용해 해당 지역에서 소환합니다. 전투 중 사막을 벗어나지 않도록 준비하세요.','킹 슬라임 선택 도전 또는 사막의 무법자 준비.','사막의 무법자의 구체적인 패턴이나 추천 장비는 난이도 및 버전 차이가 있어 다음 보스 공략에서 별도 검수합니다. 소환 아이템의 등록 제작법은 도감에서 확인하세요.',[['npcs','Terraria/npcs/50'],['npcs','CalamityMod/DesertScourgeHead'],['items','CalamityMod/DesertMedallion']],[W+'Desert_Medallion',W+'Desert_Scourge',W+'Guide:Desert_Scourge_strategies']]
],done:['체력과 이동 장신구를 보완했다.','회복 수단과 무기·방어구를 준비했다.','첫 보스의 소환 조건과 전투 장소를 확인했다.']}
];
if(data.length!==2||data.some(c=>!c.goal||!c.sections.length||c.sections.some(s=>s.length!==6||!s[5].length)))throw Error('Invalid walkthrough content');
const reader=$('view-guides'), article=reader.querySelector('.guide-reader-v43'), pager=article.querySelector('.guide-pager-v43');
const body=node('div',undefined,'walkthrough-v49');article.insertBefore(body,pager);
const css=node('style');css.textContent='.walkthrough-v49{display:grid;gap:14px;margin:20px 0}.walkthrough-v49 h3{margin:0 0 9px;font-size:18px;line-height:1.45}.walkthrough-v49 p{line-height:1.85;margin:6px 0;word-break:keep-all;overflow-wrap:anywhere}.walkthrough-v49 .walk-step-v49{padding:16px;border:1px solid #344652;border-radius:10px;background:#14212e}.walk-num-v49{color:#9fdfce;font-size:12px;letter-spacing:.08em;margin-bottom:7px}.walk-links-v49{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.walk-source-v49{font-size:12px;color:#aabccc;margin-top:10px}.walk-source-v49 summary{cursor:pointer}.walk-source-v49 a{color:#a9e5d4;text-decoration:underline}.walk-done-v49{padding:15px;border-left:3px solid #80c9b7;background:#152732;border-radius:6px}.walk-done-v49 ul{padding-left:20px;margin:8px 0;line-height:1.8}.walk-level-v49{font-size:13px;color:#a9e5d4;font-weight:600}';document.head.append(css);
const notice=reader.querySelector('.guide-notice');notice.querySelector('strong').textContent='진행 공략 연재 중 · 1~2장 공개';notice.querySelector('p').textContent='게임 시작과 첫 보스 준비를 읽을 수 있습니다. 3~6장은 아직 목차이며, 공개 본문은 공식 문서 참고 기반으로 실제 Calamity 2.2.4 플레이 검증 전입니다.';
reader.querySelector('.guide-outline-v43 > p').textContent='1~2장 공개 · 3~6장 준비 중';
const prevRender=renderGuideV43;
renderGuideV43=function(){
prevRender();
const mode=uiV43.mode,i=uiV43.chapters[mode],c=data[i];
body.replaceChildren();
const buttons=$('guideChaptersV43').querySelectorAll('button');buttons.forEach((b,j)=>{b.textContent+=(data[j]?' · 공개':' · 준비 중')});
if(!c){$('guideChapterDescV43').textContent='이 단계는 본문 작성 전입니다. 보스 로드맵과 도감에서 현재 확인 가능한 정보를 살펴보세요.';const b=add(body,'button','보스 로드맵 열기');b.type='button';b.onclick=()=>showView('roadmap');return}
$('guideChapterDescV43').textContent=c.goal;
for(const [j,s] of c.sections.entries()){
const [title,beginner,normal,advanced,refs,sources]=s,sec=add(body,'section',undefined,'walk-step-v49');
add(sec,'div','STEP '+String(j+1).padStart(2,'0'),'walk-num-v49');add(sec,'h3',title);add(sec,'p',mode==='normal'?normal:beginner);
if(mode==='advanced'){add(sec,'div','심화 포인트','walk-level-v49');add(sec,'p',advanced)}
if(refs.length){const links=add(sec,'div',undefined,'walk-links-v49');for(const [t,id] of refs){if(!D[t]?.[id])continue;const b=add(links,'button',name(D[t][id])+' ↗','link');b.type='button';b.onclick=()=>{guideReturnV43={mode,chapter:i,scroll:window.scrollY};openRef(t,id)}}if(!links.childElementCount)links.remove()}
const src=add(sec,'details',undefined,'walk-source-v49');add(src,'summary','참고 문서');const sl=add(src,'div',undefined,'walk-links-v49');for(const u of sources){const a=add(sl,'a',decodeURIComponent(u.split('/').pop()).replaceAll('_',' ')+' ↗');a.href=u;a.target='_blank';a.rel='noopener noreferrer'}
}
const end=add(body,'section',undefined,'walk-done-v49');add(end,'h3','다음 단계로 넘어가기 전');const ul=add(end,'ul');for(const d of c.done)add(ul,'li',d);add(end,'p','권장 확인 사항이며 필수 조건이나 진행 기록 입력은 아닙니다.','muted');
};
const homeHeading=document.querySelector('.home-block .section-heading p');if(homeHeading&&homeHeading.textContent.includes('공략'))homeHeading.textContent='초기 진행 1~2장 공개 · 도감 이용 가능';
const hb=$('homeGuideV44');if(hb)hb.textContent='진행 공략 읽기';
document.title='Calamity Guide · 한국어 종합 공략집 V49';$('version').textContent='Calamity '+D.version+' · V49';renderGuideV43();
})();
