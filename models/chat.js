const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      speaker: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
      
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Chat',
      tableName: 'chats',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db){
    db.Token.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'}); 
  } 

};