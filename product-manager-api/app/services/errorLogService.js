'use strict';

const winston = require('winston');
const settings = require('../../config/winstonConfiguration');
const winstonLogger = winston.createLogger(settings);
winstonLogger.emitErrs = false;
const ignoredStatus = [400, 404, 409, 403];

/**
 * Log app exception when needed
 */
module.exports.logError = ({status, message},{path}) =>{
    if(!ignoredStatus.includes(status)){
        winstonLogger.error(`${new Date()} | Status : ${status} | Menssage : ${message} | Route : ${path}`);
    }
}