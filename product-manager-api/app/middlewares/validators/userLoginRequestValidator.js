'use strict';

const { body, validationResult } = require('express-validator');
const { compare } = require('../../../utils/passwordHelper');
const userRepository = require('../../repositories/userRepository');

/**
 * Verify if login form have all fields filled and valid
 */
module.exports = [
    body('email').isEmail().trim(),
    body('password').not().isEmpty().isLength({ min: 5 }),
    async (req, res, next) => {
        try{
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ errors: validationResult(req).array() });
            }

            /**
             * Check if user exists and get it's data
             */
            let userData = await userRepository.findByEmail(req.body.email);

            if(!userData){
                return res.status(400).json(
                    {
                        errors : [{
                            "msg": "Invalid value",
                            "param": "email",
                            "location": "body"
                        }]
                    }
                );
            }

            /**
             * Compare form user password with hash stored in database
             */
            if(await compare(req.body.password, userData.password)){
                req.userId = userData.id;
                return next();
            }

            /**
             * If password check fails return
             */
            return res.status(403).json(
                {
                    errors : [{
                        "msg": "Invalid value",
                        "param": "password",
                        "location": "body"
                    }]
                }
            );
        }
        catch (e){
            next(e);
        }
    }
];
