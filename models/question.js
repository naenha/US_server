const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      question: {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Question',
      tableName: 'questions',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};