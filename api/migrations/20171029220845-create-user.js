"use strict";
let Sequelize = require('sequelize');
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type:Sequelize.STRING
      },
      email: {
        type:Sequelize.STRING
      },
      pragyanId: {
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rating:{
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
      .then(()=>{
        queryInterface.addConstraint('Codes', ['user_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        });
        queryInterface.addConstraint('Matches', ['player_id1'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        });
        queryInterface.addConstraint('Matches', ['player_id2'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        });
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
