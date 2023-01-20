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
  surname: {
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
  email: {
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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: {
          msg: "Field is required"
      }
    }
  },
  dighy: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
    validate: {
      len: {
          args: [3, 60],
          msg: "Field should contain 3-60 characters"
      },
    }
  },
  sailNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
          args: [1, 6],
          msg: "Field should contain 1-6 numbers"
      },
    }
  }
});

module.exports = Competitor;