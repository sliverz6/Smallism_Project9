const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WIN';
const RESULT_COMPUTER_WIN = 'COMPUTER_WIN';

const INTERVAL_TIME = 500;

let playerLife = 100;
let computerLife = 100;

let gameIsRunning = true;
let roundIsRunning = false;

const closeButtonPanel = (button) => {
    for (let button of rspButtonsElement) {
        button.classList.add('invisible');
    }
    button.classList.remove('invisible');
};

const getPlayerChoice = (button) => {
    roundIsRunning = true;
    if (button.id === "select__rock") {
        return ROCK;
    } else if (button.id === 'select__scissors') {
        return SCISSORS;
    } else if (button.id === 'select__paper') {
        return PAPER;
    }
};

const getComputerChoice = () => { 
    const randomNumber = Math.random();
    if (randomNumber < 0.34) {
        return ROCK;
    } else if (randomNumber < 0.67) {
        return SCISSORS;
    } else {
        return PAPER;
    }
};

const getWinner = (pChoice, cChoice) => {
    if (pChoice === cChoice) {
        return RESULT_DRAW;
    } else if (
        pChoice === ROCK && cChoice === SCISSORS ||
        pChoice === PAPER && cChoice === ROCK ||
        pChoice === SCISSORS && cChoice === PAPER
    ) {
        return RESULT_PLAYER_WIN;
    } else {
        return RESULT_COMPUTER_WIN;
    }
};

const showGameResultInPanel = (roundWinner) => {
    setTimeout(() => {
        const WIN = 'WIN!';
        const LOSE = 'LOSE!';
        const DRAW = 'DRAW!';
        if (roundWinner === RESULT_PLAYER_WIN) {
            damageDisplayElement.textContent = WIN;
            playerChoiceResultElement.id = 'win-denote';
        } else if (roundWinner === RESULT_COMPUTER_WIN) {
            damageDisplayElement.textContent = LOSE;
            computerChoiceResultElement.id = 'win-denote';
        } else {
            damageDisplayElement.textContent = DRAW;
        }
    }, INTERVAL_TIME);
};

const showChoiceInPanel = (pChoice, cChoice) => {
    const ROCK_ICON_CLASS_NAME = 'fas fa-hand-rock';
    const PAPER_ICON_CLASS_NAME = 'fas fa-hand-paper';
    const SCISSORS_ICON_CLASS_NAME = 'fas fa-hand-peace';

    pChoice === ROCK 
    ? playerChoiceResultElement.firstChild.className = ROCK_ICON_CLASS_NAME 
    : pChoice === PAPER 
    ? playerChoiceResultElement.firstChild.className = PAPER_ICON_CLASS_NAME 
    : playerChoiceResultElement.firstChild.className = SCISSORS_ICON_CLASS_NAME

    cChoice === ROCK
    ? computerChoiceResultElement.firstChild.className = ROCK_ICON_CLASS_NAME
    : cChoice === PAPER
    ? computerChoiceResultElement.firstChild.className = PAPER_ICON_CLASS_NAME
    : computerChoiceResultElement.firstChild.className = SCISSORS_ICON_CLASS_NAME
}

const dealDamage = (roundWinner) => {
    console.log(roundWinner);
        let damage = parseInt(Math.random() * 10 + 20);
        if (roundWinner === RESULT_PLAYER_WIN) {
            computerLife -= damage;
            computerLife < 0 ? computerLife = 0 : computerLife;
            setTimeout(() => {
                computerLifeBarElement.style.width = `${computerLife}%`;
            }, INTERVAL_TIME + 500);
            
        } else if (roundWinner === RESULT_COMPUTER_WIN) {
            playerLife -= damage;
            playerLife < 0 ? playerLife = 0 : playerLife;
            setTimeout(() => {
                playerLifeBarElement.style.width = `${playerLife}%`;
            }, INTERVAL_TIME + 500);
        } 
}

const checkGameIsOver = (pLife, cLife) => {
    setTimeout(() => {
        const resultMessage = gameEndPageElement.children[0];

        if (pLife <= 0 && cLife > 0) {
            resultMessage.textContent = '컴퓨터 승리!';
            gameEndPageElement.classList.add('visible');
            backdropElement.classList.add('visible');
            gameIsRunning = false;
        } else if (cLife <= 0 && pLife > 0) {
            resultMessage.textContent = `${userNameElement.textContent} 승리!`;
            gameEndPageElement.classList.add('visible');
            backdropElement.classList.add('visible');
            gameIsRunning = false;
        } else if (cLife <= 0 && pLife <= 0) {
            resultMessage.textContent = '무승부!';
            gameEndPageElement.classList.add('visible');
            backdropElement.classList.add('visible');
            gameIsRunning = false;
        }

    }, 2000);
}

const endRound = () => {
    setTimeout(() => {
        damageDisplayElement.textContent = '';
        playerChoiceResultElement.firstChild.className = '';
        computerChoiceResultElement.firstChild.className = '';
        playerChoiceResultElement.id = '';
        computerChoiceResultElement.id = '';
        roundIsRunning = false;
        for (let button of rspButtonsElement) {
            button.classList.remove('invisible');
        }
    }, INTERVAL_TIME + 1500);
};

const gameStart = () => {
    for (let button of rspButtonsElement) {
        button.addEventListener('click', () => {
            if (gameIsRunning && !roundIsRunning) {
                const playerChoice = getPlayerChoice(button);
                const computerChoice = getComputerChoice();
                const winner = getWinner(playerChoice, computerChoice);
                closeButtonPanel(button);
                showChoiceInPanel(playerChoice, computerChoice);
                showGameResultInPanel(winner);
                dealDamage(winner);
                endRound();
                console.log(playerLife, computerLife)
                checkGameIsOver(playerLife, computerLife);
            }
        });
    }
};

const gameStartBtnHandler = () => {
    if (userNameInput.value === '') {
        alert('이름을 입력하세요');
        return;
    }
    const titlePage = document.body.children[0];
    titlePage.classList.add('invisible');
    userNameElement.textContent = userNameInput.value;
    gameStart();
};  

const retryButtonHandler = () => {
    gameEndPageElement.classList.remove('visible');
    backdropElement.classList.remove('visible');
    
    playerLife = 100;
    computerLife = 100;

    computerLifeBarElement.style.width = `${computerLife}%`;
    playerLifeBarElement.style.width = `${playerLife}%`;

    gameIsRunning = true;
    roundIsRunning = false;
    gameStart();
};

gameStartButtonElement.addEventListener('click', gameStartBtnHandler);
retryButtonElement.addEventListener('click', retryButtonHandler);