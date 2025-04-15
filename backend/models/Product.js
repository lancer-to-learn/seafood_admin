const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const dotenv = require("dotenv");

dotenv.config();

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    pricePerUnit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    minimumToSale: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    wholeSalePrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    quantityForRequest: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    tags: {
        type: DataTypes.TEXT,
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
}, {
    tableName: "product",
    timestamps: true,
});

module.exports = Product;
