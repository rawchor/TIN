const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Club = sequelize.define('Club', {
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
  county: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: false
  }
});

module.exports = Club;