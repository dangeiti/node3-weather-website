const path = require('path');// no need to install it because it is a core node module ,can be found in doc nodejs
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');//app.js is the starting point

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);//going to look for a match for public folder when you do your req

//Setup static directory to  serve
app.use(express.static(publicDirectoryPath));//configures express directory.going to find index.html,going to match root url public

app.get('', (req, res) => {//leave string empty for homepage
    res.render('index', {
        title: 'Weather',
        name: 'Dan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Danny Boy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help',
        name: 'Geiti'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });

})



app.get('/products', (req, res) => {
if(!req.query.search) {
    return res.send({ //sends json.by using return,we are stopping the whole func execution.no search term,code below wont run
        error: 'You must provide a search term'
    });
}
    console.log(req.query.search);//this is an object
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Anthony',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {//*means match anything that wasnt matched so far,this must be put on the end
    res.render('404', {
        title: '404',
        name: 'Gibran',
        errorMessage: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})



//app.com
//app.com/help
//app.com/about
