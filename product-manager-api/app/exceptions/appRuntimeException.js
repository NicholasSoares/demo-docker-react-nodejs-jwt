'use strict';

/**
 * Build new exception with given message
 */
module.exports.newRuntimeException = (msg) => {
    return new Error(msg);
}