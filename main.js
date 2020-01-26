// A class to represent a playing card. 
class Card { 
    constructor(rank, suit){
        this.rank = rank;
        this.suit = suit;
    }
} 

class Deck 
{ 
    deckorder = [];

    /* Create the deck of cards */ 
    create(numberOfSuits,  numberOfRanks){
        for(let i = 1; i <= numberOfRanks; i++){
            for(let j = 0; j < numberOfSuits; j++){
                this.deckorder.push(new Card(i, j));
            }
        }
    }; 

    /* Shuffle the deck */ 
    shuffle(){
        // Shuffle code from CoolAJ86's answer at https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        var currentIndex = deckorder.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = deckorder[currentIndex];
          deckorder[currentIndex] = deckorder[randomIndex];
          deckorder[randomIndex] = temporaryValue;
        }
    }; 

    /* deal a card from the deck */ 
    deal(){
        return this.deckorder.pop();
    }; 

    // Divide the cards into the deck into a given number of stacks of equal size
    splitIntoStacks(numberOfStacks){
        stacks = [];
        for(let i = 0; i < numberOfStacks; i++){
            stacks.push(new Deck());
        }
        while(this.deckorder.length >= numberOfStacks){
            for(let i = 0; i < numberOfStacks; i++){
                stacks[i].push(deal());
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
        let numberOfCardsInPlayerDecks = playerDecks[0].deckorder.length * numberOfPlayers;

        // Play the game until a player has all the cards
        while(true){
            let cardsOnTable = [];
            for(let i = 0; i < numberOfPlayers; i++){
                // Check if the player has all the cards - if so, end the game and declare them the winner
                if(playerDecks[i].deckorder.length === numberOfCardsInPlayerDecks){
                    console.log("Player ", i, " is the winner!");
                    return;
                }
                // Check if the player has run out of cards - if so, ignore them
                if(playerDecks[i].deckorder.length === 0){
                    continue;
                }
                // Have the player reveal a card
                cardsOnTable.push(playerDecks[i].deal());
            }
        }
    } 
} 
