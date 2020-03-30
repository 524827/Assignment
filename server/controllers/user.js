const User = require('../models/user-model');
const sendResponse = require('../response/send-response');

const userDetails = new User();

/**
 * @function getLoginDetails - function for get user login details
 */
exports.getUserDetails = (req, res, next) => {
   const userCredentials = {
    email: req.query.email,
    password: req.query.password
  };
  console.log(userCredentials);
   userDetails.getLoginDetails(userCredentials, (error, response, message, code) => {
    if (error) {
      sendResponse(res, [], message, true, code);
    }
    else {
      sendResponse(res, response, message, false, code);
    }
  });
};

/**
 * @function setLoginDetails - function for register user details
 */
exports.setUserDetails = (req, res, next) => {
  const userCredentials = {
    email: req.body.username,
    password: req.body.password
  };
  userDetails.setLoginDetails(userCredentials, (error,response,message,code) => {
    if (error) {
      sendResponse(res, [],message , true, code);
    }
    else {
      sendResponse(res, response, message, false,code);
    }
  });
};

/**
 * @function logoutUser - function for logout user from devices
 */
exports.logoutUser = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    sendResponse(res, [], 'Logout Successful', false, 200);
  }
  catch (e) {
    sendResponse(res, [], 'Logout Failed', true,500);
  }
};