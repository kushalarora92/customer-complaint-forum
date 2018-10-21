const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    
    routes = require('./helper/routes'),
    db = require('./helper/db'),
    errorHandler = require('./helper/error-handler'),
    jwt = require('./helper/jwt')

    app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(jwt());

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
