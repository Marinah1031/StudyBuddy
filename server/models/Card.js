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
});

module.exports = cardSchema;
