const Sequelize = require('sequelize');
const moment = require('moment');

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
      /*DateTime: {
        type: Sequelize.DATEONLY,
        get: function() {
           return moment(this.getDataValue('DateTime')).format('YYYYDDMM')
        }
      }*/
      
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
    db.Token.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'}); 
  } 

};