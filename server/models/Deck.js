// Import the Mongoose library and required models.
const mongoose = require('mongoose');
const User = require('./User');
const Card = require('./Card');
const { Schema } = mongoose;

// Define the schema for a 'deck' document in the MongoDB collection.
const deckSchema = new Schema({
  // 'deckName' field representing the name of the deck.
  deckName: {
    type: String,
    required: true,
  },
  // 'description' field representing a description of the deck.
  description: {
    type: String,
    default: '',
    required: true,
  },
  // 'createdBy' field representing the user who created the deck.
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  // 'cards' field representing an array of cards associated with the deck.
  cards: [Card]
});

deckSchema.virtual('cardCount').get(function () {
  return this.cards.length;
});

// Ensure that the virtual property is included when converting to JSON
deckSchema.set('toJSON', { virtuals: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;

