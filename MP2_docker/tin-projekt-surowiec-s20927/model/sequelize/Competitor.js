const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Competitor = sequelize.define('Competitor', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthdate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dighy: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  sailNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

module.exports = Competitor;