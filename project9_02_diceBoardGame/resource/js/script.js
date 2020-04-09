const p1DiceBtn = document.querySelector('.player-1__roll_dice-btn');
const p2DiceBtn = document.querySelector('.player-2__roll_dice-btn');
const diceValueDisplay = document.querySelector('.play_board__dice-value');


const PLAYER_1_TRUN = 1;
const PLAYER_2_TURN = 2;

let playerTurn = PLAYER_1_TRUN;

function displayRollDiceValue(value) {
    diceValueDisplay.textContent = value;
}

function rollDiceHandler() {
    const randomNumber = parseInt(Math.random() * 6) + 1;
    if (playerTurn === PLAYER_1_TRUN) {
        playerTurn = PLAYER_2_TURN;
    } else if (playerTurn === PLAYER_2_TURN) {
        playerTurn = PLAYER_1_TRUN;
    }
    displayRollDiceValue(randomNumber);
}

p1DiceBtn.addEventListener('click', () => {
    if (playerTurn === PLAYER_1_TRUN) {
        rollDiceHandler();
    }
});
p2DiceBtn.addEventListener('click', () => {
    if (playerTurn === PLAYER_2_TURN) {
        rollDiceHandler();
    }
});