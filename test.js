const main = require('./main.js');
const assert = require('assert');

it('Basic logic test', () => {
  assert.equal(true, true);
});

it('Deck size check', () => {
    main.standardDeck.create(4, 13);
    assert.equal(main.standardDeck.deckOrder.length, 52);
});