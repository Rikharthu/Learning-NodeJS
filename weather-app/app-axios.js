const yargs = require('yargs')
// Here we use 'axios' package, since it adds support promises out of the box
const axios = require('axios')

const apiKey = 'AIzaSyDTTIWck94AMw9pvCta_U-ThGEUXWlM2PI';
const darkSkyApiKey = '53536b204bd8824a4c157697e0c24d7c';

// `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var toCelsius = (f) => {
    return Number((f - 32) * (5 / 9)).toFixed(2)
}

var encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`

axios.get(geocodeUrl)
    .then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
            // won't go any further
        }
        var address = response.data.results[0].formatted_address
        var location = response.data.results[0].geometry.location
        console.log(JSON.stringify(address));
        return axios.get(`https://api.darksky.net/forecast/${darkSkyApiKey}/${location.lat},${location.lng}`)
    })
    .then(response => {
        var currently = response.data.currently;
        console.log(`It's currently ${toCelsius(currently.temperature)}°C. It feels like ${toCelsius(currently.apparentTemperature)}°C.`);
    })
    .catch(e => {
        if (e.code === 'ENOTFOUND') {
            console.error(`Unable to connect to API servers.`)
        } else {
            console.error(e.message);
        }
    });

/*
geocode.geocodeAddressPromise(argv.address)
    .then(location => {
        console.log(`Address: ${location.address}`)
        return weather.getWeatherPromise(location.latitude, location.longitude)
    })
    .then(weather => {
        console.log(`It's currently ${toCelsius(weather.temperature)}°C. It feels like ${toCelsius(weather.apparentTemperature)}°C.`);
    })
    .catch(console.error);
*/