const benefitsV455=Object.fromEntries(`king|갈고리와 탈것으로 초반 이동 수단 확보|T2585,T2430
desert|진주 파편을 모아 대양 계열 장비 제작|PearlShard
eye|악성 지형 광석과 전문가 이상 방패 획득, 산성비 1단계 해금|T3097,T56,T880
crabulon|버섯 계열 무기 및 전문가 이상 균류 덩어리 획득|FungalClump,Mycoroot
evil|그림자 비늘 또는 조직 표본으로 악성 지형 곡괭이와 방어구 제작|T86,T1329
evilcal|공중섬의 마력 제거 창공석이 변환되어 창공석 장비 제작 가능|AerialiteOre
bee|밀랍으로 벌 방어구와 벌 계열 무기 제작|T2431
deer|체스터 소환 아이템과 설원 전투 장비 획득|T5098
skeletron|던전 안전 탐험, 기계공 구출과 던전 장비 확보; 전문가 이상 뼈 장갑|T3245
slimegod|정제된 젤로 스태티젤 방어구와 상위 무기 제작|PurifiedGel,StatigelGreaves
wall|하드모드 진입, 새로운 적·장비 및 광석 해금; 전문가 이상 악마의 심장 획득 가능|T3335,T364,T1104
queen|크리스탈 어쌔신 방어구와 칼날 스태프 등 장비 획득|T4982,T4758
cryogen|냉동석 생성 조건 충족, 냉동석 주괴로 장비와 생명 합금괴 제작|CryonicOre
twins|시야의 영혼 획득 및 기계 보스 공동 광석 해금 진행|T549
aquatic|산성비 2단계 해금, 수중 계열 무기와 부식성 척추 획득|CorrosiveSpine
destroyer|힘의 영혼 획득 및 기계 보스 공동 광석 해금 진행|T548
brimstone|유황 계열 무기와 장미석 등 장신구 획득|RoseStone
prime|공포의 영혼 획득 및 기계 보스 공동 광석 해금 진행|T547
clone|재앙의 잿가루로 장비 제작 및 최후반 소환 준비|AshesofCalamity
plantera|다년생 광석 생성, 살아있는 파편 및 사원 열쇠 획득|PerennialOre,LivingShard
leviathan|심연의 심해 세포·루메닐 드롭 해금, 커뮤니티 등 장신구 획득 가능|DepthCells,Lumenyl,TheCommunity
aureus|아우레우스 전지 및 아스트랄 계열 장비 획득|AureusCell
golem|픽소우 획득 기회 및 딱정벌레 껍질로 방어구 제작|T1294,T2218
fishron|피시론의 날개 및 강력한 해양 계열 무기 획득 기회|T2609
plague|역병 세포 보관함과 역병 계열 무기 획득|PlagueCellCanister
empress|전문가 이상 활공의 휘장 등 이동 장비와 빛 계열 무기 획득|T4989
ravager|살점의 정동 등 제작 재료 획득 기회|FleshyGeode
cultist|고대의 매니퓰레이터 획득 및 천체 이벤트 진입|T3549
deus|아스트랄 광석의 보스 처치 채광 제한 해제; 충분한 채광력은 별도 필요|AstralOre
moon|루미나이트 획득 및 문 로드 이후 성장 구간 진입|T3460
guardians|프로비던스 소환용 부정한 코어 획득|ProfanedCore
dragonfolly|찬란한 깃털과 번개 계열 무기 획득|EffulgentFeather
providence|유리블룸 광석 생성 및 신성한 정동 획득|UelibloomOre,DivineGeode
weaver|강화된 장갑 획득, 후기 장비 제작 재료|ArmoredShell
void|암흑 플라즈마 획득, 후기 장비 제작 재료|DarkPlasma
signus|뒤틀린 황천 획득, 후기 장비 제작 재료|TwistingNether
polter|파멸의 영혼 획득, 산성비 3단계 및 심연 사신 이빨 드롭 해금|RuinousSoul,ReaperTooth
duke|돌연변이 송로버섯과 독성 계열 무기 획득 기회|MutatedTruffle
dog|코스밀라이트 주괴 획득, 강화된 이벤트의 재료 드롭 해금|CosmiliteBar,NightmareFuel,EndothermicEnergy,DarksunFragment
yharon|오릭 광석 생성 및 야론의 영혼 파편 획득, 최후반 장비 제작|AuricOre,YharonSoulFragment
exo|엑소 프리즘과 엑소 무기 획득, 최후반 제작|ExoPrism
scal|소멸의 잿더미와 최후반 무기 획득, 엔드게임 제작|AshesofAnnihilation
wyrm|광어 대포와 심연 조개 화석 등 심연 보상 획득|HalibutCannon,AbyssShellFossil`.split('\n').map(l=>{const [k,text,ids]=l.split('|');return [k,{text,ids:ids.split(',').map(x=>/^T\d+$/.test(x)?'Terraria/items/'+x.slice(1):'CalamityMod/'+x)}]}));
