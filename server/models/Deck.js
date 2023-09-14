const mongoose = require('mongoose');
const User = require('./User');
const { Schema } = mongoose;

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: "Card",
  }]
});

deckSchema.virtual('cardCount').get(function () {
  return this.cards.length;
});

// Ensure that the virtual property is included when converting to JSON
deckSchema.set('toJSON', { virtuals: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;


// const cardCount = myDeck.cardCount;
// console.log(`The deck "${myDeck.name}" contains ${cardCount} cards.`);

