"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.createTable("Ais", {
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
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("ais");
	}
};
