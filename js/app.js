const totalCards = 16;

let hasFlippedCard = false;
let firstCard;
let secondCard;
let timer;
let timeLeft = 240;
let hasTimerStarted = false; 
let matchedCards = [];
let boardLocked = false;

const cardsEl = document.querySelectorAll('.memory-card');
const resultDisplayEl = document.querySelector('.result-display');
const timerEl = document.querySelector('.timer');
const restartBtnEl = document.querySelector('.restart');
const snowfallEl = document.getElementById('snowfall');
const button = document.querySelector("#button");
const icon = document.querySelector("#button > i");
const audio = document.querySelector("audio");


button.addEventListener("click", () => {
    if (audio.paused) {
        audio.volume = 0.2;
        audio.play();
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    } else {
        audio.pause();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    }
    button.classList.add("fade");
});


init();
function init() {
    resetTimer();
    snow();
    shuffleCards();
    matchedCards = [];
cardsEl.forEach(card => card.classList.remove('flip'));
cardsEl.forEach(card => card.addEventListener('click', flipCard));
resultDisplayEl.textContent = `Find all the matches!`;
hasTimerStarted = false;
matchedCards = [];
    firstCard = null;
    secondCard = null;
}

function shuffleCards() {
    const cardsArray = Array.from(cardsEl);
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i].style.order, cardsArray[j].style.order] = [j, i];
    }
}


function flipCard() {
    if (boardLocked) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        if (!hasTimerStarted) {    
            startTimer();
            hasTimerStarted = true;
        }
        
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }}

function checkForMatch() {
    if (firstCard.dataset.category === secondCard.dataset.category) {
    disableCards();
    matchedCards.push(firstCard, secondCard);
    render();
} else {
        unflipCards();
}}

function unflipCards() {
        boardLocked = true;
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoardState();
    }, 1000);
    }

    function resetBoardState() {
        [hasFlippedCard, boardLocked] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

function startTimer() {
    resetTimer();   
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
        clearInterval(timer);
        render();
        }
    }, 1000);  
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    timerEl.textContent = `Timer left: ${minutesStr}:${secondsStr}`;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 240;
    updateTimer();
    hasTimerStarted = false; 
}

function render() {
    if (matchedCards.length === totalCards){
        resultDisplayEl.textContent = 'You did it!🎉 You got on the First Chair!🥇';
        clearInterval(timer);         
        disableUnmatchedCards();
    } else if (timeLeft <= 0) {
        resultDisplayEl.textContent = `Oh noo!😱Time's up! It's ok, you can try it again!`;
        clearInterval(timer); 
        disableUnmatchedCards();
        
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoardState();
}

function disableUnmatchedCards() {
    cardsEl.forEach(card => {
        if (!matchedCards.includes(card)) {  
            card.removeEventListener('click', flipCard); 
        }
    });
}

function snow() {
    const numSnowflakes = 40;

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerText = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        snowflake.style.transform = `translateY(${Math.random() * 100}vh)`;
        snowflake.style.animationName = 'snowfall';
        snowflake.style.animationTimingFunction = 'linear';
        snowfallEl.appendChild(snowflake);
    }
}

cardsEl.forEach((card) => {
    card.addEventListener('click', flipCard);
});

restartBtnEl.addEventListener('click', init);

document.addEventListener('DOMContentLoaded', snow);
