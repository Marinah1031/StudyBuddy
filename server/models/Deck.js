const mongoose = require('mongoose');
const User = require('./User');
const Card = require('./Card');
const { Schema } = mongoose;


const deckSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  cards: [Card]
});

deckSchema.virtual('cardCount').get(function () {
  return this.cards.length;
});

// Ensure that the virtual property is included when converting to JSON
deckSchema.set('toJSON', { virtuals: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;

