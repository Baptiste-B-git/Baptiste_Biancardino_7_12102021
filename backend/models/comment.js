'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Comment.belongsTo(models.Message, {
        foreignKey: 'messageId'
      })
    }
  };
  Comment.init({
    UserId: DataTypes.INTEGER,
    messageId: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};