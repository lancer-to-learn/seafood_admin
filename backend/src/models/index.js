const { sequelize } = require("../config/database");
const Account = require("./Account");
const Branch = require("./Branch");
const Product = require("./Product");

module.exports = { sequelize, Account, Branch, Product };
