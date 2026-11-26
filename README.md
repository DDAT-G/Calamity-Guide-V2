# Calamity Guide V2 · 개발판

기존 배포본은 main 브랜치에 보존. develop은 순수 바닐라 + 칼라미티 본편 데이터 재구축용입니다. 이전 데이터는 main의 이력에 남아 있으며 이 브랜치에서 제공하지 않습니다.

## 실행
`python -m http.server 8000` 후 http://localhost:8000/ 접속 (JSON fetch 사용).

## 구조
- index.html: 기존 헤더와 접이식 사이드바
- css/style.css: 기존 반응형 디자인
- js/app.js: 기존 공략 렌더러와 메뉴 기능, JSON 로더
- data/progression.json: 진행 단계, 추천 장비, 보스
- data/items.json: 아이템, 제작법, 드롭
- data/extras.json: 이벤트, 강화, 날개, 제작대, 추천 모드
- data/meta.json: 기준 버전, 출처, 업데이트

## 검증 원칙
기준 버전 확정 후 위키·실제 게임 데이터를 대조. 각 레코드에 stable ID, 소속 모드, 버전, 출처, 검증 상태를 기록하고 확인되지 않은 항목은 공개 데이터에 추가하지 않습니다. 외부 모드 콘텐츠는 본편 공략에 넣지 않습니다. 현재 데이터는 모두 빈 상태입니다.
