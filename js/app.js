
let flippedCards = [];
let matchedCards = [];
let timeLeft = 0;
let timeLimit = 240; 
let timerInterval;
let timerStarted = false;

const cardsElement = document.querySelectorAll('.cards');
const restartBtn = document.querySelector('#restart');
const resultDisplayEl = document.querySelector('#result-display');
const boardElement = document.querySelector('.board');
const timerElement = document.querySelector('#timer');
const button = document.querySelector("#button");
const icon = document.querySelector("#button > i");
const audio = document.querySelector("audio");
const snowfall = document.getElementById('snowfall');


init();

function init() {
    snow();

    flippedCards = [];
    matchedCards = [];

    timeLeft = 0;
    timeLimit = 240;
    clearInterval(timerInterval); 

    timerStarted = false;

    cardsElement.forEach(card => {
        card.classList.remove('flipped');
        card.classList.remove('matched');
    });

    timerElement.textContent = 'Timer left: 04:00';
    shuffleCards()
    resultDisplayEl.textContent = "Find all the matches!";
}


function shuffleCards() {
    
    let cardsArray = Array.from(cardsElement);
    shuffleArray(cardsArray);
    cardsArray.forEach(card =>
    {
        boardElement.appendChild(card);
    });
}

function shuffleArray(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flippedCard(event) {
    const clickedCard = event.target.closest('.cards');

    if (!timerStarted) {
        setTimerInit();
        timerStarted = true;
    } if (flippedCards.length === 2 || clickedCard.classList.contains('flipped')) {
        return;
    }

    clickedCard.classList.add('flipped');

    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    const firstCategory = firstCard.getAttribute('category');
    const secondCategory = secondCard.getAttribute('category');

    if (firstCategory === secondCategory) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    }
    
    else {                                         
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    flippedCards = [];

    if (matchedCards.length === cardsElement.length) {
        clearInterval(timerInterval);
        resultDisplayEl.textContent = 'You did it!🎉 You got on the First Chair!🥇';
    }
}
init();


function setTimerInit() {
    timeLeft = timeLimit;
    updateDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
}


function updateTime() {
    timeLeft--;                             
    if (timeLeft <= 0) {
        clearInterval(timerInterval);     
        timeLeft = 0;
        resultDisplayEl.textContent = `Oh no!😲 Looks like you took a tumble in the snow.❄️`;
    }
    updateDisplay();
}


function updateDisplay() {
    
    const minutes = Math.floor(timeLeft / 60);   
    const seconds = timeLeft % 60;                
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    timerElement.textContent = `Timer left: ${minutesStr}:${secondsStr}`;
}


function snow() {

    const numSnowflakes = 42; 

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
        snowfall.appendChild(snowflake);
    }
};


cardsElement.forEach((card) => {
    card.addEventListener('click', flippedCard);
});

restartBtn.addEventListener('click', init);

snowfall.document.addEventListener('DOMContentLoaded', snow);

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
