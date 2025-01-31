// A class to represent a playing card. 
class Card { 
    constructor(rank, suit){
        this.rank = rank;
        this.suit = suit;
    }

    getName(){
        let name = "";
        switch(this.rank){
            case 10:
                name += "Jack";
                break;
            case 11:
                name += "Queen";
                break;
            case 12:
                name += "King";
                break;
            case 13:
                name += "Ace";
                break;
            default:
                name += this.rank + 1;
                break;
        }
        name += " of "
        switch(this.suit){
            case 1:
                name += "Clubs";
                break;
            case 2:
                name += "Diamonds";
                break;
            case 3:
                name += "Hearts";
                break;
            case 4:
                name += "Spades";
                break;
            default: 
                name += "suit " + this.suit;
                break;
        }
        return name;
    }
} 

class Deck 
{ 
    constructor(){
        this.deckOrder = [];
    }

    /* Create the deck of cards */ 
    create(numberOfSuits,  numberOfRanks){
        for(let i = 1; i <= numberOfRanks; i++){
            for(let j = 1; j <= numberOfSuits; j++){
                this.deckOrder.push(new Card(i, j));
            }
        }
    }; 

    /* Shuffle the deck */ 
    shuffle(){
        // Shuffle code from CoolAJ86's answer at https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        var currentIndex = this.deckOrder.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = this.deckOrder[currentIndex];
          this.deckOrder[currentIndex] = this.deckOrder[randomIndex];
          this.deckOrder[randomIndex] = temporaryValue;
        }
    }; 

    /* deal a card from the deck */ 
    deal(){
        return this.deckOrder.pop();
    }; 

    // Divide the cards into the deck into a given number of stacks of equal size
    splitIntoStacks(numberOfStacks){
        let stacks = [];
        for(let i = 0; i < numberOfStacks; i++){
            stacks.push(new Deck());
        }
        while(this.deckOrder.length >= numberOfStacks){
            for(let i = 0; i < numberOfStacks; i++){
                stacks[i].deckOrder.push(this.deal());
            }
        }
        return stacks;
    }
} 

// Code for prompting user input based on mpen's answer at https://stackoverflow.com/questions/18193953/waiting-for-user-to-enter-input-in-node-js
const readline = require('readline');

function waitForUserInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question('', ans => {
        rl.close();
        resolve(ans);
    }))
}

let userInputPrompts = false;

class War 
{ 
    async play(numberOfSuits, numberOfRanks, numberOfPlayers) 
    { 
        // Initialize the decks for each player
        let wholeDeck = new Deck();
        wholeDeck.create(numberOfSuits, numberOfRanks);
        wholeDeck.shuffle();
        let playerDecks = wholeDeck.splitIntoStacks(numberOfPlayers);
        let numberOfCardsInPlayerDecks = playerDecks[0].deckOrder.length * numberOfPlayers;
        if(numberOfCardsInPlayerDecks === 0){
            console.log("Insufficient cards to begin play");
            return;
        }
        let cardsOnTable = new Deck();

        // Play the game until a player has all the cards
        while(true){
            let cardsToCompare = [];
            let playersComparing = [];
            let emptyDecks = 0;
            for(let i = 0; i < numberOfPlayers; i++){
                // Check if the player has all the cards - if so, end the game and declare them the winner
                if(playerDecks[i].deckOrder.length === numberOfCardsInPlayerDecks){
                    console.log("Player", i + 1, "is the winner!");
                    return;
                }
                // Check if the player has run out of cards - if so, ignore them
                if(playerDecks[i].deckOrder.length === 0){
                    emptyDecks++;
                    if(emptyDecks === numberOfPlayers){
                        console.log("All decks are empty, the game is a draw");
                        return;
                    }
                    continue;
                }
                // Have the player reveal a card
                let revealedCard = playerDecks[i].deal();
                cardsOnTable.deckOrder.push(revealedCard);
                cardsToCompare.push(revealedCard);
                playersComparing.push(i);
                console.log("Player", i + 1, "reveals the", revealedCard.getName());
            }
            // Find out if there is a single highest card
            let maxCardRank = 0;
            let winningPlayer = -1;
            let singleWinner = false;
            for (let i = 0; i < cardsToCompare.length; i++){
                if(maxCardRank < cardsToCompare[i].rank){
                    maxCardRank = cardsToCompare[i].rank;
                }
            }
            for (let i = 0; i < cardsToCompare.length; i++){
                if(maxCardRank === cardsToCompare[i].rank){
                    if(winningPlayer === -1){
                        winningPlayer = playersComparing[i];
                        singleWinner = true;
                    } else {
                        singleWinner = false;
                    }
                }
            }
            // If so, give the cards on the table to the player who revealed that card, putting them on the bottom of the deck in a random order
            if(singleWinner){
                cardsOnTable.shuffle();
                while(cardsOnTable.deckOrder.length > 0){
                    playerDecks[winningPlayer].deckOrder.unshift(cardsOnTable.deal());
                }
                console.log("Player", winningPlayer + 1, "takes the cards on the table");
            }
            // If not, have the players set aside a card, then reveal another card until there is a single highest card
            else {
                for(let i = 0; i < numberOfPlayers; i++){
                    // Check if the player has run out of cards - if so, ignore them
                    if(playerDecks[i].deckOrder.length === 0){
                        continue;
                    }
                    let hiddenCard = playerDecks[i].deal();
                    cardsOnTable.deckOrder.push(hiddenCard);
                    console.log("Player", i + 1, "puts a card facedown on the table");
                }
            }
            if(userInputPrompts){
                await waitForUserInput();
            }
        }
    } 
} 

let game = new War();
let commandLineArguments = process.argv.slice(2);
if(commandLineArguments.includes('userinput')){
    userInputPrompts = true;
    commandLineArguments.splice(commandLineArguments.indexOf('userinput'), 1);
}
switch(commandLineArguments.length){
    case 0:
        game.play(4, 13, 2);
        break;
    case 1:
        game.play(Number(commandLineArguments[0]), 13, 2);
        break;
    case 2:
        game.play(Number(commandLineArguments[0]), Number(commandLineArguments[1]), 2);
        break;
    default:
        game.play(Number(commandLineArguments[0]), Number(commandLineArguments[1]), Number(commandLineArguments[2]));
        break;
}

let standardDeck = new Deck();
module.exports = {standardDeck};