'use strict';

/**
 * Build new exception with http code and given message
 */
module.exports.newHTTPRuntimeException = (msg, statusCode) => {
      let err = new Error(msg);
      err.status = statusCode;
      return err;
    }