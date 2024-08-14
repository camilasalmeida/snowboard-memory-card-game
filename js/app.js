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
console.log(restartBtnEl);

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
    console.log('Init is here!');
    resetTimer();
    snow();
    shuffleCards();
    matchedCards = [];
cardsEl.forEach(card => card.classList.remove('flip'));
cardsEl.forEach(card => card.addEventListener('click', flipCard)); //putting back the event listener
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
    //console.log('flipCard is working');
    if (boardLocked) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        if (!hasTimerStarted) {    // Start timer on the first click
            startTimer();
            hasTimerStarted = true;
        }
        
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }}

function checkForMatch() {
    //console.log('check for match');
    if (firstCard.dataset.category === secondCard.dataset.category) {
        // yay its a match
    console.log('its a match');
    disableCards();
    matchedCards.push(firstCard, secondCard);
    render();
} else {
        //its not a match
        console.log('its not a match');
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


// **-------------------------------------------**

// start the timer function 
function startTimer() {
    resetTimer();   // Reset timer on game start
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
        clearInterval(timer);
        render();
        }
    }, 1000);  // Update every second
}

//update timer function
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    timerEl.textContent = `Timer left: ${minutesStr}:${secondsStr}`;
}

// reset timer function
function resetTimer() {
    clearInterval(timer);
    timeLeft = 240;
    updateTimer();
    hasTimerStarted = false; // Reset timerStarted flag
}

//add the render function
function render() {
    console.log('Matched cards');
    if (matchedCards.length === totalCards){
        resultDisplayEl.textContent = 'You did it!🎉 You got on the First Chair!🥇';
        clearInterval(timer);         // Stop the timer when the player wins
        disableUnmatchedCards();
    } else if (timeLeft <= 0) {
        // Time is up
        resultDisplayEl.textContent = `Oh noo!😱Time's up! It's ok, you can try it again!`;
        clearInterval(timer); // Stop the timer when time runs out
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
        if (!matchedCards.includes(card)) {  // Check if the card is not in the matchedCards array
            card.removeEventListener('click', flipCard); // Remove click event listeners only from unmatched cards
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
