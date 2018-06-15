'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'is_active', Sequelize.BOOLEAN, {
        first: true
    });
    queryInterface.addColumn('Users', 'activation_key', Sequelize.STRING, {
        first: true
    });
    queryInterface.addColumn('Users', 'activation_deadline', Sequelize.STRING, {
        first: true
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
