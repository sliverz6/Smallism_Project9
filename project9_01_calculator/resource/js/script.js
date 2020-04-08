const previousResultEl = document.querySelector('.js---previous_result');
const currentResultEl = document.querySelector('.js---current_result');

const addBtn = document.querySelector('.js---add');
const subtractBtn = document.querySelector('.js---subtract');
const multiplyBtn = document.querySelector('.js---multiply');
const divisionBtn = document.querySelector('.js---division');
const resultBtn = document.querySelector('.js---result');
const remainderBtn = document.querySelector('.js---remainder');
const resetBtn = document.querySelector('.js---reset')
const dotBtn = document.querySelector('.js---number_dot');

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

const DEFAULT_NUMBER = 0;
const DEFAULT_ENTERED_NUMBER = '0';

let enteredNumber = DEFAULT_ENTERED_NUMBER;
let initialNumber = DEFAULT_NUMBER;
let calcLogEntries = [];
let resetCalcLog = false;
let resetBtnClicked = false;
let operatorBtnClicked = false;
let operatateType;

function writeEnteredNumber(value) {
    currentResultEl.textContent = value;
}

function writeCalcLog(value) {
    previousResultEl.textContent = value;
}

writeEnteredNumber(DEFAULT_ENTERED_NUMBER);

for (let number in numbers) {
    numbers[number].addEventListener('click', function(event) {
        event.preventDefault();

        if (resetBtnClicked) {
            reset();
        }

        if (resetCalcLog) {
            writeCalcLog();
            resetCalcLog = false;
        }

        if (enteredNumber === DEFAULT_ENTERED_NUMBER) {
            enteredNumber = '';
        } 
        enteredNumber += number;
        operatorBtnClicked = false;
        writeEnteredNumber(enteredNumber);
    });
}

function displayCalcLog(beforeResult) {
    let description = '';

    if (beforeResult) {
        description = `${beforeResult} `;
        description += `${  calcLogEntries[calcLogEntries.length - 2]['operator']} `
        description += ` ${ calcLogEntries[calcLogEntries.length - 1]['previousNumber']} `; 
        description += ` = `; 
        return description;
    }

    for (let log in calcLogEntries) {
        description += `${calcLogEntries[log].previousNumber} `;
        description += `${calcLogEntries[log].operator} `;
    }
    return description;
}

function updateCalcLog(previousNumber, operation) {
    calcLogEntries.pop();
    const calcLog = {
        previousNumber: previousNumber,
        operator: operation
    };
    calcLogEntries.push(calcLog);
}


function inputToCalcLog(previousNumber, operator) {
    const calcLog = {
        previousNumber: previousNumber,
        operator: operator
    };
    calcLogEntries.push(calcLog);
}

function calculateValue(previousResult) {
    let result = DEFAULT_NUMBER;
    let operationType = '';

    if (previousResult) {
        if (calcLogEntries[calcLogEntries.length - 2]['operator'] === '+') {
            previousResult += parseInt(calcLogEntries[calcLogEntries.length - 1]['previousNumber']);
        } else if (calcLogEntries[calcLogEntries.length - 2]['operator'] === '-') {
            previousResult -= parseInt(calcLogEntries[calcLogEntries.length - 1]['previousNumber']);
        } else if (calcLogEntries[calcLogEntries.length - 2]['operator'] === '*') {
            previousResult *= parseInt(calcLogEntries[calcLogEntries.length - 1]['previousNumber']);
        } else if (calcLogEntries[calcLogEntries.length - 2]['operator'] === '/') {
            previousResult /= parseInt(calcLogEntries[calcLogEntries.length - 1]['previousNumber']);
        } else if (calcLogEntries[calcLogEntries.length - 2]['operator'] === '%') {
            previousResult %= parseInt(calcLogEntries[calcLogEntries.length - 1]['previousNumber']);
        }
        return previousResult;
    }

    for (let log in calcLogEntries) { 
        if (operationType === '+') {
            result += parseInt(calcLogEntries[log].previousNumber);
        } else if (operationType === '-') {
            result -= parseInt(calcLogEntries[log].previousNumber);
        } else if (operationType === '*') {
            result *= parseInt(calcLogEntries[log].previousNumber);
        } else if (operationType === '/') {
            result /= parseInt(calcLogEntries[log].previousNumber);
        } else if (operationType === '%') {
            result %= parseInt(calcLogEntries[log].previousNumber);
        } else if (!operationType){
            result += parseInt(calcLogEntries[log].previousNumber);
        } 

        if (calcLogEntries[log].operator === '+') {
            operationType = '+';
        } else if (calcLogEntries[log].operator === '-') {
            operationType = '-';
        } else if (calcLogEntries[log].operator === '*') {
            operationType = '*';
        } else if (calcLogEntries[log].operator === '/') {
            operationType = '/';
        } else if (calcLogEntries[log].operator === '%') {
            operationType = '%';
        }
    }
    return result;
}

function reset() {
    calcLogEntries = [];
    resetCalcLog = true;
    enteredNumber = '0';
    writeCalcLog();
    writeEnteredNumber(enteredNumber);
}

function calulateProcess(operator) {
    if (operatorBtnClicked) {
        updateCalcLog(initialNumber, operator);
        const calcDescription = displayCalcLog();
        writeCalcLog(calcDescription);
        return;
    }
    operatorBtnClicked = true;
    const operation = operator;
    inputToCalcLog(enteredNumber, operation);
    const calcDescription = displayCalcLog();
    enteredNumber = DEFAULT_ENTERED_NUMBER;
    writeCalcLog(calcDescription);
    const calculrateResult = calculateValue();
    writeEnteredNumber(calculrateResult);
    resetBtnClicked = false;
    initialNumber = calculrateResult;
}

addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    calulateProcess('+');
});
subtractBtn.addEventListener('click', function(event) {
    event.preventDefault();
    calulateProcess('-')
});
multiplyBtn.addEventListener('click', function(event) {
    event.preventDefault();
    calulateProcess('*')
});
divisionBtn.addEventListener('click', function(event) {
    event.preventDefault();
    calulateProcess('/')
});
remainderBtn.addEventListener('click', function(event) {
    event.preventDefault();
    calulateProcess('%')
});
resultBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let calcDescription;
    let calculrateResult;
    if (resetBtnClicked) {
        calculrateResult = calculateValue(initialNumber);
        writeEnteredNumber(calculrateResult);
        calcDescription = displayCalcLog(initialNumber);
        writeCalcLog(calcDescription);
    } else {
        const operation = '=';
        inputToCalcLog(enteredNumber, operation);
        let calcDescription = displayCalcLog();
        enteredNumber = DEFAULT_ENTERED_NUMBER;
        writeCalcLog(calcDescription);
        calculrateResult = calculateValue();
        writeEnteredNumber(calculrateResult);
    }

    initialNumber = calculrateResult;
    resetBtnClicked = true;
});
resetBtn.addEventListener('click', function(event) {
    event.preventDefault();
    reset();
});

dotBtn.addEventListener('click', function() {
    event.preventDefault();
});