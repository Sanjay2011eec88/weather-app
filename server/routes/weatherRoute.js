var express = require('express');
var router = express.Router();
const weatherService = require('../service/weatherService');
const cityList = require('../config/cityConfig');

/* GET home page. */
router.get('/cityList', function(req, res, next) {
  res.send(cityList);
});

router.post('/', async function(req, res, next){
    const ws = new weatherService();
    const weatherData = await ws.getData(req.body.zipcode);
    return res.status(200).send(weatherData);
});

module.exports = router;
