'use strict';

const Sequelize = require('sequelize');
const database = require('../../config/databaseConfiguration');

module.exports.users = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false
});