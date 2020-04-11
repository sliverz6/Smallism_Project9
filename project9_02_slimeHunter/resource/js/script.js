
const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WIN';
const RESULT_COMPUTER_WIN = 'COMPUTER_WIN';

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
    const WIN = 'WIN';
    const LOSE = 'LOSE';
    const DRAW = 'DRAW';
    if (roundWinner === RESULT_PLAYER_WIN) {
        playerStateResultElement.textContent = WIN;
        computerStateResultElement.textContent = LOSE;
    } else if (roundWinner === RESULT_COMPUTER_WIN) {
        playerStateResultElement.textContent = LOSE;
        computerStateResultElement.textContent = WIN;
    } else {
        playerStateResultElement.textContent = DRAW;
        computerStateResultElement.textContent = DRAW;
    }
};

rockButtonElement.addEventListener('click', () => {
    const playerChoice = ROCK;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showGameResultInPanel(winner);
    console.log(winner);
});

scissorsButtonElement.addEventListener('click', () => {
    const playerChoice = SCISSORS;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showGameResultInPanel(winner);
    console.log(winner);
});

paperButtonElement.addEventListener('click', () => {
    const playerChoice = PAPER;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showGameResultInPanel(winner);
    console.log(winner);
});