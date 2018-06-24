const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const passport = require('passport');
const passportConfig = require('./config/passport');

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize passport
app.use(passport.initialize());
passportConfig();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://sw-address-book.herokuapp.com');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// handle routes
app.use('/api', routes);

module.exports = app;
