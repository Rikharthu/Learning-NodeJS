const request = require('request')

const apiKey = 'AIzaSyDTTIWck94AMw9pvCta_U-ThGEUXWlM2PI';

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                // error object exists, network request failed
                reject('Unable to connect to Google servers.')
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.')
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        })
    })
}

geocodeAddress('19146')
    .then((location) => {
        console.log(JSON.stringify(location))
    }, errorMessage => {
        console.error(errorMessage);
    })