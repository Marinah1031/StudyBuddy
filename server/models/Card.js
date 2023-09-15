const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  term: {
    type: String,
    default: "",
  },
  definition: {
    type: String,
    default: "",
  },
});

module.exports = cardSchema;
