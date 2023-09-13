const mongoose = require('mongoose');
const Deck = require('./Deck');
const { Schema } = mongoose;

const cardSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  inDeck: {
    type: Schema.Types.ObjectId,
    ref: Deck,
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
