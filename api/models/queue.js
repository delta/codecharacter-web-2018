'use strict';
module.exports = (sequelize, DataTypes) => {
  let Queue = sequelize.define('Queue', {
    match_id: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    priority: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Queue;
};