/*-------------------------------- Constants --------------------------------*/
//const cards = [];

/*-------------------------------- Variables --------------------------------*/

let flippedCards = [];
let matchedCards = [];

let timeLeft = 0;
let timeLimit = 240; // 4 minutes in second
let timerInterval;

let timerStarted = false;

/*------------------------ Cached Element References ------------------------*/

const cardsElement = document.querySelectorAll('.cards');
const restartBtn = document.querySelector('#restart');
const resultDisplayEl = document.querySelector('#result-display');
const boardElement = document.querySelector('.board');
const timerElement = document.querySelector('#timer');
const categoryEl = document.querySelectorAll

//-----Added
const button = document.querySelector("#button");
const icon = document.querySelector("#button > i");
const audio = document.querySelector("audio");

/*-------------------------------- Functions --------------------------------*/
init();

function init() {
    console.log('init');
    timeLeft = timeLimit // timer has to be the opposite, cause we are counting down time, the time left.
    shuffleCards()
    resultDisplayEl.textContent = "Find all the matches!";
    cardsElement.forEach(card => card.classList.remove('flipped', 'matched')); 
}

//**------------------------SHUFFLE CARDS FUNCTIONS----------------------**
function shuffleCards() {
    let cardsArray = Array.from(cardsElement) // Convert NodeList to an array. Array.from(cardsElement) is used to convert cardsElement into an array, This method creates a new, shallow-copied Array instance from an array-like or iterable object. //Get the cards and put them into an array.
    //console.log(cardsArray);
    shuffleArray(cardsArray); 
    //console.log('Its working');
    cardsArray.forEach(card => {
    boardElement.appendChild(card);
    //console.log(boardElement);
})}
//console.log('Shuffle card is working', shuffleCards);

//  1. I put the queryselectorAll.cards into an Array.
//   2. We called the function shuffleArray to shuffle the cards we took from the queryselector, that we put into an array.lol 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { // Go through the array from the last element to the first element
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // // Swap the elements at index i and index j
    }}
//---------------------------------------------------------------------------**

//**------------------------FLIPPED CARD FUNCTION----------------------------**

function flippedCard(event){
    const clickedCard = event.target.closest('.cards');
    if (!timerStarted){
        console.log('000');
    }
    setTimerInit();
    timerStarted = true;

    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped')){
        console.log('exiting flippedCard. Conditions: ', flippedCards.length === 2, clickedCard.classList.contains('flipped'));
        return;
    }

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2){
        setTimeout(checkMatch, 1000);
    }
}
//---------------------------------------------------------------------------**


//**------------------------SETTING THE TIMER FUNCTIONS----------------------**

function setTimerInit() {
    timeLeft = timeLimit 
    updateDisplay()                                   // Show the starting time
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);   // Update the timer every second
}
//-----------------------------

// Function to update the timer each second
function updateTime() {
    timeLeft--;                             // 💡 reduce the time left by 1 second
    //console.log('Hey its working, timeLeft reduced by one second.');
    if (timeLeft <= 0) {
        clearInterval(timerInterval);      // If the timer reached 0, it will clear
        timeLeft = 0;
        resultDisplayEl.textContent = `You lose! Do you want to try again?,Timer left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }}

//----------------------------
function updateDisplay() {
     // Calculate the minutes and seconds from timeLeft
    const minutes = Math.floor(timeLeft / 60);   // Calculate minutes, this is a typeof Number
    //console.log(typeof minutes);               // number
    const seconds = timeLeft % 60;                // calculate seconds
    //console.log(typeof seconds);
    // Convert minutes and seconds to two-digit strings
    const minutesStr = String(minutes).padStart(2, '0'); // `String(minutes)` function converts this number into a string
    const secondsStr = String(seconds).padStart(2, '0'); //Pad the string to ensure it's at least 2 characters, now it's "05"
    //console.log(minutesStr, 'Converting into a string');
    //console.log(secondsStr, 'And padding the string to ensure its at least 2 characters.')
     // "5".padStart(2, '0') checks if the length of the string is less than 2. Since "5" has only 1 character, it adds a '0' at the beginning. The result is "05".
// or timerElement.textContent = `Timer left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Create the time display string
    const timerDisplay = 'Timer left: ' + minutesStr + ':' + secondsStr;
    //console.log('Testing', timerDisplay);

    // Update the text content of the timer element
    timerElement.textContent = timerDisplay; // 💡💡💡DOM
}
//**-------------------------------------------------------------------------------**

//**-----------------------------CHECKMATCH FUNCTION--------------------------------**
function checkMatch() {
    //console.log('Is it a match?');
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src)
    {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else
    {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    flippedCards = [];

    if (matchedCards.length === cardsElement.length)
    {
        clearInterval(timerInterval);
        resultDisplayEl.textContent = "Congratulations, you won the game! Do you want to start again?";
    }
}
//**-------------------------------------------------------------------------------**


function reset() {
    //console.log('Reset the game!');
}

/*----------------------------- Event Listeners -----------------------------*/

cardsElement.forEach((card) => {      //for each time someone clicks on any of the cards, the `flippedCard` function will be called.
    card.addEventListener('click', flippedCard);
}
);

restartBtn.addEventListener('click', reset);




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
