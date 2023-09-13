// Deck Model
const mongoose = require('mongoose');
const { Schema } = mongoose;
const deckSchema = new mongoose.Schema({
  deckName: {
    type: String,
    required: true,
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  },
],
  description: {
    type: String,
    default: '',
  },
  // Card: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
});

deckSchema.virtual('cardCount').get(function () {
  return this.flashcards.length;
});

// Ensure that the virtual property is included when converting to JSON
deckSchema.set('toJSON', { virtuals: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;


// const cardCount = myDeck.cardCount;
// console.log(`The deck "${myDeck.name}" contains ${cardCount} cards.`);

