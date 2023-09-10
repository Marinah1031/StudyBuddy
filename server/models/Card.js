const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  // deckName: {
  //   type: String,
  //   required: true,
  // },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // You can add more fields here, such as tags, timestamps, etc.
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
