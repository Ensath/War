// A class to represent a playing card. 
class Card { 
    constructor(rank){
        // The suit is irrelevant to the gameplay, so we do not track that
        this.rank = rank;
    }
} 

class Deck 
{ 
    deckorder = [];

    /* Create the deck of cards */ 
    create(numberOfSuits,  numberOfRanks){
        for(let i = 1; i <= numberOfRanks; i++){
            for(let j = 0; j < numberOfSuits; j++){

            }
        }
    }; 

    /* Shuffle the deck */ 
    shuffle(); 

    /* deal a card from the deck */ 
    deal(); 
} 

class War 
{ 
    play(numberOfSuits, numberOfRanks, numberOfPlayers) 
    { 

    } 
} 
