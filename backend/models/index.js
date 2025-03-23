const { sequelize } = require("../config/database");
const Account = require("./Account");
const Branch = require("./Branch");

module.exports = { sequelize, Account, Branch };
