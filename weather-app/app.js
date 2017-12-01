const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true    // make this argument always be interpreted as 'string'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var toCelsius = (f) => {
    return Number((f - 32) * (5 / 9)).toFixed(2)
}

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         // console.log(JSON.stringify(response, undefined, 2))
//         console.log(`Address: ${results.address}`)
//         weather.getWeather(results.latitude, results.longitude,
//             (error, weatherResults) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log(`It's currently ${toCelsius(weatherResults.temperature)}. It feels like ${toCelsius(weatherResults.apparentTemperature)}.`);
//                 }
//             });
//     }
// })

geocode.geocodeAddressPromise(argv.address)
    .then(location => {
        console.log(`Address: ${location.address}`)
        return weather.getWeatherPromise(location.latitude, location.longitude)
    })
    .then(weather => {
        console.log(`It's currently ${toCelsius(weather.temperature)}°C. It feels like ${toCelsius(weather.apparentTemperature)}°C.`);
    })
    .catch(console.error);