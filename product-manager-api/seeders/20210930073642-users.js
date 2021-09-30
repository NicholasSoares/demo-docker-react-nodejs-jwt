'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
      [
        {
          email: 'test@gmail.com',
          password: '$2a$10$M/oHvi.ZTODKxDOSGihP.OtS/IhCz0gd8p2PZeYr9wwAKkOyuJrkS',
        },
        {
          email: 'test2@gmail.com',
          password: '$2a$10$M/oHvi.ZTODKxDOSGihP.OtS/IhCz0gd8p2PZeYr9wwAKkOyuJrkS',
        }
      ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
