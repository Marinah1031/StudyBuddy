// Deck Model
const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  deckName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cards' }],
});

deckSchema.virtual('cardCount').get(function () {
  return this.flashcards.length;
});

// Ensure that the virtual property is included when converting to JSON
deckSchema.set('toJSON', { virtuals: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;


//const cardCount = myDeck.cardCount;
//console.log(`The deck "${myDeck.name}" contains ${cardCount} cards.`);

