# The Game of War

Running this application will produce the game of war. To run, make sure Node.js is installed, then run the following command:

node main.js

You may additionally specify the number of suits, number of ranks, and number of players for the game as command line arguments. By default, the game will use 4 suits, 13 ranks, and 2 players. As an example, if you wanted to play a game with 2 suits, 12 ranks, and 3 players, you would use the following command:

node main.js 2 12 3

To run unit tests, make sure npm (Node package manager) and mocha (a JavaScript test framework) are installed, then run the following command:

npm test

The rules for the game are as follows:

Each player starts with half of a randomized deck of playing cards (typically a standard 52 card deck). Players reveal the top card of their decks. If one is of higher value, the player with that card takes both cards, putting them on the bottom of their deck in a random order. Aces are high. If the two cards are of the same value, both players place a card face down, then reveal another card from their decks. If a player has a higher card, they take all the cards on the table, otherwise the process repeats. The game ends when one player runs out of cards, with that player losing and the other player winning.

The above describes rules for a two player game. For more players, divide the deck evenly among the players to begin. Compare cards from all players when revealing from the deck. When two or more cards tie for highest, all players place a card face down, then reveal another card from their decks. The game ends when one player has all the cards, with losing players dropping out as play progresses. (Source: https://www.pagat.com/war/war.html)