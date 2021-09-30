'use strict';

const Sequelize = require('sequelize');
const database = require('../../config/databaseConfiguration');
const { users } = require('./usersModel');

module.exports.userTokens = database.define('userTokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    timestamps: false
});

users.hasMany(this.userTokens, { foreignKey: 'user_id' });
this.userTokens.belongsTo(users, {
    foreignKey: "user_id"
});