const p1DiceBtn = document.querySelector('.player-1__roll_dice-btn');
const p2DiceBtn = document.querySelector('.player-2__roll_dice-btn');

function rollDiceHandler() {
    const randomNumber = parseInt(Math.random() * 6) + 1;
    console.log(randomNumber);
}

p1DiceBtn.addEventListener('click', rollDiceHandler);
p2DiceBtn.addEventListener('click', rollDiceHandler);