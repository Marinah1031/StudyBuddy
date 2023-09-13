const mongoose = require('mongoose');
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
  // deckName: {
  //   type: String,
  //   required: true,
  // },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
