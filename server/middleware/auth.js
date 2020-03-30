const jwt = require('jsonwebtoken');
const userSchema = require('../models/schema');
const sendResponse = require('../response/send-response');

/**
 * @function auth - middleware for handle authentication and verify jwt token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = async (req, res, next) => {
 try {
  const header = req.headers.authorization;
  const token = header.replace('Bearer', '');
  const decode = jwt.verify(token, 'thisistoken');
  const user = await userSchema.users.findOne({ '_id': decode._id, 'tokens.token': token });
  if (!user) {
   throw new Error();
  }
  req.token = token;
  req.user = user;
  next();
 } catch (e) {
  sendResponse(res, [], 'Authentication failed', true);
 }
};

module.exports = auth;


