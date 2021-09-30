'use strict';

const Sequelize = require("sequelize");

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      is_perishable: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      void_at: {
        type: Sequelize.DataTypes.DATE
      },
      manufactured_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('products');
  }
};

