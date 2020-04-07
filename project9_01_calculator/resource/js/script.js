const previousResultEl = document.querySelector('.js---previous_result');
const currentResultEl = document.querySelector('.js---current_result');

const addBtn = document.querySelector('.js---add');
const subtractBtn = document.querySelector('.js---subtract');
const multiplyBtn = document.querySelector('.js---multiply');
const divisionBtn = document.querySelector('.js---division');
const resultBtn = document.querySelector('.js---result');
const remainderBtn = document.querySelector('.js---remainder');
const resetBtn = document.querySelector('.js---reset')

const num0 = document.querySelector('.js---number_0');
const num1 = document.querySelector('.js---number_1');
const num2 = document.querySelector('.js---number_2');
const num3 = document.querySelector('.js---number_3');
const num4 = document.querySelector('.js---number_4');
const num5 = document.querySelector('.js---number_5');
const num6 = document.querySelector('.js---number_6');
const num7 = document.querySelector('.js---number_7');
const num8 = document.querySelector('.js---number_8');
const num9 = document.querySelector('.js---number_9');

let numbers = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];
let defaultResult = 0;
let displayResult = '';
let operationType = '';
let calcDescription = '';
let prevResult = defaultResult;
let initialResult;


function writeCurrentResult(value) {
    currentResultEl.textContent = value;
}

function writePreviousResult(value) {
    previousResultEl.textContent = value;
}

function calcResult(operation, initialResult) {
    if (operation === 'ADD') {
        prevResult += parseInt(initialResult);
    } else if (operation === 'SUBTRACT') {
        prevResult -= parseInt(initialResult);
    } else {
        prevResult = parseInt(initialResult);
    }
    writeCurrentResult(prevResult);
    displayResult = '';
}

function writeLog(operation, prevResult) {
    let operator;
    if (operation === 'ADD') {
        operator = '+';
    } else if (operation === 'SUBTRACT') {
        operator = '-';
    } else if (operation === 'RESULT') {
        operator = '=';
    }
    calcDescription += `${prevResult} ${operator} `
    writePreviousResult(calcDescription);
}

writeCurrentResult(defaultResult);

for (let num = 0; num < numbers.length; num++) {
    numbers[num].addEventListener('click', function() {
        displayResult += num.toString();
        writeCurrentResult(displayResult);
        initialResult = displayResult;
    });
}

addBtn.addEventListener('click', function() {  
    calcResult(operationType, initialResult);
    operationType = 'ADD';
    writeLog(operationType, initialResult);
});

subtractBtn.addEventListener('click', function() {
    calcResult(operationType, initialResult);
    operationType = 'SUBTRACT';
    writeLog(operationType, initialResult);
});

resultBtn.addEventListener('click', function() {
    calcResult(operationType, initialResult);
    operationType = 'RESULT';
    writeLog(operationType, initialResult);
});

// 더하기, 빼기 버튼을 누르면
// 계산 함수를 실행
// 그리고 뒤에다 연산자 붙이기