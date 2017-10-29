'use strict';
module.exports = (sequelize, DataTypes) => {
  var Code = sequelize.define('Code', {
    user_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    dll1: DataTypes.STRING,
    dll2: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Code;
};