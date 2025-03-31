const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const twilio = require("twilio");
const dotenv = require("dotenv");
const Account = require("./Account"); // Import the Account model

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const Branch = sequelize.define("Branch", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  longitude: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    unique: false,
  },
  latitude: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    unique: false,
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
    tableName: "branch",
    timestamps: true,
  });

// Define the association
Branch.belongsTo(Account, { 
  as: "managerData",
  foreignKey: {
    name: "manager",
    allowNull: true,
    onDelete: "SET NULL",
    references: {
      model: Account,
      key: "id"
    }
  } 
});

module.exports = Branch;
