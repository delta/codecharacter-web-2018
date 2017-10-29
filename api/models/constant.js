'use strict';
module.exports = (sequelize, DataTypes) => {
	let Constant = sequelize.define("Constant", {
		key: DataTypes.STRING,
		id:{
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    value: {
      type: Sequelize.STRING
    }
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Constant;
};
