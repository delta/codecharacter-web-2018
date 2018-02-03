"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ExecuteQueues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dll1: {
        type: Sequelize.BLOB("long")
      },
      dll2: {
        type: Sequelize.BLOB("long")
      },
      matchId: Sequelize.INTEGER,
      userId: Sequelize.INTEGER,
      opponentId: Sequelize.INTEGER,
      isAi: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("ExecuteQueues");
  }
};
