const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

router.get('/', function (req, res, next) {
 res.send("response send");
});

// router for login users
router.get('/login', userController.getUserDetails);

//router for logout
router.get('/logout',auth, userController.logoutUser);

// router for register new users
router.post('/register', userController.setUserDetails);

module.exports = router;