const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type :String ,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  decks: [{
    type: Schema.Types.ObjectId,
    ref: 'Deck',
    },
    ],
  });

const User = mongoose.model('User', userSchema);

module.exports = User;