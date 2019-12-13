var OAuth = require('oauth');
const ZipCodeUtil = require('../utils/zipCodeUtils');
const yahooCred = require('../config/yahooConfig');

var header = {
    "X-Yahoo-App-Id": yahooCred.yahooCredentials.appId
};

class WeatherService{

    async getData(listOfZipCodes){
        var zipCodeLookupObj = new ZipCodeUtil(listOfZipCodes);
        let zipCodeArr =  zipCodeLookupObj.getCityAndState();
        let weatherData = [];
        for(let zipCodeDetails of zipCodeArr){
            let obj = {};
            obj[zipCodeDetails.zip] = await this.getWeatherForCity(zipCodeDetails);
            weatherData.push(obj)
        }
        return weatherData;
    }

    getWeatherForCity(cityDetails){
        return new Promise((resolve, reject) => {
            if('city' in cityDetails && 'state' in cityDetails){
                let request = new OAuth.OAuth(
                    null,
                    null,
                    'dj0yJmk9ZjF2VHljV0dMeTlvJmQ9WVdrOVpWVkhXR1JQTldjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTI2',
                    'db79559288b5a330749774f263c2ea044a651c79',
                    '1.0',
                    null,
                    'HMAC-SHA1',
                    null,
                    header
                );
                request.get(
                    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${cityDetails.city},${cityDetails.state}&format=json`,
                    null,
                    null,
                    function (err, data) {
                        if(err){
                            reject(err)
                        }
                        resolve(JSON.parse(data));
                    }
                );
            }
        })
    }
}

module.exports = WeatherService;

