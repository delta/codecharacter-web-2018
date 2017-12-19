'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Ais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dll1: {
        type: Sequelize.STRING
      },
      dll2: {
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
        queryInterface.addConstraint('Matches', ['ai_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Ais',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ais');
  }
};
