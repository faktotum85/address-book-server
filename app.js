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

// handle routes
app.use('/api', routes);

module.exports = app;
