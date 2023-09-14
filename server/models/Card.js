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
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
