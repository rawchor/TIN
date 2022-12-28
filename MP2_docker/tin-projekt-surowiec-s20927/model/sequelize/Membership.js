const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Membership = sequelize.define('Membership', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  dateFrom: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  dateTo: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  competitor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  club_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Membership;