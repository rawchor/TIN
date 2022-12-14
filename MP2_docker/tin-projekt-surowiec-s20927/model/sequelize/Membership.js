const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Membership = sequelize.define('Membership', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  competitor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  club: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateFrom: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  dateTo: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  }
});

module.exports = Membership;