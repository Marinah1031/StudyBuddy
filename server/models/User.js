// Import the Mongoose library and other dependencies.
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Define the schema for a 'user' document in the MongoDB collection.
const userSchema = new Schema({
  // 'username' field representing the user's username.
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // 'email' field representing the user's email address.
  email: {
    type :String ,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
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