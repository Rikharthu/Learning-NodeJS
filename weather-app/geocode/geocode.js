const request = require('request')

const apiKey = 'AIzaSyDTTIWck94AMw9pvCta_U-ThGEUXWlM2PI';

/**
 * Geocodes the address at Google servers.
 * @param {*} address 
 * @param {*} callback 
 */
var geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
        /*
        Adds header:
        "headers": {
          "accept": "application/json"
        }
        */
    }, (error, response, body) => {
        if (error) {
            // error object exists, network request failed
            callback('Unable to connect to Google servers.')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.')
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

// wrap request inside a Promise
var geocodeAddressPromise = (address) => {
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

module.exports = {
    geocodeAddress,
    geocodeAddressPromise
}