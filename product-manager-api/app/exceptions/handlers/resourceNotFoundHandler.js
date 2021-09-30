'use strict';

const createError = require("http-errors");

/**
 * Setup a 404 response during the request executing cycle
 */
module.exports.resourceNotFoundHandler = (req, res, next) => {
    next(createError(404));
};