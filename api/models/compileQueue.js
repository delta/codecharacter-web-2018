"use strict";
module.exports = (sequelize, DataTypes) => {
	let CompileQueue = sequelize.define("CompileQueue", {
		id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return CompileQueue;
};
