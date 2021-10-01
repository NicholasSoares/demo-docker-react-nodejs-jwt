'use strict';

const jwt = require('jsonwebtoken');
const userTokensRepository = require('../../repositories/userTokensRepository');

/**
 * Verify if login form have all fields filled and valid
 */
module.exports = [
    async (req, res, next) => {
        try{
            const token = req.headers['x-access-token'];

            if (!token){
                return res.status(401).json(
                    { auth: false, message: 'No token provided.' }
                );
            }

            if(! await userTokensRepository.findByToken(token)){
                return res.status(403).json(
                    { auth: false, message: 'Invalid or expired token.' }
                );
            }

            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (err) {
                    return res.status(500).json(
                        { auth: false, message: 'Failed to authenticate token.' }
                    );
                }

                req.userId = decoded.id;
                return next();
            });

            return res.status(403).json(
                { auth: false, message: 'Invalid or expired token.' }
            );
        }
        catch (e){
            return next(e);
        }
    }
];