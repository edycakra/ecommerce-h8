'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
          {
            username: 'admin',
            email: 'admin@bricktiv8.com',
            password: '$2a$10$8mG9.92ysuO9HeHsQl/Gt.ZCqeUrbw30rd3wxbwQGzvBtgJSAsbi2',
            isAdmin: true
          }
        ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
    }
};
