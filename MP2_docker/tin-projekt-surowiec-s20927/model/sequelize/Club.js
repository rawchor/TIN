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
    validate: {
      notEmpty: {
          msg: "Field is required"
      },
      len: {
          args: [3, 60],
          msg: "Field should contain 3-60 characters"
      },
    }
  },
  county: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "Field is required"
      },
      len: {
          args: [3, 60],
          msg: "Field should contain 3-60 characters"
      },
    }
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: {
          msg: "Field is required"
      },
      len: {
          args: [3, 60],
          msg: "Field should contain 3-60 characters"
      },
    }
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: false,
    validate: {
      notEmpty: {
          msg: "Field is required"
      },
      len: {
          args: [3, 60],
          msg: "Field should contain 3-60 characters"
      },
    }
  }
});

module.exports = Club;