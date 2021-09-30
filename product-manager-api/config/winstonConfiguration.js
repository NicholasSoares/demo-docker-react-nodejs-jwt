'use strict';

const winstonConfiguration = require('winston');
require('winston-daily-rotate-file');

/**
 * Build new winston file log configuration object
 */
const fileLog = new (winstonConfiguration.transports.DailyRotateFile)({
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

/**
 * Build new winston console log configuration object
 */
const consoleDebug = new winstonConfiguration.transports.Console();

/**
 * Exports configured log transport methods
 */
module.exports.transports = [consoleDebug, fileLog];