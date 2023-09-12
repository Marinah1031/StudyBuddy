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

  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  //   comparePassword method to check for a valid password entered by the user on login page
  userSchema.methods.isCorrectPassword = async function (password) {
    await bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;