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

class War 
{ 
    play(numberOfSuits, numberOfRanks, numberOfPlayers) 
    { 
        // Initialize the decks for each player
        let wholeDeck = new Deck();
        wholeDeck.create(numberOfSuits, numberOfRanks);
        wholeDeck.shuffle();
        let playerDecks = wholeDeck.splitIntoStacks(numberOfPlayers);
        let numberOfCardsInPlayerDecks = playerDecks[0].deckOrder.length * numberOfPlayers;
        let cardsOnTable = new Deck();

        // Play the game until a player has all the cards
        while(true){
            let cardsToCompare = [];
            let playersComparing = [];
            for(let i = 0; i < numberOfPlayers; i++){
                // Check if the player has all the cards - if so, end the game and declare them the winner
                if(playerDecks[i].deckOrder.length === numberOfCardsInPlayerDecks){
                    console.log("Player", i, "is the winner!");
                    return;
                }
                // Check if the player has run out of cards - if so, ignore them
                if(playerDecks[i].deckOrder.length === 0){
                    continue;
                }
                // Have the player reveal a card
                let revealedCard = playerDecks[i].deal();
                cardsOnTable.deckOrder.push(revealedCard);
                cardsToCompare.push(revealedCard);
                playersComparing.push(i);
                console.log("Player", i, "reveals the", revealedCard.getName());
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
                console.log("Player", winningPlayer, "takes the cards on the table")
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
                }
            }
        }
    } 
} 

let game = new War();
game.play(4, 13, 2);

let standardDeck = new Deck();
module.exports = {standardDeck};