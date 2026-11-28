# V89 등록 도감 및 실행 로직 검수
- 실제 2.2.4 도감 blob 확보(8,126 items/1,058 NPCs/4,960 recipes, UTF-8 18,074,128 bytes). 제작법 링크·재료·NPC 그룹 부위·등록 드롭 출처 검사 누락 각 0. 762 명시적 도감 참조 누락 0; 215 앵커/277 원본 대상 오류 0.
- 미니 이름 매칭 실제 함수 실행: Elderberry 구명칭 문맥 오류 수정, 독립 바닐라 Elderberry 보존. 다의 이름 43개는 항목 선택 기능 유지, 추후 UX 검토.
- 원본 페이지 연결 및 복귀 로직 277개, 페이지 이동 상태 601개 통과(실제 함수 본문 + 최소 스텁). 이전 로더 20개 JS 구문과 변경 JS 8개 구문 컴파일 통과. 실제 브라우저 DOM/모바일/게임 테스트 아님.
- 등록 제작법 대조로 Profaned Shard, Cosmic Worm, Altar of the Accursed, Miracle Matter, Shadowspec Bar 비용 보완. Cosmic Anvil 등록 데이터와 위키 변경 기록 차이 명시. 실제 게임 레시피 재확인 필요. 도감 원본 수정 없음.
- 배포 URL 열람 및 컨테이너 GitHub DNS 실패로 실제 브라우저 실행 차단. 정식 배포본 미변경.
