const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      question: {
          type: Sequelize.TEXT,
          allowNull: true,
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: true,
      },

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Chat',
      tableName: 'chats',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db){
    db.Chat.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'}); 
  } 

};