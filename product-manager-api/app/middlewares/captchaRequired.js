'use strict';

const { body, validationResult } = require('express-validator');
const { checkCaptchaData } = require('../../app/services/captchaService');

/**
 * Verify if captcha is filled and valid
 */
module.exports = [
    body('captcha').not().isEmpty(),
    async (req, res, next) => {
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({errors: validationResult(req).array()});
            }

            if (await checkCaptchaData(req.body.captcha, req.connection.remoteAddress)) {
                return next();
            }

            return res.status(400).json(
                {
                    errors: [{
                        "msg": "Invalid value",
                        "param": "captcha",
                        "location": "body"
                    }]
                }
            );
        } catch (e) {
            return next(e);
        }
    }
];