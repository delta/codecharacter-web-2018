'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Constants', [
      {
        key:"COMPILE_RATE_LIMIT",
        value:5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key:"WAIT_TIME_CHALLENGE",
        value:30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key:"MAX_QUEUED_COMPILATIONS",
        value:100,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
  }
};
