const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
  request('https://yesno.wtf/api', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.json(data);  // JSON全体（answer, image）を返す
    }
  });
});

module.exports = router;
