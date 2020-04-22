const cardsEl = document.querySelectorAll('.card');
const startBtn = document.querySelector('.start-btn');
const clickCountEl = document.querySelector('.click-count span');
const clickTimerEl = document.querySelector('.timer span');

const cards = [];
let clickedCardList = [];
let clickCount = 0;
let clickTimer = 0;
let isCardClickedTwice = false;
let isGameRunning = false;
let timerId;

// 카드 콘텐츠 갯수는 카드 요소 갯수의 1/2개여야 한다
const cardsContent = ['사과', '포도', '딸기', '수박', '메론', '참외', '키위', '오렌지']; 

const generateAndPushCards = (contents) => {
    for (let i = 0; i < cardsEl.length / 2; i++) {
        const content = contents[i];
        const card = {
            id: Math.random(),
            name: content,
            isCorrect: false
        };
        // 두번씩 넣기
        cards.push(card);
        cards.push(card);
    }
};

const generateRandomNumber = () => {
    return parseInt(Math.random() * cards.length);
};

const pickingCard = (randomNumber) => {
    let pickedCard;
    pickedCard = cards.splice(randomNumber, 1)[0];
    return pickedCard;
};

const checkGameDone = () => {
    for (const cardEl of cardsEl) {
        if (cardEl.textContent === '') {
            return;
        } 
    }
    console.log('Great!');
    clearInterval(timerId);
    startBtn.textContent = 'RETRY?';
    startBtn.style.backgroundColor = 'salmon';
    isGameRunning = false;
};

const checkCorrect = () => {
    const firstClickedCard = clickedCardList[0];
    const secondClickedCard = clickedCardList[1];
    if (firstClickedCard.textContent === secondClickedCard.textContent) {
        isCardClickedTwice = false;
        checkGameDone();
    } else {
        setTimeout(() => {
            firstClickedCard.classList.remove('clicked');
            secondClickedCard.classList.remove('clicked');
            firstClickedCard.textContent = '';
            secondClickedCard.textContent = '';
            isCardClickedTwice = false;
        }, 500);
    }
    clickedCardList = [];
};

const cardClickHandler = (card, event) => {

    if (isCardClickedTwice) {
        return
    }

    const cardName = card.name
    const clickedCardEl = event.target;

    if (!(clickedCardEl.textContent === '')) {
        return
    }

    clickedCardEl.classList.toggle('clicked');
    if (clickedCardEl.textContent === '') {
        clickedCardEl.textContent = cardName;
    } else {
        clickedCardEl.textContent = '';
    }

    clickedCardList.push(clickedCardEl);

    if (clickedCardList.length === 2) {

        clickCount++;
        clickCountEl.textContent = clickCount;

        isCardClickedTwice = true;
        checkCorrect();
    } 


};

const renderingCards = () => {
    const cardList = [];
    for (const card of cardsEl) {
        const randomNumber = generateRandomNumber();
        const pickedCard = pickingCard(randomNumber);
        // card.textContent = pickedCard.name;
        card.addEventListener('click', cardClickHandler.bind(null, pickedCard));
        cardList.push(pickedCard);
    }
    return cardList;
};

const showCards = (cardList) => {
    for (let i = 0; i < cardList.length; i++) {
        cardsEl[i].classList.add('clicked');
        cardsEl[i].textContent = cardList[i].name;
    }

    setTimeout(() => {
        for (let i = 0; i < cardList.length; i++) {
            cardsEl[i].classList.remove('clicked');
            cardsEl[i].textContent = '';
        }

        timerId = setInterval(() => {
            clickTimer++;
            clickTimerEl.textContent = clickTimer;
        }, 1000);

    }, 2000);
};

const startBtnHandler = () => {
    startBtn.textContent = 'START';
    startBtn.style.backgroundColor = 'slateblue';
    if (isGameRunning) {
        return;
    }
    isGameRunning = true;
    generateAndPushCards(cardsContent);
    const cardList = renderingCards();
    showCards(cardList);
};

startBtn.addEventListener('click', startBtnHandler);
