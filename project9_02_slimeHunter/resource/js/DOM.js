// 가위, 바위, 보 버튼
const rspButtonsElement = document.getElementById('rsp-select');
const rockButtonElement = rspButtonsElement.children[0];
const scissorsButtonElement = rspButtonsElement.children[1];
const paperButtonElement = rspButtonsElement.children[2];

// 상태 창
const playerStateElement = document.getElementById('player-state');
const computerStateElement = document.getElementById('com-state');

// 상태 창 - 게임 결과
const playerStateResultElement = playerStateElement.querySelector('.info--win-or-not')
const computerStateResultElement = computerStateElement.querySelector('.info--win-or-not')