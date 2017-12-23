"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Constants", {
			id:{
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			key: {
				type: Sequelize.STRING
			},
			value: {
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
		return queryInterface.dropTable("Constants");
	}
};
