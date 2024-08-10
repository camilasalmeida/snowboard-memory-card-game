/*-------------------------------- Variables --------------------------------*/

let flippedCards = [];
let matchedCards = [];

let timeLeft = 0;
let timeLimit = 240; // 4 minutes in seconds
let timerInterval;

let timerStarted = false;

/*------------------------ Cached Element References ------------------------*/

const cardsElement = document.querySelectorAll('.cards');
const restartBtn = document.querySelector('#restart');
const resultDisplayEl = document.querySelector('#result-display');
const boardElement = document.querySelector('.board');
const timerElement = document.querySelector('#timer');

//-----Added
const button = document.querySelector("#button");
const icon = document.querySelector("#button > i");
const audio = document.querySelector("audio");

/*-------------------------------- Functions --------------------------------*/

init();

function init() {

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

//**-------------------------SHUFFLE CARDS FUNCTIONS--------------------------**
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

//---------------------------------------------------------------------------**
//**------------------------FLIPPED CARD FUNCTION----------------------------**

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
//---------------------------------------------------------------------------**
//-------------------------CHECK MATCH FUNCTION------------------------------**

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    const firstCategory = firstCard.getAttribute('category');
    const secondCategory = secondCard.getAttribute('category');

    if (firstCategory === secondCategory) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    }
    
    else {                                         // if the cards don't match, flip them back
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    flippedCards = [];

    if (matchedCards.length === cardsElement.length) {
        clearInterval(timerInterval);
        resultDisplayEl.textContent = 'You did it!🎉 You got on the First Chair!🥇 You’ve conquered the slopes and earned your place on the lift.';
    }
}
init();

//**------------------------SETTING THE TIMER FUNCTIONS----------------------**

function setTimerInit() {
    timeLeft = timeLimit;
    updateDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
}

//-----------------------------

function updateTime() {
    timeLeft--;                             
    if (timeLeft <= 0) {
        clearInterval(timerInterval);     
        timeLeft = 0;
        resultDisplayEl.textContent = `Oh no!😲 Looks like you took a tumble in the snow.❄️`;
    }
    updateDisplay();
}
//----------------------------
function updateDisplay() {
    
    const minutes = Math.floor(timeLeft / 60);   
    const seconds = timeLeft % 60;                
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    timerElement.textContent = `Timer left: ${minutesStr}:${secondsStr}`;
}

/*----------------------------- Event Listeners ---------------------------*/

cardsElement.forEach((card) => {
    card.addEventListener('click', flippedCard);
});

restartBtn.addEventListener('click', init);


//*------added audio btn---*
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

//*-------added snowflake----*

document.addEventListener('DOMContentLoaded', () => {
    const snowfall = document.getElementById('snowfall');
    const numSnowflakes = 50; // Adjust the number of snowflakes as desired

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerText = '❄'; // Unicode snowflake character
        snowflake.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Random size
        snowflake.style.animationDuration = Math.random() * 5 + 5 + 's'; // Random fall speed
        snowflake.style.animationDelay = Math.random() * 10 + 's'; // Random start delay
        snowflake.style.transform = `translateY(${Math.random() * 100}vh)`; // Initial vertical position

        snowflake.style.animationName = 'snowfall';
        snowflake.style.animationTimingFunction = 'linear';

        snowfall.appendChild(snowflake);
    }
});


  


/*
STATE OF THE GAME: 💡💡💡
WHAT CHANGES DO WE NEED TO KEEP TRACK OF TO KNOW THE CURRENT STATE OF THE GAME?
1- the flipped cards
2- how many cards we still have left to click on
3- the timer 

*THINK ABOUT, WHAT AND HOW CHOICES ARE MADE DURING TYPICAL GAME PLAY?
1- choices are made by choosing 2 cards and checking if they're a match.
2- choices are made by memorizing the positions of the cards for future turns.
*/


/*
# Pseudocode for the Snowboard-Themed Memory Card Game:

1. Define any variables used to track the state of the game:
    * Flipped Cards
    * The match result
    * Cards left to click
    * The result message
    * Initial timer
    * Timer left
  
2. Define the required constants:
    * Board
    * Cards Value, will be an array of cards (images related to snowboarding, gear and etc)
    * Matched Cards

3. Initialize the game:
    * Create a board, generate card elements and append them to the board
    * Each card should have a front (with a generic snowboard icon) and back face (with specific snowboard, gear, images)
    * Add a snowfall effect to the game by selecting the snowfall element
    * Using the DOM, generate and animate snowflake elements

4.  Handle player actions:
     * When a player clicks on a card, add the card to `flippedCards`
     * If two cards are flipped, proceed to compare them
    * Update the DOM to reflect the flipped state of the cards (showing the snowboard-themed images)

5. Compare the flipped cards and check for a match

6. Check if the game is win/lose, render a win/lose message to the player.
*/

/*
# AS AN USER I WANT 💡💡💡...
* As a user, to ensure I’m in the right place, I want to open the landing page and see:
   1. All 16 cards face down inside in the middle of the page.
   2. The instructions and name of the game.
   3. The timer set to 0. 
   4. Snow falling.
   5. The button to restart.

  2 - As a user, I want to be able to click on any of the cards.
  3 - As a user, I want see the score updating as soon as I start the game by clicking the first button.
  4- As a user, I want to see the other side of that card as soon as I click on it, so I know which image it shows. 
  5- As I user, I want to keep the front of the card flipped, so I know which card will be the next one to match.
  6- As an user, I want to be able to click on the second card. (#card-num2)
  7- As an user, I want to keep the second card flipped so I know if it was a match.

  //----------------------------part 2
  // If it's a match:
  8- As a user, I want: if the cards match, I want to keep both cards face up so I know they are matched.
  9- As a user, I want to know that these matched cards are no longer clickable.

  // If its not a match:
  10- As an user, I want to have the cards automatically flip back over after 2 seconds if they do not match.
  11- As an user, I want to be able to try again and again.

//-------------------------------part 3
//If I win:
  12- As an user, I want to know that I have won the game after matching all cards on the board before the timer runs out.
  13- As an user, I want to see a message that I won the game, such as "Congratulations, you won the game! Do you want to start again?"
  14- As an user, I want to be able to press the restart button and start the game again if I want to.

//If not, If the timer runs out:
  15- As an user, I want to know that no more cards are clickable since the game is over.
  16- As an user, I want to see a message telling me "You lose! Do you want to try it again?".
  17- As an user I want, to be able to press the restart button and start the game again.


criterias:
1- I need to use the function render().
2- Set the timer to 4 minutes.
3- Set a total of 16 cards(8 of each type).
4- Use a snowboard, winter theme for styling. 
5- Dont forget to add the instructions.
6- Colors should follow the acessibility guidelines.
7- Don't forget to add Alternative text to the images.
*/
