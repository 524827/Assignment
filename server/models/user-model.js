const userSchema = require('./schema');
const bcrypt = require('bcrypt');

class User {

/**
 * @function getLoginDetails - function for get login details of users
 * @param {*} callback - callback function for return result or error
 */
  getLoginDetails(userCredentials, callback) {
    const users = new userSchema.users();
    const email = userCredentials.email;
    const password = userCredentials.password;
  userSchema.users.findOne({'email':email}, function (error, data) {
   if (error) {
     return callback(true, [], "Something went wrong",500);
   }
   else if(data === null) {
    return callback(true, [], "No User Found",412);
   } else {
     bcrypt.compare(password, data.password).then(async doMatch => {
       if (doMatch) {
        await users.generateAuthToken(data);
        return callback(false, data,"Login Successfull", 200);
       }
       return callback(true, [],"Password Not Match", 401);
     }).catch(err => {
      return callback(true, [],"Something went wrong", 500);
     });

    }
  });
 }

  /**
   * @function setLoginDetails - function for register new user in database
   * @param {*} userDetails - get user details from client
   * @param {*} callback - callback function
   */
  setLoginDetails(userDetails, callback) {

    userSchema.users.findOne({ 'email': userDetails.email }, (error, result) => {
      if (result) {
        return callback(true, null, 'email already exists',422);
      }
      bcrypt.hash(userDetails.password, 12).then(hashPassword => {
        const users = new userSchema.users({
          email: userDetails.email,
          password: hashPassword
        });
        users.save((err, result) => {
          if (err) {
            return callback(err, null, "Something went wrong",500);
          }
          return callback(null, result, "save details successfully",200);
        });
      });
    });
 }
}

module.exports = User;