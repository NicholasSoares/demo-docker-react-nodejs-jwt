'use strict';

const { users } = require('../models/usersModel');
const sequelize = require('../../config/databaseConfiguration');

/**
 * Find user with given email
 */
module.exports.findByEmail = async (emailData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.findOne({
                where: {
                    email: emailData
                }
            });

            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Find user with given id
 */
module.exports.findById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.findByPk(userId);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}