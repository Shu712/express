const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('hello', {
    title: 'Hello Page',
    message: 'Welcome to Hello Express'
  });
});

module.exports = router;

