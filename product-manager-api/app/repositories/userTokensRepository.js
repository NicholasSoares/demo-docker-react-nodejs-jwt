'use strict';

const { userTokens } = require('../models/userTokensModel');
const sequelize = require('../../config/databaseConfiguration');

/**
 * Find token with given token code
 */
module.exports.findByToken = async (tokenCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await userTokens.findOne({
                where: {
                    token: tokenCode
                }
            });

            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Find user with given token id
 */
module.exports.findById = async (tokenId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await userTokens.findByPk(tokenId);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Find token with given user id
 */
module.exports.findByUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await userTokens.find({
                where: {
                    user_id: userId
                }
            });
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Set user JWT token for given user id
 */
module.exports.createToken = async (userId, tokenCode) => {
    return new Promise(async (resolve, reject) => {
        const transactionMethod = await sequelize.transaction();

        try {
            let result = await userTokens.create(
                {
                    user_id : userId,
                    token : tokenCode,
                },
                {
                    transaction: transactionMethod
                },
            );
            await transactionMethod.commit();
            resolve(result);
        } catch (e) {
            await transactionMethod.rollback();
            reject(e);
        }
    });
}

/**
 * remove JWT token from database
 */
module.exports.removeTokenByCode = async (tokenCode) => {
    return new Promise(async (resolve, reject) => {
        const transactionMethod = await sequelize.transaction();

        try {
            let result = await userTokens.destroy({
                where: {
                    token: tokenCode
                },
                transaction: transactionMethod
            });
            await transactionMethod.commit();
            resolve(result);
        } catch (e) {
            await transactionMethod.rollback();
            reject(e);
        }
    });
}