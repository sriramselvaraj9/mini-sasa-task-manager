const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './task_management_db.sqlite',
  logging: false, // Set to console.log if you want SQL logs
});

module.exports = sequelize;
