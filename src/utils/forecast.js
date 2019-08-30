const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const urlForecast = 'https://api.darksky.net/forecast/35a23db65151cce4c4cf4798701e339d/' + latitude +',' + longitude;
    request({url: urlForecast, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to find signal!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ` It is currently  ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain.`
            )
        }
    });
};

module.exports = forecast;