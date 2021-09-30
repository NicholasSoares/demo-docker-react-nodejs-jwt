'use strict';

const axios = require('axios');

/**
 * Send captcha and client info to captcha api service and return if it is valid or not
 */
module.exports.checkCaptchaData = (captchaData, remoteAddress) => {
    return new Promise(async (resolve, reject) => {
        try{
            let captchaKey = process.env.CAPTCHA_V2_KEY_PRIVATE;
            let verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${captchaKey}&response=${captchaData}&remoteip=${remoteAddress}`;
            let response = await axios.post(verifyUrl);
            let isValid = (response.data.success !== undefined && response.data.success);
            resolve(isValid);
        }
        catch ($e){
            reject($e);
        }
    });
}