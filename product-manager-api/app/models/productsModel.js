'use strict';

const Sequelize = require('sequelize');
const database = require('../../config/databaseConfiguration');

module.exports.products = database.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_perishable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    void_at: {
        type: Sequelize.DATE
    },
    manufactured_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
},
{
    timestamps: false
});