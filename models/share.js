const Sequelize = require('sequelize');

module.exports = class Share extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      sending_user: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      getting_user: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      date: {
          type: Sequelize.STRING(30),
          allowNull: false,
      }

    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Share',
      tableName: 'shares',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  

};