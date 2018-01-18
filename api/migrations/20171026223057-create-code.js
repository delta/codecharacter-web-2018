"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Codes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
				references:{
					model: "Users",
					key:"id"
				}
			},
			source: {
				type: Sequelize.TEXT
			},
			dll1: {
				type: Sequelize.TEXT
			},
			dll2: {
				type: Sequelize.TEXT
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
		return queryInterface.dropTable("Codes");
	}
};
