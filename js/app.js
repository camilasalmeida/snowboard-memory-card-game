/*-------------------------------- Constants --------------------------------*/
const cards = [];
const matchedCards = [];

/*-------------------------------- Variables --------------------------------*/
let flippedCard1 = [];
let flippedCard2 = [];
let timerInit = 0;
let timerLeft = 240; // 4 minutes in second

let msg;

/*------------------------ Cached Element References ------------------------*/

const cardsElement = document.querySelectorAll('.cards');
const restartBtn = document.querySelector('#restart');
const resultDisplayEl = document.querySelector('#result-display');
// console.log({
//     cardsElement,
//     restartBtn,
//     resultDisplayEl,
// })

/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log('Starting the game');
}
init();
//timer has to be set to 0, setTimerInit()
//shuffle()
//All cards must be face down


function shuffleCards() {
    console.log('Shuffle the cards!')
}
shuffleCards();


function setTimerInit() {
    console.log('Set the timer!');
}
setTimerInit();


function flippedCard(event) {
console.log(event.target);
} 
// break, 
// matchedCards.push(__);
// add or create an element to the card flipped. ???


function checkMatch() {
    console.log('Is it a match?');
}
checkMatch();

function reset() {
    console.log('Reset the game!');
}
reset();


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
