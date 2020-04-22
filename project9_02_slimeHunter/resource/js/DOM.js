// 타이틀 화면 - 게임 시작 버튼
const gameStartButtonElement = document.querySelector('.game-start--btn');
const userNameInput = document.getElementById('user-name');

// 결과 화면
const gameEndPageElement = document.getElementById('game-end-Page');
const backdropElement = document.getElementById('backdrop');
const retryButtonElement = gameEndPageElement.querySelector('button');

// 가위, 바위, 보 버튼
const rspButtonsElement = document.getElementById('rsp-select').querySelectorAll('button');

// 상태 창
const playerStateElement = document.getElementById('player-state');
const computerStateElement = document.getElementById('com-state');

// // 상태 창 - 게임 결과
// const playerStateResultElement = playerStateElement.querySelector('.info--win-or-not')
// const computerStateResultElement = computerStateElement.querySelector('.info--win-or-not')

// 상태 창 - 유저 이름 
const userNameElement = playerStateElement.querySelector('.info--player-name');

// 상태 창 - 가위, 바위, 보 선택 결과
const playerChoiceResultElement = playerStateElement.querySelector('.info--selected-rsp');
const computerChoiceResultElement = computerStateElement.querySelector('.info--selected-rsp');

// 상태 창 - 에너지바
const playerLifeBarElement = playerStateElement.querySelector('.bar--energy');
const computerLifeBarElement = computerStateElement.querySelector('.bar--energy');

//  게임 결과 표시 창
const damageDisplayElement = document.getElementById('damage').firstElementChild;