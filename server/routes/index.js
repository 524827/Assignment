const express = require('express');
const router = express.Router();

/* GET home page. */
/*router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});*/

router.all('/*', function (req, res, next) {
  console.log('Intercepting requests ...');
  next();  // call next() here to move on to next middleware/router
});

module.exports = router;