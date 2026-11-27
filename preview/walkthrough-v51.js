/* V51: Hardmode progression through Moon Lord, beginner-first. */
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
},
{
 "goal": "하드모드 진입부터 문 로드까지 진행합니다. 광석 해금과 제작대 교체를 먼저 이해하고, 각 보스의 전투와 보상으로 다음 목표를 준비하세요.",
 "sections": [
  [
   "하드모드 진입 직후",
   "목표~새로운 적이 강해지므로 첫 목표는 장비 교체입니다. 월 오브 플레시 보상을 확인하고 기존 거점 주변을 정비하세요.|생존~날개와 이동 장신구를 준비하고 지하 정글의 생명 열매를 찾아 최대 체력을 늘립니다. 생명 열매는 칼라미티에서 하드모드 진입부터 생성될 수 있습니다.|채광~초기 진행 개편이 켜져 있으면 코발트·팔라듐부터 캐세요. 기존 지옥석 곡괭이로 시작할 수 있습니다. 아스트랄 감염의 광석은 아스트럼 데우스 처치 전에는 실제 광석을 얻지 못합니다.|다음 목표~첫 기계 보스 전까지 사용 가능한 장비를 제작하고 비행과 회피를 연습하세요.",
   "생명 열매·날개·코발트/팔라듐 → 첫 기계 보스 준비.",
   "",
   [
    [
     "items",
     "Terraria/items/364"
    ],
    [
     "items",
     "Terraria/items/1104"
    ],
    [
     "items",
     "Terraria/items/1291"
    ],
    [
     "items",
     "CalamityMod/AstralOre"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Wall_of_Flesh",
    "https://calamitymod.wiki.gg/wiki/Vanilla_changes",
    "https://calamitymod.wiki.gg/wiki/Ores"
   ]
  ],
  [
   "광석 해금과 제작대 · 반드시 확인",
   "설정~Early Hardmode Progression Rework가 활성화된 경우를 기준으로 합니다. 비활성화했다면 바닐라식 제단 파괴 등 진행 방식이 달라집니다.|월 오브 플레시~코발트·팔라듐. 이 단계에서는 기존 철/납 모루를 활용하는 초기 제작법도 있습니다.|기계 보스 1종~미스릴·오리칼쿰 생성. 광석을 캐서 하드모드 모루를 제작하세요.|기계 보스 2종~아다만타이트·티타늄 생성. 상위 제련로와 곡괭이, 장비 제작을 준비합니다.|기계 보스 3종~지하 신성지대에 신성한 광석이 생성되고 이후 기계 보스에서 신성한 주괴를 획득할 수 있습니다. 같은 보스를 반복해서 잡는 것은 서로 다른 보스 처치 수를 늘리지 않습니다.",
   "개편 ON: 월 오브 플레시 → 코발트/팔라듐 → 1종 미스릴/오리칼쿰 → 2종 아다만타이트/티타늄 → 3종 신성한 광석.",
   "",
   [
    [
     "items",
     "Terraria/items/364"
    ],
    [
     "items",
     "Terraria/items/1104"
    ],
    [
     "items",
     "Terraria/items/365"
    ],
    [
     "items",
     "Terraria/items/1105"
    ],
    [
     "items",
     "Terraria/items/366"
    ],
    [
     "items",
     "Terraria/items/1106"
    ],
    [
     "items",
     "CalamityMod/HallowedOre"
    ],
    [
     "items",
     "Terraria/items/525"
    ],
    [
     "items",
     "Terraria/items/1220"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Configuration_options",
    "https://calamitymod.wiki.gg/wiki/Vanilla_changes",
    "https://calamitymod.wiki.gg/wiki/Ores",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "여왕 슬라임 · 선택",
   "소환~지하 신성지대에서 젤라틴 크리스탈을 찾아 신성지대에서 사용합니다.|준비~넓은 발판과 날개를 활용할 수 있는 공간을 만드세요.|전투~소환된 슬라임과 튀는 투사체를 살피고 비행 단계에서는 보스 아래에 오래 머물지 마세요.|처치 후~크리스탈 어쌔신 방어구나 칼날 스태프 등의 획득 여부를 확인합니다. 장비가 충분하면 건너뛸 수 있습니다.",
   "젤라틴 크리스탈 → 신성지대 → 선택 장비.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/657"
    ],
    [
     "items",
     "Terraria/items/4982"
    ],
    [
     "items",
     "Terraria/items/4758"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Queen_Slime",
    "https://calamitymod.wiki.gg/wiki/Bosses"
   ]
  ],
  [
   "크라이오젠",
   "소환~Cryo Key를 제작해 설원 또는 얼음 지역에서 사용합니다.|준비~날개와 이동 장신구를 갖추고 눈 지형 내에 긴 발판을 확보하세요.|전투~얼음 투사체와 돌진 경로를 확인하면서 움직입니다. 보호막이 있을 때에는 공격 기회를 기다리면서 회피를 우선하세요.|처치 후~냉동석과 대마법사 관련 해금을 확인합니다. 냉동석은 처치로 생성되더라도 아다만타이트·티타늄급 채광력이 필요합니다. 개편 설정에서는 기계 보스 두 종류를 잡은 뒤 채광을 진행하세요.",
   "Cryo Key → 설원 → 냉동석 해금, 채광은 기계 2종 이후 준비.",
   "",
   [
    [
     "npcs",
     "CalamityMod/Cryogen"
    ],
    [
     "items",
     "CalamityMod/CryoKey"
    ],
    [
     "items",
     "CalamityMod/CryonicOre"
    ],
    [
     "items",
     "CalamityMod/CryonicBar"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Cryogen",
    "https://calamitymod.wiki.gg/wiki/Cryonic_Ore",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "기계 보스 1~3종 · 순서 선택",
   "소환~쌍둥이는 Mechanical Eye, 파괴자는 Mechanical Worm, 스켈레트론 프라임은 Mechanical Skull을 밤에 사용합니다. 자연 등장할 수도 있습니다.|순서~고정된 순서는 없습니다. 관통형 무기가 있다면 파괴자, 단일 대상 공격과 비행 회피가 편하다면 쌍둥이를 먼저 고려하세요. 처음 처치한 보스의 종류와 관계없이 다음 광석 등급이 해금됩니다.|공통 준비~밤 시작에 도전하고 날개, 긴 발판, 회복 및 이동 물약을 준비하세요. 각 처치 후 새 광석으로 장비를 보완한 다음 다음 기계 보스에 도전합니다.",
   "기계 3종을 서로 다른 순서로 처치 가능. 각각 장비를 교체.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/125"
    ],
    [
     "npcs",
     "Terraria/npcs/134"
    ],
    [
     "npcs",
     "Terraria/npcs/127"
    ],
    [
     "items",
     "Terraria/items/544"
    ],
    [
     "items",
     "Terraria/items/556"
    ],
    [
     "items",
     "Terraria/items/557"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Configuration_options",
    "https://calamitymod.wiki.gg/wiki/Bosses",
    "https://terraria.wiki.gg/wiki/Mechanical_bosses"
   ]
  ],
  [
   "쌍둥이",
   "전투~두 눈이 동시에 공격합니다. 레이저를 쏘는 레티나이저와 돌진하는 스파즈마티즘의 위치를 동시에 확인하고, 한쪽부터 집중해 처치하는 전략을 고려하세요.|회피~비행하면서 수평 거리를 확보하고 돌진 방향을 보며 고도를 변경하세요.|처치 후~시야의 영혼을 얻고 기계 보스 처치 수에 따른 광석 해금을 확인합니다.",
   "두 눈 중 하나씩 집중 → 시야의 영혼 → 광석 단계 확인.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/125"
    ],
    [
     "items",
     "Terraria/items/549"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/The_Twins",
    "https://calamitymod.wiki.gg/wiki/The_Twins"
   ]
  ],
  [
   "파괴자",
   "전투~길게 연결된 몸체를 관통하는 공격이 유용할 수 있습니다. 머리와 접촉하지 않도록 주의하고 주변에 나타나는 프로브도 처리하세요.|회피~지면에서 올라오는 방향과 레이저를 보면서 발판 사이를 이동합니다. 정지한 채 공격에만 집중하지 마세요.|처치 후~힘의 영혼을 모아 제작 후보를 확인하고 새 광석 장비를 준비합니다.",
   "관통 공격·프로브 처리 → 힘의 영혼.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/134"
    ],
    [
     "items",
     "Terraria/items/548"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/The_Destroyer",
    "https://calamitymod.wiki.gg/wiki/The_Destroyer"
   ]
  ],
  [
   "스켈레트론 프라임",
   "전투~여러 팔이 동시에 공격하므로 위치를 확인하고 공격 부담이 큰 팔부터 제거하는 방법을 고려하세요.|회피~머리 회전에 접근하지 말고 날개를 사용해 발판과 빈 공간을 오가세요. 낮이 되기 전에 전투를 마치는 것이 안전합니다.|처치 후~공포의 영혼을 확보합니다. 기계 보스 세 종류를 모두 잡았다면 신성한 광석 및 다음 장비를 확인하세요.",
   "팔과 머리 회피 → 공포의 영혼 → 다음 장비.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/127"
    ],
    [
     "items",
     "Terraria/items/547"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Skeletron_Prime",
    "https://calamitymod.wiki.gg/wiki/Skeletron_Prime"
   ]
  ],
  [
   "수중의 무법자 · 기계 보스 1종 이후 권장",
   "소환~유황 바다에서 자연 등장하거나 Seafood로 소환할 수 있습니다.|준비~유황 바다의 독성 물과 이동 제한에 대비하고 지형을 벗어나지 않는 전투 공간을 준비하세요.|전투~몸체와 투사체를 피하면서 머리의 이동 방향을 확인합니다. 전투 중 무리해서 물속 깊은 곳으로 내려가지 마세요.|처치 후~산성비 2단계가 열립니다. 부식성 척추와 수중 계열 장비를 확인하고 필요한 산성비 재료를 모으세요.",
   "Seafood → 유황 바다 → 산성비 2단계.",
   "",
   [
    [
     "npcs",
     "CalamityMod/AquaticScourgeHead"
    ],
    [
     "items",
     "CalamityMod/Seafood"
    ],
    [
     "items",
     "CalamityMod/CorrosiveSpine"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Aquatic_Scourge",
    "https://calamitymod.wiki.gg/wiki/Acid_Rain",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "유황 정령",
   "소환~유황 불길 지역에서 Charred Idol을 사용합니다.|준비~용암과 좁은 지형이 있는 구역이므로 발판과 이동 경로를 정리합니다.|전투~투사체의 빈 공간을 찾아 움직이고 정지한 채 공격을 맞지 않도록 하세요.|처치 후~장미석과 유황 계열 장비를 확인합니다. 해당 지역의 Infernal Suevite 광석도 해금 조건과 채광력을 확인한 뒤 확보하세요.",
   "Charred Idol → 유황 불길 지역 → 유황 장비.",
   "",
   [
    [
     "npcs",
     "CalamityMod/BrimstoneElemental"
    ],
    [
     "items",
     "CalamityMod/CharredIdol"
    ],
    [
     "items",
     "CalamityMod/RoseStone"
    ],
    [
     "items",
     "CalamityMod/InfernalSuevite"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Brimstone_Elemental",
    "https://calamitymod.wiki.gg/wiki/Ores",
    "https://calamitymod.wiki.gg/wiki/Charred_Idol"
   ]
  ],
  [
   "칼라미타스 클론 · 기계 3종 이후 권장",
   "소환~Eye of Desolation을 제작하고 지상에서 사용하세요. 최신 문서와 이전 버전의 시간 조건이 다를 수 있어 밤에 준비하는 것이 안전합니다.|전투~날아오는 투사체를 확인하며 이동하고 소환된 적을 처리합니다. 투사체가 많아질 때는 공격보다 회피를 우선하세요.|처치 후~재앙의 잿가루를 보관하고 제작법을 확인합니다. 이후 플랜테라의 재료와 함께 중요한 합성 재료를 만드는 데 사용됩니다.",
   "Eye of Desolation → 칼라미타스 클론 → 재앙의 잿가루.",
   "",
   [
    [
     "npcs",
     "CalamityMod/CalamitasClone"
    ],
    [
     "items",
     "CalamityMod/EyeofDesolation"
    ],
    [
     "items",
     "CalamityMod/AshesofCalamity"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Calamitas_Clone",
    "https://calamitymod.wiki.gg/wiki/Eye_of_Desolation",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "플랜테라",
   "소환~지하 정글에서 플랜테라 구근을 파괴합니다. 칼라미티에서는 구근이 하드모드 진입부터 생성될 수 있지만 기계 3종 이후 전투를 권장합니다. Portabulb는 대체 소환 수단입니다.|준비~지하 정글 안에 넓은 방을 파고 발판을 설치합니다. 지상으로 올라가면 전투가 불리해질 수 있습니다.|전투~가시와 투사체를 피해 이동하고 두 번째 단계에서는 촉수에 둘러싸이지 않도록 주의하세요.|처치 후~사원 열쇠, 살아있는 파편, 다년생 광석 해금을 확인하세요. 던전의 하드모드 적과 장비도 탐색할 시점입니다.",
   "구근 → 지하 정글 → 사원 열쇠·다년생 광석·살아있는 파편.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/262"
    ],
    [
     "items",
     "CalamityMod/Portabulb"
    ],
    [
     "items",
     "CalamityMod/PerennialOre"
    ],
    [
     "items",
     "CalamityMod/LivingShard"
    ],
    [
     "items",
     "Terraria/items/1141"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Plantera",
    "https://calamitymod.wiki.gg/wiki/Portabulb",
    "https://calamitymod.wiki.gg/wiki/Ores"
   ]
  ],
  [
   "플랜테라 이후 장비 교체",
   "채광~동굴에서 다년생 광석을 찾고 적절한 채광 도구를 갖추세요.|재료~살아있는 파편과 앞에서 확보한 재앙의 잿가루 등으로 제작할 수 있는 재료와 장비를 도감에서 확인하세요.|직업~근접은 사거리와 생존, 원거리는 탄약과 명중, 마법은 마나, 소환은 슬롯, 로그는 스텔스 지원 여부를 우선 비교합니다. 도감 제작법을 통해 실제 보유 재료에서 만들 수 있는 후보를 고르세요.",
   "다년생 광석·합성 재료 확보 → 직업별 장비 갱신.",
   "",
   [
    [
     "items",
     "CalamityMod/PerennialOre"
    ],
    [
     "items",
     "CalamityMod/LivingShard"
    ],
    [
     "items",
     "CalamityMod/AshesofCalamity"
    ],
    [
     "items",
     "CalamityMod/CoreofCalamity"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Guide:Class_setups/Hardmode",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "레비아탄과 아나히타",
   "소환~바다에서 등장하는 ??? 생명체를 처치해 전투를 시작합니다. 소환 아이템 Naiad's Warhorn의 제작 조건도 도감에서 확인하세요.|준비~바다에 충분한 발판을 설치하고 물에 빠져 이동이 제한되지 않도록 하세요.|전투~아나히타의 투사체와 레비아탄의 큰 몸체가 함께 나타날 때 서로의 위치를 보면서 회피합니다.|처치 후~해양 계열 무기와 장신구를 확인합니다. 심연 적의 심해 세포와 루메닐 드롭 등 새 재료도 확인하세요.",
   "바다의 ??? → 두 보스 처치 → 심연 재료 해금.",
   "",
   [
    [
     "npcs",
     "CalamityMod/Anahita"
    ],
    [
     "items",
     "CalamityMod/DepthCells"
    ],
    [
     "items",
     "CalamityMod/Lumenyl"
    ],
    [
     "items",
     "CalamityMod/TheCommunity"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Leviathan_and_Anahita",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "아스트럼 아우레우스",
   "소환~공중 연구소의 Planetoid Schematic과 코드브레이커의 해독 진행을 확인한 뒤 Astral Chunk를 제작합니다. 아스트랄 감염 지역에서 밤에 도전하는 것을 권장합니다.|전투~도약과 투사체의 방향을 살피고 수직·수평 이동을 번갈아 활용하세요.|처치 후~아우레우스 전지와 아스트랄 계열 장비, 아스트랄 상자 해금을 확인하세요. 이 보스만으로 아스트랄 광석 채광 조건이 해결되는 것은 아닙니다.",
   "공중 연구소 설계도 해독 → Astral Chunk → 아스트랄 장비.",
   "",
   [
    [
     "npcs",
     "CalamityMod/AstrumAureus"
    ],
    [
     "items",
     "CalamityMod/AstralChunk"
    ],
    [
     "items",
     "CalamityMod/AureusCell"
    ],
    [
     "items",
     "CalamityMod/AstralOre"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Astrum_Aureus",
    "https://calamitymod.wiki.gg/wiki/Astral_Chunk",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "골렘",
   "소환~플랜테라의 사원 열쇠로 정글 사원에 들어가 리자드 파워 셀을 제단에 사용합니다.|준비~사원 함정과 장애물을 정리하고 전투실의 공간을 확인합니다.|전투~주먹과 머리의 공격을 피해 움직이세요. 좁은 공간에서 벽에 몰리지 않도록 주의합니다.|처치 후~픽소우, 딱정벌레 껍질 등 장비 후보를 확인하세요. 던전 입구의 광신도 이벤트가 다음 필수 진행 목표가 됩니다.",
   "사원 열쇠 → 제단·파워 셀 → 골렘 → 광신도.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/245"
    ],
    [
     "items",
     "Terraria/items/1294"
    ],
    [
     "items",
     "Terraria/items/2218"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Golem",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "피시론 공작 · 선택",
   "소환~발광 버섯 지역에서 송로버섯 지렁이를 잡아 바다에서 낚시합니다.|전투~빠른 돌진을 우선 피하고 회오리와 투사체가 쌓인 구역을 벗어나세요. 바다를 벗어나지 않도록 주의합니다.|처치 후~피시론 날개와 해양 무기를 확인합니다. 다음 필수 보스를 위한 이동 능력이 부족하다면 도전할 가치가 있습니다.",
   "송로버섯 지렁이 낚시 → 돌진 회피 → 날개·무기.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/370"
    ],
    [
     "items",
     "Terraria/items/2609"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Duke_Fishron",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "역병을 부르는 골리앗 · 선택",
   "소환~골렘 이후 정글의 역병 계열 재료를 모아 Abombination을 제작하고 정글에서 사용합니다.|전투~돌진과 미사일 등 투사체 경로를 피해 이동합니다. 정글 안에서 전투할 수 있도록 발판을 준비하세요.|처치 후~역병 세포 보관함과 직업별 무기 후보를 확인합니다.",
   "골렘 이후 역병 재료 → Abombination → 역병 장비.",
   "",
   [
    [
     "npcs",
     "CalamityMod/PlaguebringerGoliath"
    ],
    [
     "items",
     "CalamityMod/Abombination"
    ],
    [
     "items",
     "CalamityMod/PlagueCellCanister"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/The_Plaguebringer_Goliath",
    "https://calamitymod.wiki.gg/wiki/Abombination"
   ]
  ],
  [
   "빛의 여제 · 선택",
   "소환~지상 신성지대에서 신비의 풀잠자리(Prismatic Lacewing)를 잡거나 발견한 뒤 밤에 처치해 전투를 시작합니다. 칼라미티에서는 하드모드 시작부터 등장 조건을 충족할 수 있습니다.|전투~빛 투사체의 패턴과 빈 공간을 보고 이동하세요. 처음에는 낮 도전을 피하고 밤 전투부터 익히세요.|처치 후~전문가 이상에서 활공의 휘장 등 이동 보상을 확인하고 직업에 맞는 무기를 살펴봅니다.",
   "밤 풀잠자리 → 빛 공격 회피 → 선택 장비.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/636"
    ],
    [
     "items",
     "Terraria/items/4989"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Empress_of_Light",
    "https://calamitymod.wiki.gg/wiki/Vanilla_changes"
   ]
  ],
  [
   "래비저 · 선택",
   "소환~지상에서 Death Whistle을 사용합니다.|전투~큰 몸체의 도약과 주변에서 나타나는 공격 요소를 살펴보세요. 발판과 날개를 활용해 안전한 거리를 유지합니다.|처치 후~살점의 정동 등 여러 제작 재료와 장비 후보를 확인합니다. 부족한 합금·핵심 재료를 마련하는 데 도움이 됩니다.",
   "Death Whistle → 지상 전투 → 제작 재료 확보.",
   "",
   [
    [
     "npcs",
     "CalamityMod/RavagerBody"
    ],
    [
     "items",
     "CalamityMod/DeathWhistle"
    ],
    [
     "items",
     "CalamityMod/FleshyGeode"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Ravager",
    "https://calamitymod.wiki.gg/wiki/Death_Whistle"
   ]
  ],
  [
   "미친 광신도와 천체 이벤트",
   "소환~골렘 처치 후 던전 입구의 광신도들을 처치합니다. 전투 준비 전에는 광신도를 건드리지 마세요.|전투~분신이 생기면 실제 광신도를 확인하고 무작정 공격하지 마세요. 날개와 발판을 활용해 투사체를 피합니다.|처치 후~고대의 매니퓰레이터를 획득하고 천체 기둥 이벤트가 시작됩니다. 네 기둥은 해당 구역 적을 처치해 보호막을 제거한 후 공격합니다.|주의~마지막 기둥을 부수면 문 로드 전투가 이어지므로 체력과 물약을 준비하고 마지막 기둥을 처리하세요. 아스트럼 데우스 도전은 그 전에 준비할 수 있습니다.",
   "광신도 → 매니퓰레이터 → 네 기둥 → 문 로드 준비.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/439"
    ],
    [
     "items",
     "Terraria/items/3549"
    ],
    [
     "items",
     "Terraria/items/3456"
    ],
    [
     "items",
     "Terraria/items/3457"
    ],
    [
     "items",
     "Terraria/items/3458"
    ],
    [
     "items",
     "Terraria/items/3459"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Lunatic_Cultist",
    "https://terraria.wiki.gg/wiki/Lunar_Events",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression"
   ]
  ],
  [
   "아스트럼 데우스",
   "소환~아스트랄 감염 지역의 적에서 Titan Heart를 얻고 밤에 Astral Beacon과 상호작용합니다. 재도전 시 Starcore를 사용할 수 있습니다.|준비~긴 이동 공간과 날개를 챙기고 충분히 강한 무기를 준비하세요. 문 로드 전 추천 목표이지만 소환 가능 시점과 권장 시점은 다릅니다.|전투~거대한 지렁이 몸체들의 이동 방향을 확인해 접촉을 피합니다. 관통형 공격은 상황에 따라 유용합니다.|처치 후~아스트랄 광석을 실제로 획득할 수 있게 되며 별도의 충분한 채광력이 필요합니다. 천체 파편과 아스트랄 장비 제작 후보를 확인하세요.",
   "Titan Heart + Astral Beacon(밤) → 아스트랄 광석 제한 해제.",
   "",
   [
    [
     "npcs",
     "CalamityMod/AstrumDeusHead"
    ],
    [
     "items",
     "CalamityMod/TitanHeart"
    ],
    [
     "items",
     "CalamityMod/Starcore"
    ],
    [
     "items",
     "CalamityMod/AstralOre"
    ]
   ],
   [
    "https://calamitymod.wiki.gg/wiki/Astrum_Deus",
    "https://calamitymod.wiki.gg/wiki/Astral_Beacon",
    "https://calamitymod.wiki.gg/wiki/Ores"
   ]
  ],
  [
   "문 로드 · 다음 성장 구간",
   "소환~네 천체 기둥을 파괴하면 문 로드가 등장합니다. 재도전에는 Celestial Sigil을 활용할 수 있습니다.|준비~넓은 전투 공간과 비행 수단, 현재 직업에 맞는 천체 계열 무기, 회복 물약을 갖추세요.|전투~손과 이마의 눈을 공격해 핵심 부위를 드러내고 눈에서 발사되는 큰 광선 및 투사체를 피해 움직이세요. 손이나 이마의 눈이 닫혀 있을 때는 다른 공격 기회를 찾으세요.|처치 후~루미나이트와 보스 보상을 획득합니다. 루미나이트 주괴와 새 장비를 준비해 문 로드 이후 칼라미티 보스 구간으로 넘어가세요.",
   "천체 기둥·Celestial Sigil → 문 로드 → 루미나이트 → 후반부.",
   "",
   [
    [
     "npcs",
     "Terraria/npcs/396"
    ],
    [
     "items",
     "Terraria/items/3460"
    ],
    [
     "items",
     "Terraria/items/3458"
    ],
    [
     "items",
     "Terraria/items/3601"
    ]
   ],
   [
    "https://terraria.wiki.gg/wiki/Moon_Lord",
    "https://calamitymod.wiki.gg/wiki/Guide:Mod_progression",
    "https://calamitymod.wiki.gg/wiki/Bosses"
   ]
  ]
 ],
 "done": [
  "초기 하드모드 개편 설정과 기계 보스 3종의 광석 해금 조건을 확인했다.",
  "플랜테라와 골렘을 처치하고 현재 직업의 장비를 갱신했다.",
  "문 로드를 처치하고 루미나이트와 후반 장비 제작법을 확인했다."
 ]
}
];
if(data.length!==4||data.some(c=>!c.goal||!c.sections.length||c.sections.some(s=>s.length!==6||!s[5].length)))throw Error('Invalid walkthrough content');
const reader=$('view-guides'), article=reader.querySelector('.guide-reader-v43'), pager=article.querySelector('.guide-pager-v43');
const body=node('div',undefined,'walkthrough-v49');article.insertBefore(body,pager);
const css=node('style');css.textContent='.walkthrough-v49{display:grid;gap:14px;margin:20px 0}.walkthrough-v49 h3{margin:0 0 9px;font-size:18px;line-height:1.45}.walkthrough-v49 p{line-height:1.85;margin:6px 0;word-break:keep-all;overflow-wrap:anywhere}.walkthrough-v49 .walk-step-v49{padding:16px;border:1px solid #344652;border-radius:10px;background:#14212e}.walk-num-v49{color:#9fdfce;font-size:12px;letter-spacing:.08em;margin-bottom:7px}.walk-links-v49{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.walk-source-v49{font-size:12px;color:#aabccc;margin-top:10px}.walk-source-v49 summary{cursor:pointer}.walk-source-v49 a{color:#a9e5d4;text-decoration:underline}.walk-done-v49{padding:15px;border-left:3px solid #80c9b7;background:#152732;border-radius:6px}.walk-done-v49 ul{padding-left:20px;margin:8px 0;line-height:1.8}.walk-level-v49{font-size:13px;color:#a9e5d4;font-weight:600}';document.head.append(css);
const notice=reader.querySelector('.guide-notice');notice.querySelector('strong').textContent='진행 공략 연재 중 · 1~4장 공개';notice.querySelector('p').textContent='게임 시작부터 문 로드 처치까지 읽을 수 있습니다. 5~6장은 아직 목차이며, 공개 본문은 공식 문서 참고 기반으로 실제 Calamity 2.2.4 플레이 검증 전입니다.';
reader.querySelector('.guide-outline-v43 > p').textContent='1~4장 공개 · 5~6장 준비 중';
const prevRender=renderGuideV43;
renderGuideV43=function(){
prevRender();
const mode=uiV43.mode,i=uiV43.chapters[mode],c=data[i];
body.replaceChildren();
if(i>=2&&mode==='advanced')add(body,'p','심화 전용 장비 조합과 난이도별 패턴은 작성 전입니다. 현재는 초보자 본문을 표시합니다.','muted');
const buttons=$('guideChaptersV43').querySelectorAll('button');buttons.forEach((b,j)=>{b.textContent+=(data[j]?' · 공개':' · 준비 중')});
if(!c){$('guideChapterDescV43').textContent='이 단계는 본문 작성 전입니다. 보스 로드맵과 도감에서 현재 확인 가능한 정보를 살펴보세요.';const b=add(body,'button','보스 로드맵 열기');b.type='button';b.onclick=()=>showView('roadmap');return}
$('guideChapterDescV43').textContent=c.goal;
for(const [j,s] of c.sections.entries()){
const [title,beginner,normal,advanced,refs,sources]=s,sec=add(body,'section',undefined,'walk-step-v49');
add(sec,'div','STEP '+String(j+1).padStart(2,'0'),'walk-num-v49');add(sec,'h3',title);if(i>=2&&mode!=='normal'){for(const part of beginner.split('|')){const at=part.indexOf('~');const p=add(sec,'p');add(p,'strong',part.slice(0,at)+' · ');p.append(document.createTextNode(part.slice(at+1)))}}else add(sec,'p',mode==='normal'?normal:beginner);
if(mode==='advanced'&&advanced){add(sec,'div','심화 포인트','walk-level-v49');add(sec,'p',advanced)}
if(refs.length){const links=add(sec,'div',undefined,'walk-links-v49');for(const [t,id] of refs){if(!D[t]?.[id])continue;const b=add(links,'button',name(D[t][id])+' ↗','link');b.type='button';b.onclick=()=>{guideReturnV43={mode,chapter:i,scroll:window.scrollY};openRef(t,id)}}if(!links.childElementCount)links.remove()}
const src=add(sec,'details',undefined,'walk-source-v49');add(src,'summary','참고 문서');const sl=add(src,'div',undefined,'walk-links-v49');for(const u of sources){const a=add(sl,'a',decodeURIComponent(u.split('/').pop()).replaceAll('_',' ')+' ↗');a.href=u;a.target='_blank';a.rel='noopener noreferrer'}
}
const end=add(body,'section',undefined,'walk-done-v49');add(end,'h3','다음 단계로 넘어가기 전');const ul=add(end,'ul');for(const d of c.done)add(ul,'li',d);add(end,'p','권장 확인 사항이며 필수 조건이나 진행 기록 입력은 아닙니다.','muted');
};
const homeHeading=document.querySelector('.home-block .section-heading p');if(homeHeading&&homeHeading.textContent.includes('공략'))homeHeading.textContent='초기 진행 1~4장 공개 · 도감 이용 가능';
const hb=$('homeGuideV44');if(hb)hb.textContent='진행 공략 읽기';
document.title='Calamity Guide · 한국어 종합 공략집 V51';$('version').textContent='Calamity '+D.version+' · V51';renderGuideV43();
})();
