'use strict';
module.exports = (sequelize, DataTypes) => {
  var Constant = sequelize.define('Constant', {
    key: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Constant;
};