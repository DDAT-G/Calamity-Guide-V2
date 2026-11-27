/* V50: pre-Hardmode boss walkthrough; beginner-first expansion. */
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
],done:['체력과 이동 장신구를 보완했다.','회복 수단과 무기·방어구를 준비했다.','첫 보스의 소환 조건과 전투 장소를 확인했다.']},
{
 "goal": "첫 보스부터 월 오브 플레시까지 성장합니다. 선택 보스와 월드별 분기를 구분하고, 처치 보상으로 다음 장비를 준비하세요.",
 "sections": [
  [
   "보스 도전 전 공통 준비",
   "목표~보스 전투에 필요한 이동과 생존 능력을 갖춥니다. 아래 순서는 추천 경로이며 모든 선택 보스를 반드시 잡을 필요는 없습니다.|장비~현재 직업에 맞는 무기, 방어구, 달리기·추가 점프 장신구를 준비하세요. 생명 수정으로 체력을 최대한 늘리고 마법 직업은 마나도 늘리세요.|전투 공간~횃불, 발판, 모닥불을 설치하고 회복·철피부·재생·신속 물약을 준비하세요. 소환 지형과 시간 조건은 각 보스마다 확인합니다.|진행 방법~막혔다면 체력과 이동 장비부터 보완하고, 다른 보스 보상으로 무기를 교체하세요.",
   "체력·이동·방어구·물약·전투 공간 준비. 추천 순서는 강제 아님.",
   "",
   [
    [
     "items",
     "Terraria/items/29"
    ],
    [
     "items",
     "Terraria/items/54"
    ],
    [
     "items",
     "Terraria/items/53"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Guide:Class_setups/Pre-Hardmode",
    "https://terraria.wiki.gg/wiki/Campfires"
   ]
  ],
  [
   "킹 슬라임 · 선택",
   "소환~슬라임 왕관을 제작해 사용합니다. 슬라임 비 이벤트에서도 등장할 수 있습니다.|준비~지상에 넓은 평지와 발판을 마련하고 원거리에서 공격할 수 있는 무기를 챙기세요.|전투~점프하며 다가올 때 착지 지점을 피해 이동하세요. 텔레포트로 가까이 나타날 수 있으므로 같은 위치에 오래 서 있지 마세요.|처치 후~갈고리나 슬라임 탈것을 얻으면 이동에 활용하고 사막의 무법자로 넘어갑니다.",
   "슬라임 왕관 → 평지 전투 → 이동 보상 확인. 선택 보스.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/50"
    ],
    [
     "items",
     "Terraria/items/560"
    ],
    [
     "items",
     "Terraria/items/2585"
    ],
    [
     "items",
     "Terraria/items/2430"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/King_Slime",
    "https://terraria.wiki.gg/wiki/Slime_Crown"
   ]
  ],
  [
   "사막의 무법자",
   "소환~사막·지하 사막에서 재료를 모아 사막의 메달을 제작한 후 사막에서 사용합니다. 처음이라면 도감에서 재료와 제작대를 확인하세요.|준비~사막 안에 여러 높이의 발판을 설치합니다. 몸통을 여러 번 맞힐 수 있는 관통형 무기가 도움이 됩니다.|전투~지면에서 튀어나오는 머리의 접근 방향을 보고 위아래로 회피하세요. 계속 한 방향으로만 달리면 사막 밖으로 나갈 수 있으므로 경계를 확인합니다.|처치 후~진주 파편 등의 재료로 Sea Remains 제작법을 확인하고 대양 계열 무기를 살펴보세요. 침몰한 바다의 거대 조개도 탐험할 수 있습니다.",
   "사막의 메달 → 사막 전투 → 진주 파편, 대양 장비와 침몰한 바다.",
   "",
   [
    [
     "npcs",
     "CalamityMod/DesertScourgeHead"
    ],
    [
     "items",
     "CalamityMod/DesertMedallion"
    ],
    [
     "items",
     "CalamityMod/PearlShard"
    ],
    [
     "items",
     "CalamityMod/SeaRemains"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Desert_Scourge",
    "https://calamitymod.wiki.gg/wiki/Desert_Medallion",
    "https://calamitymod.wiki.gg/wiki/Sea_Remains",
    "https://calamitymod.wiki.gg/wiki/Giant_Clam"
   ]
  ],
  [
   "크툴루의 눈",
   "소환~밤에 수상한 눈을 사용합니다. 조건이 맞으면 자연 등장하기도 합니다.|준비~달리기 장신구를 갖추고 지상에 긴 발판을 만드세요. 투사체를 사용하는 무기가 편합니다.|전투~공격할 때와 피할 때를 구분하세요. 돌진하기 시작하면 이동 방향을 보고 점프와 좌우 이동을 활용합니다.|처치 후~악성 지형 광석을 활용할 수 있고 전문가 이상이라면 크툴루의 방패를 확인하세요. 유황 바다 산성비 1단계도 열린 상태입니다.",
   "밤에 수상한 눈 → 돌진 회피 → 방패(전문가 이상)·산성비 1단계.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/4"
    ],
    [
     "items",
     "Terraria/items/43"
    ],
    [
     "items",
     "Terraria/items/3097"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Eye_of_Cthulhu",
    "https://calamitymod.wiki.gg/wiki/Eye_of_Cthulhu",
    "https://calamitymod.wiki.gg/wiki/Acid_Rain"
   ]
  ],
  [
   "크래뷸론 · 선택",
   "소환~발광 버섯 지역에서 Decapodita Sprout를 사용합니다. 자연 등장하는 보스가 아닙니다.|준비~지하 버섯 지역의 빈 공간을 넓히고 버섯 지형 자체를 없애지 않도록 주의하세요. 공중 이동과 발판을 활용합니다.|전투~접근하는 몸체와 날아오는 포자를 동시에 살피세요. 벽에 갇히지 않도록 이동하며 공격합니다.|처치 후~버섯 계열 무기와 드롭 장신구를 도감에서 확인합니다. 현재 직업과 맞는 보상이 있다면 챙기고 악성 지형 보스에 도전하세요.",
   "Decapodita Sprout → 버섯 지역 전투 → 버섯 계열 보상 확인.",
   "",
   [
    [
     "npcs",
     "CalamityMod/Crabulon"
    ],
    [
     "items",
     "CalamityMod/DecapoditaSprout"
    ],
    [
     "items",
     "CalamityMod/Mycoroot"
    ],
    [
     "items",
     "CalamityMod/FungalClump"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Crabulon",
    "https://calamitymod.wiki.gg/wiki/Decapodita_Sprout",
    "https://calamitymod.wiki.gg/wiki/Guide:Crabulon_strategies"
   ]
  ],
  [
   "세계를 먹는 자 / 크툴루의 뇌 · 월드 분기",
   "소환~오염지대라면 그림자 구체 3개를 파괴하거나 Worm Food를 사용합니다. 진홍지대라면 진홍 심장 3개를 파괴하거나 Bloody Spine을 사용합니다. 자신의 지형에 맞는 보스를 고르세요.|준비~악성 지형 안에 넓은 발판과 통로를 마련하세요.|전투~세계를 먹는 자는 여러 몸통을 때리는 공격이 유리합니다. 크툴루의 뇌는 먼저 주변 크리퍼를 제거하고 이후 본체의 접근과 환영을 주의하세요.|처치 후~그림자 비늘 또는 조직 표본을 사용해 해당 지형 곡괭이와 장비를 마련합니다.",
   "월드에 맞는 악성 지형 보스 → 곡괭이 제작 재료 확보.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/13"
    ],
    [
     "npcs",
     "Terraria/npcs/266"
    ],
    [
     "items",
     "Terraria/items/86"
    ],
    [
     "items",
     "Terraria/items/1329"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Eater_of_Worlds",
    "https://terraria.wiki.gg/wiki/Brain_of_Cthulhu",
    "https://terraria.wiki.gg/wiki/Summoning_items"
   ]
  ],
  [
   "하이브 마인드 / 퍼포레이터 · 월드 분기",
   "소환~오염지대에서는 Hive Tumor, 진홍지대에서는 Perforator Cyst를 처치해 첫 전투를 시작합니다. 첫 처치 이후 각각 Teratoma 또는 Bloody Worm Food를 제작해 재도전할 수 있습니다.|준비~앞서 얻은 악성 지형 장비를 활용하고 지형 안에서 충분한 이동 공간을 확보하세요.|전투~하이브 마인드는 부하와 본체의 움직임을 살피며 회피하고, 퍼포레이터는 지렁이가 나타나면 우선 처리해 여러 적에 둘러싸이지 않도록 하세요.|처치 후~공중섬의 비활성 창공석이 채굴 가능한 창공석으로 바뀝니다. 두 보스를 모두 잡아야 하는 것은 아닙니다.",
   "특수 생명체 처치로 첫 소환 → 창공석 해금 → 공중섬 탐험.",
   "",
   [
    [
     "npcs",
     "CalamityMod/HiveMind"
    ],
    [
     "npcs",
     "CalamityMod/PerforatorHive"
    ],
    [
     "items",
     "CalamityMod/Teratoma"
    ],
    [
     "items",
     "CalamityMod/BloodyWormFood"
    ],
    [
     "items",
     "CalamityMod/AerialiteOre"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/The_Hive_Mind",
    "https://calamitymod.wiki.gg/wiki/The_Perforators",
    "https://calamitymod.wiki.gg/wiki/Teratoma",
    "https://calamitymod.wiki.gg/wiki/Bloody_Worm_Food",
    "https://calamitymod.wiki.gg/wiki/Aerialite_Ore"
   ]
  ],
  [
   "창공석 장비로 성장",
   "탐험~공중섬에 올라가 해금된 창공석을 찾으세요. 중력 물약, 밧줄 등 가지고 있는 이동 도구를 활용합니다.|제작~채광 가능 곡괭이를 도감에서 확인하고 창공석 주괴 및 Aerospec 방어구 등 제작 후보를 살펴보세요.|직업 선택~현재 사용하는 직업에 맞는 방어구 부위와 무기를 선택합니다. 정확한 재료와 성능은 도감에서 확인하세요.",
   "공중섬 → 창공석 → 직업에 맞는 장비 교체.",
   "",
   [
    [
     "items",
     "CalamityMod/AerialiteOre"
    ],
    [
     "items",
     "CalamityMod/AerialiteBar"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Aerialite_Ore",
    "https://calamitymod.wiki.gg/wiki/Aerospec_armor"
   ]
  ],
  [
   "여왕벌 · 선택",
   "소환~지하 정글 벌집의 유충을 파괴하거나 정글에서 Abeemination을 사용합니다. 벌집을 탐색할 때는 준비 전에 유충을 건드리지 마세요.|준비~지하 정글에서 발판을 설치하고 벌집의 꿀과 회복 수단을 활용합니다.|전투~수평 돌진을 위아래 이동으로 피하고 소환된 벌이나 침 공격을 주의하세요.|처치 후~밀랍으로 벌 계열 장비를 만들 수 있습니다. 소환 직업 등 필요한 장비가 있을 때 도전하세요.",
   "정글에서 소환 → 돌진 회피 → 밀랍과 벌 장비.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/222"
    ],
    [
     "items",
     "Terraria/items/2431"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Queen_Bee",
    "https://terraria.wiki.gg/wiki/Abeemination"
   ]
  ],
  [
   "디어클롭스 · 선택",
   "소환~설원에서 Deer Thing을 사용하거나 특정 눈보라 조건에서 자연 등장할 수 있습니다.|준비~눈 지형에 장애물 없는 공간과 회복 수단을 마련하세요.|전투~얼음 공격이 진행되는 방향을 보며 자리를 옮기세요. 너무 멀리 도망가는 방식만 고집하지 말고 보스 근처에서 안전한 공격 위치를 찾으세요.|처치 후~체스터 소환 아이템 등 원하는 드롭이 있으면 파밍하세요. 다음 주요 목표는 스켈레트론입니다.",
   "설원 소환 → 얼음 공격 회피 → 선택 보상.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/668"
    ],
    [
     "items",
     "Terraria/items/5098"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Deerclops",
    "https://terraria.wiki.gg/wiki/Deer_Thing"
   ]
  ],
  [
   "스켈레트론",
   "소환~던전 입구의 노인에게 밤에 저주 해제를 요청합니다. 전투 시간이 낮까지 넘어가지 않게 밤 시작 무렵에 도전하세요.|준비~던전 밖에 넓은 발판을 마련하고 이동 장신구와 직업 무기를 준비합니다.|전투~손과 머리의 접근을 피하고 손을 제거해 공격 부담을 줄이세요. 머리 회전에 붙잡히지 않도록 이동 공간을 확보합니다.|처치 후~던전에 안전하게 진입할 수 있습니다. 황금 상자, 기계공, 제작에 필요한 던전 장비를 찾아 다음 전투를 준비하세요.",
   "밤에 노인과 대화 → 손과 머리 회피 → 던전 탐험.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/35"
    ],
    [
     "items",
     "Terraria/items/3245"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Skeletron",
    "https://calamitymod.wiki.gg/wiki/Guide:Skeletron_strategies",
    "https://terraria.wiki.gg/wiki/Dungeon"
   ]
  ],
  [
   "지옥 탐험과 지옥석 장비",
   "준비~용암 피해를 줄일 수 있는 물약이나 장신구, 귀환 수단을 챙기세요.|탐험~지하세계에서 적을 피해 지옥석을 캡니다. 지옥석 채광 가능 곡괭이와 용암 생성에 주의하세요.|제작~지옥석과 흑요석으로 지옥석 주괴를 제작하고 현재 직업의 장비와 비교합니다. 모든 직업이 같은 방어구를 입을 필요는 없습니다.",
   "지하세계 → 지옥석과 흑요석 → 직업에 필요한 장비.",
   "",
   [
    [
     "items",
     "Terraria/items/174"
    ],
    [
     "items",
     "Terraria/items/173"
    ],
    [
     "items",
     "Terraria/items/175"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Hellstone",
    "https://terraria.wiki.gg/wiki/Hellstone_Bar"
   ]
  ],
  [
   "슬라임 갓",
   "소환~Overloaded Sludge를 사용하면 소환됩니다. 특정 지형을 찾을 필요는 없습니다.|준비~넓은 지상 공간을 확보하고 공중 이동 장비, 회복 물약, 이동 중 공격 가능한 무기를 챙기세요.|전투~여러 슬라임이 함께 움직이므로 한쪽만 보지 마세요. 접근 경로를 피하고 공격할 수 있는 짧은 틈에 피해를 누적합니다.|처치 후~정제된 젤로 스태티젤 방어구 및 무기를 제작할 수 있습니다. 자신의 직업에 맞는 부위를 고르고 월 오브 플레시 준비에 활용하세요.",
   "Overloaded Sludge → 다중 보스 회피 → 정제된 젤과 스태티젤 장비.",
   "",
   [
    [
     "npcs",
     "CalamityMod/SlimeGodCore"
    ],
    [
     "items",
     "CalamityMod/OverloadedSludge"
    ],
    [
     "items",
     "CalamityMod/PurifiedGel"
    ],
    [
     "items",
     "CalamityMod/StatigelGreaves"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/The_Slime_God",
    "https://calamitymod.wiki.gg/wiki/Overloaded_Sludge",
    "https://calamitymod.wiki.gg/wiki/Purified_Gel",
    "https://calamitymod.wiki.gg/wiki/Statigel_armor"
   ]
  ],
  [
   "월 오브 플레시 · 하드모드 진입",
   "소환~가이드가 살아 있는 상태에서 지하세계의 용암에 가이드 부두 인형을 떨어뜨립니다. 소환하기 전에 준비를 끝내세요.|준비~지하세계에 길고 끊기지 않는 전투 통로를 만듭니다. 용암, 건물 벽, 장애물을 처리하고 장거리 공격이 가능한 무기와 회복 수단을 준비하세요.|전투~벽이 다가오므로 전진하며 공격합니다. 방향을 잘못 잡거나 길이 막히면 위험하니 이동할 공간을 충분히 확보하고 속도가 빨라질 때를 대비합니다.|처치 후~세계가 하드모드로 변합니다. 초기 하드모드 진행 개편이 켜져 있다면 코발트와 팔라듐이 해금됩니다. 전문가 이상이라면 악마의 심장 사용 조건을 확인하세요.",
   "가이드 생존·부두 인형·지옥 통로 → 월 오브 플레시 처치 → 하드모드.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/113"
    ],
    [
     "items",
     "Terraria/items/267"
    ],
    [
     "items",
     "Terraria/items/3335"
    ],
    [
     "items",
     "Terraria/items/364"
    ],
    [
     "items",
     "Terraria/items/1104"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Wall_of_Flesh",
    "https://calamitymod.wiki.gg/wiki/Wall_of_Flesh",
    "https://calamitymod.wiki.gg/wiki/Configuration_options"
   ]
  ]
 ],
 "done": [
  "월드에 맞는 악성 지형 보스를 선택하고 창공석 해금 조건을 확인했다.",
  "스켈레트론 이후 던전과 지하세계의 장비를 확인했다.",
  "월 오브 플레시 전투 통로와 소환 조건을 준비하고 처치했다."
 ]
}
];
if(data.length!==3||data.some(c=>!c.goal||!c.sections.length||c.sections.some(s=>s.length!==6||!s[5].length)))throw Error('Invalid walkthrough content');
const reader=$('view-guides'), article=reader.querySelector('.guide-reader-v43'), pager=article.querySelector('.guide-pager-v43');
const body=node('div',undefined,'walkthrough-v49');article.insertBefore(body,pager);
const css=node('style');css.textContent='.walkthrough-v49{display:grid;gap:14px;margin:20px 0}.walkthrough-v49 h3{margin:0 0 9px;font-size:18px;line-height:1.45}.walkthrough-v49 p{line-height:1.85;margin:6px 0;word-break:keep-all;overflow-wrap:anywhere}.walkthrough-v49 .walk-step-v49{padding:16px;border:1px solid #344652;border-radius:10px;background:#14212e}.walk-num-v49{color:#9fdfce;font-size:12px;letter-spacing:.08em;margin-bottom:7px}.walk-links-v49{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.walk-source-v49{font-size:12px;color:#aabccc;margin-top:10px}.walk-source-v49 summary{cursor:pointer}.walk-source-v49 a{color:#a9e5d4;text-decoration:underline}.walk-done-v49{padding:15px;border-left:3px solid #80c9b7;background:#152732;border-radius:6px}.walk-done-v49 ul{padding-left:20px;margin:8px 0;line-height:1.8}.walk-level-v49{font-size:13px;color:#a9e5d4;font-weight:600}';document.head.append(css);
const notice=reader.querySelector('.guide-notice');notice.querySelector('strong').textContent='진행 공략 연재 중 · 1~3장 공개';notice.querySelector('p').textContent='게임 시작부터 하드모드 진입까지 읽을 수 있습니다. 4~6장은 아직 목차이며, 공개 본문은 공식 문서 참고 기반으로 실제 Calamity 2.2.4 플레이 검증 전입니다.';
reader.querySelector('.guide-outline-v43 > p').textContent='1~3장 공개 · 4~6장 준비 중';
const prevRender=renderGuideV43;
renderGuideV43=function(){
prevRender();
const mode=uiV43.mode,i=uiV43.chapters[mode],c=data[i];
body.replaceChildren();
if(i===2&&mode==='advanced')add(body,'p','심화 전용 장비 조합과 난이도별 패턴은 작성 전입니다. 현재는 초보자 본문을 표시합니다.','muted');
const buttons=$('guideChaptersV43').querySelectorAll('button');buttons.forEach((b,j)=>{b.textContent+=(data[j]?' · 공개':' · 준비 중')});
if(!c){$('guideChapterDescV43').textContent='이 단계는 본문 작성 전입니다. 보스 로드맵과 도감에서 현재 확인 가능한 정보를 살펴보세요.';const b=add(body,'button','보스 로드맵 열기');b.type='button';b.onclick=()=>showView('roadmap');return}
$('guideChapterDescV43').textContent=c.goal;
for(const [j,s] of c.sections.entries()){
const [title,beginner,normal,advanced,refs,sources]=s,sec=add(body,'section',undefined,'walk-step-v49');
add(sec,'div','STEP '+String(j+1).padStart(2,'0'),'walk-num-v49');add(sec,'h3',title);if(i===2&&mode!=='normal'){for(const part of beginner.split('|')){const at=part.indexOf('~');const p=add(sec,'p');add(p,'strong',part.slice(0,at)+' · ');p.append(document.createTextNode(part.slice(at+1)))}}else add(sec,'p',mode==='normal'?normal:beginner);
if(mode==='advanced'&&advanced){add(sec,'div','심화 포인트','walk-level-v49');add(sec,'p',advanced)}
if(refs.length){const links=add(sec,'div',undefined,'walk-links-v49');for(const [t,id] of refs){if(!D[t]?.[id])continue;const b=add(links,'button',name(D[t][id])+' ↗','link');b.type='button';b.onclick=()=>{guideReturnV43={mode,chapter:i,scroll:window.scrollY};openRef(t,id)}}if(!links.childElementCount)links.remove()}
const src=add(sec,'details',undefined,'walk-source-v49');add(src,'summary','참고 문서');const sl=add(src,'div',undefined,'walk-links-v49');for(const u of sources){const a=add(sl,'a',decodeURIComponent(u.split('/').pop()).replaceAll('_',' ')+' ↗');a.href=u;a.target='_blank';a.rel='noopener noreferrer'}
}
const end=add(body,'section',undefined,'walk-done-v49');add(end,'h3','다음 단계로 넘어가기 전');const ul=add(end,'ul');for(const d of c.done)add(ul,'li',d);add(end,'p','권장 확인 사항이며 필수 조건이나 진행 기록 입력은 아닙니다.','muted');
};
const homeHeading=document.querySelector('.home-block .section-heading p');if(homeHeading&&homeHeading.textContent.includes('공략'))homeHeading.textContent='초기 진행 1~3장 공개 · 도감 이용 가능';
const hb=$('homeGuideV44');if(hb)hb.textContent='진행 공략 읽기';
document.title='Calamity Guide · 한국어 종합 공략집 V50';$('version').textContent='Calamity '+D.version+' · V50';renderGuideV43();
})();
