# User Stories for the Snowboard-Themed Memory Card Game:

 * ***As an user***, to ensure I’m in the right place, I want to open the landing page and see:

    * A group of 16 cards face down in the middle of the page, so I know the game is set up and ready for me to start.

    * The instructions and the name of the game, so I know how to play and what the game is called.

    * A timer set to 0 as I haven't started the game yet, so I can track my time once I begin.

    * A button to restart the game at any time, so I don't need to refresh the page and I can start over and over, as many times as I want.


* ***As an user***, I want to be able to click on any of the cards and:

    * Flip the card immediately upon clicking it, so I can see which image it shows.

    * Click on a second card and flip it immediately, just like the first card, so I can see what the second card's image is. 

    * Have both cards remain flipped so I can visually compare them and check if it's a match.


* ***As an user***, If It's a match, want to keep both matched cards flipped until the end of the game, so I know they are no longer clickable.

* ***As an user***, I want to visually see how much time is left while I’m playing the game, so I know if I’m doing well or not.
 
* ***As an user***, If I won the game, I want to be presented with a clear and greeting message indicating I have won the game.

* ***As an user***, If I lose, I want to be presented with a clear message indicating that I’ve lost and have the option to play another round to try to improve my results.

---


# Pseudocode:

1. Define any variables used to track the state of the game:
    * Flipped Cards
    * The match result
    * Cards left to click
    * The result message
    * Initial timer
    * Timer left
  
2. Define the required constants:

    * Cards Value
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

6. Check if the game is win/lose, render a win/lose message to the player
