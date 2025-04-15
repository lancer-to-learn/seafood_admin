const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Product = require("./Product");

const ProductMedia = sequelize.define("ProductMedia", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "id"
        },
        onDelete: "CASCADE",
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("image", "video", "3d"),
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isThumbnail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    tableName: "product_media",
    timestamps: true,
});

// Quan hệ một-nhiều
Product.hasMany(ProductMedia, { foreignKey: "product_id", as: "media" });
ProductMedia.belongsTo(Product, { foreignKey: "product_id", as: "product" });

module.exports = ProductMedia;
