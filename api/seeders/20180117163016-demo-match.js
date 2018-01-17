'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Matches', [
        {
          player_id1: 1,
          player_id2: 2,
          status: 'compiling',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          player_id1: 2,
          player_id2: 1,
          status: 'compiling',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Matches', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
