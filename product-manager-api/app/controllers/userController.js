'use strict';

const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const userTokensRepository = require('../repositories/userTokensRepository');

/**
 * return new JWT token
 */
function generateNewToken(userId){
    return jwt.sign({ userId }, process.env.SECRET);
}

/**
 * Authenticate and return JWT token
 */
module.exports.getToken = async (req,res,next) => {
    try{
        let userId = req.userId;
        let accessData = await userTokensRepository.createToken(userId, generateNewToken(userId))
        return res.json({ auth: true, token : accessData.token });
    }
    catch(e){
        next(e);
    }
}

/**
 * End user session and remove token
 */
module.exports.removeToken = async (req,res,next) => {
    try{
        const token = req.headers['x-access-token'];
        await userTokensRepository.removeTokenByCode(token)
        return res.json({ auth: false, token: null });
    }
    catch(e){
        next(e);
    }
}
