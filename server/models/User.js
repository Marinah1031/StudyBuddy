const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const Deck = require("./Deck");
const { Schema } = mongoose;

const userSchema = new Schema({
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
  decks: [Deck.schema],
  });

  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  //   comparePassword method to check for a valid password entered by the user on login page
  userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;