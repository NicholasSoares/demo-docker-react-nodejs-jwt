'use strict';

const Sequelize = require('sequelize');

/**
 * Setup sequelize database connection with enviroment entries and set general sequelize rules
 * to avoid common errors on insert
 */
const sequelize = new Sequelize({
    'username' : process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'dialect':  process.env.DB_CLIENT,
    'dialectOptions': {
        'charset': 'utf8mb4'
    },
    'logging': false,
    'omitNull': true
});

module.exports = sequelize;
