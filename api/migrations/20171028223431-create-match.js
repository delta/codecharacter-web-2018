'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_id1: {
        type: Sequelize.INTEGER
      },
      player_id2: {
        type: Sequelize.INTEGER
      },
      ai_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then( () => {
        queryInterface.addConstraint('Queues', ['match_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Matches',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Matches');
  }
};
