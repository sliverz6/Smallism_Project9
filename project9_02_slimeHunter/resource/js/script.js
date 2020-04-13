const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WIN';
const RESULT_COMPUTER_WIN = 'COMPUTER_WIN';

let playerLife = 100;
let computerLife = 100;

const getPlayerChoice = (button) => {
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
    const WIN = 'WIN!';
    const LOSE = 'LOSE!';
    const DRAW = 'DRAW!';
    if (roundWinner === RESULT_PLAYER_WIN) {
        damageDisplayElement.textContent = WIN;
    } else if (roundWinner === RESULT_COMPUTER_WIN) {
        damageDisplayElement.textContent = LOSE;
    } else {
        damageDisplayElement.textContent = DRAW;
    }
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
    let damage = parseInt(Math.random() * 10 + 10);
    if (roundWinner === RESULT_PLAYER_WIN) {
        computerLife -= damage;
        computerLife < 0 ? computerLife = 0 : computerLife;
        computerLifeBarElement.style.width = `${computerLife}%`;
    } else if (roundWinner === RESULT_COMPUTER_WIN) {
        playerLife -= damage;
        playerLife < 0 ? playerLife = 0 : playerLife;
        playerLifeBarElement.style.width = `${playerLife}%`;
    } 
}

const checkGameIsOver = (pLife, cLife) => {
    if (pLife <= 0 && cLife > 0) {
        console.log(RESULT_COMPUTER_WIN);
    } else if (cLife <= 0 && pLife > 0) {
        console.log(RESULT_PLAYER_WIN);
    } else if (cLife <= 0 && pLife <= 0) {
        console.log(RESULT_DRAW);
    }
}

for (let button of rspButtonsElement) {
    button.addEventListener('click', () => {
        const playerChoice = getPlayerChoice(button);
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        showChoiceInPanel(playerChoice, computerChoice);
        showGameResultInPanel(winner);
        dealDamage(winner);
        checkGameIsOver(playerLife, computerLife);
        console.log(playerLife, computerLife)
    });
}