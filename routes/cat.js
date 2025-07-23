var express = require('express');
var router = express.Router();
const cors = require('cors');
const request = require('request');

// CORSを有効化
router.use(cors());

router.get('/', async (req, res) => {
  console.log('Cat API accessed at:', new Date());
  
  request('https://api.thecatapi.com/v1/images/search', function (error, response, body) {
    if (error) {
      console.error('Request error:', error);
      res.status(500).json({ error: 'Request failed' });
      return;
    }
    
    if (response.statusCode !== 200) {
      console.error('API returned status:', response.statusCode);
      res.status(response.statusCode).json({ error: 'API error' });
      return;
    }
    
    try {
      const data = JSON.parse(body);
      console.log('API response:', data);
      res.json(data);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      res.status(500).json({ error: 'Failed to parse response' });
    }
  });
});

module.exports = router;