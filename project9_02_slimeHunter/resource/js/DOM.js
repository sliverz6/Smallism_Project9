// 가위, 바위, 보 버튼
const rspButtonsElement = document.getElementById('rsp-select').querySelectorAll('button');

// 상태 창
const playerStateElement = document.getElementById('player-state');
const computerStateElement = document.getElementById('com-state');

// 상태 창 - 게임 결과
const playerStateResultElement = playerStateElement.querySelector('.info--win-or-not')
const computerStateResultElement = computerStateElement.querySelector('.info--win-or-not')

// 상태 창 - 가위, 바위, 보 선택 결과
const playerChoiceResultElement = playerStateElement.querySelector('.info--selected-rsp');
const computerChoiceResultElement = computerStateElement.querySelector('.info--selected-rsp');

// 상태 창 - 에너지바
const playerLifeBarElement = playerStateElement.querySelector('.bar--energy');
const computerLifeBarElement = computerStateElement.querySelector('.bar--energy');