'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Users",
          key:"id"
        }
      },
      message: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('SUCCESS', 'ERROR', 'WARNING', 'INFORMATION')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isRead: {
        type: Sequelize.BOOLEAN
      },
      title: Sequelize.STRING
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Notifications");
  }
};
