const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

// schema for user
const userShcema = new Schema({
  email: String,
  password: String,
  tokens: [{
    token: {
      type: String
    },
  }],
  token: String
});

/**
 * @function generateAuthToken - function for generate jwt token when user login
 */
userShcema.methods.generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id }, 'thisistoken');
  user.tokens = user.tokens.concat({ token });
  user.token = token;
  await user.save();
  return token;
};

exports.users = mongoose.model('user', userShcema, 'users');


