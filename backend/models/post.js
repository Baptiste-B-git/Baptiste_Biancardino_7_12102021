'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Message.hasMany(models.Comment, {
        foreignKey: 'messageId'
      })
    }
  };
  Message.init({
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};