/**
 * Setup env loading with priority
 */
require('dotenv').config();

/**
 * Load base application dependencies
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require("helmet");
const compression = require('compression');
const bodyParser = require('body-parser');
const {routerConfiguration} = require('./config/routerConfiguration');
const {resourceNotFoundHandler} = require('./app/exceptions/handlers/resourceNotFoundHandler');
const {appRuntimeErrorHandler} = require('./app/exceptions/handlers/appRuntimeErrorHandler');
const {staticFilesPathConfiguration} = require('./config/staticFilesPathConfiguration');

/**
 * Setup express configuration for the application
 */
const app = express();

/**
 * Setup request data info log on terminal (dev only)
 */
if (process.env.ENVIROMENT === 'dev'){
  app.use(logger('dev'));
}

/**
 * Setup request body related stuff
 */
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(compression());
app.use(cookieParser());

/**
 * Setup helmet policies for app security
 */
app.use(helmet({
  contentSecurityPolicy: false,
}));

/**
 * Setup base view engine to be used in the application
 */
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

/**
 * Setup static files paths and resolution methods
 */
staticFilesPathConfiguration(app);

/**
 * Setup base application request router
 */
routerConfiguration(app);

/**
 * Treat application errors that are not caught during execution
 */
app.use(resourceNotFoundHandler);
app.use(appRuntimeErrorHandler);

module.exports = app;