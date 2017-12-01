const request = require('request')
const darkSkyApiKey = '53536b204bd8824a4c157697e0c24d7c'

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, body.currently);
        } else {
            callback('Unable to fetch weather.');
        }
    })
};

var getWeatherPromise = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body.currently);
            } else {
                reject('Unable to fetch weather.');
            }
        })
    })
}

module.exports.getWeather = getWeather
module.exports.getWeatherPromise = getWeatherPromise