"use strict";
module.exports = (sequelize, DataTypes) => {
  let ExecuteQueue = sequelize.define("ExecuteQueue", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dll1: DataTypes.BLOB("long"),
    dll2: DataTypes.BLOB("long"),
    matchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    opponentId: DataTypes.INTEGER,
    isAi: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(/*models*/) {
        // associations can be defined here
      }
    }
  });
  return ExecuteQueue;
};
