// Import the Mongoose library and destructure the 'Schema' object.
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a 'card' document in the MongoDB collection.
const cardSchema = new Schema({

   // 'term' field representing the term or question on the card.
  term: {
    type: String,
    default: "",
  },
    // 'definition' field representing the definition or answer on the card.
  definition: {
    type: String,
    default: "",
  },
});

// Export the 'cardSchema' to be used in defining a Mongoose model elsewhere in the application.
module.exports = cardSchema;
