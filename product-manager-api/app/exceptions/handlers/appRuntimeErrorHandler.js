'use strict';

const { logError } = require('../../services/errorLogService');

/**
 * Return debug message and error status for development only
 */
function debugReturn(err, res){
    res.status(err.status || 500);
    res.send({message : res.locals.message, error : res.locals.error});
}

/**
 * Check return to index on production error
 */
function prodReturn(err, res){
    res.sendStatus(err.status || 500);
}

/**
 * Check enviroment and return response according to it
 */
function resolveEnviromentAndReturn(err, req, res){
    (process.env.ENVIROMENT === 'dev')? debugReturn(err, res) : prodReturn(err, res);
}

/**
 * Format and log incoming application errors that are not treated
 */
module.exports.appRuntimeErrorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = err;
    resolveEnviromentAndReturn(err, req, res);
    logError(err,req);
};