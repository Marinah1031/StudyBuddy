const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
});
const User = mongoose.model('User', userSchema);

module.exports = User;