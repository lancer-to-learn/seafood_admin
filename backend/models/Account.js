const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const twilio = require("twilio");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { refreshToken } = require("firebase-admin/app");

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("inactive", "active"),
    allowNull: false,
    defaultValue: "inactive",
  },
  role: {
    type: DataTypes.ENUM("individual", "business", "branch_admin", "admin"),
    allowNull: false,
  },
  otpCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, 
{
  tableName: "account",
  timestamps: true,
});

Account.beforeCreate(async (account, options) => {
  const existingUser = await Account.findOne({ 
    where: { username: account.username }
  });
  if (existingUser) {
    throw new Error("Username đã tồn tại.");
  }

  const existingEmail = await Account.findOne({ 
    where: { email: account.email }
  });

  if (existingEmail) {
    throw new Error("Email đã tồn tại.");
  }

  const existingPhone = await Account.findOne({ 
    where: { phone: account.phone }
  });
  if (existingPhone) {
    throw new Error("Số điện thoại đã tồn tại.");
  }
});

module.exports = Account;
