const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
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

  userSchema.methods.isCorrectPassword = async function (password) {
    await bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;