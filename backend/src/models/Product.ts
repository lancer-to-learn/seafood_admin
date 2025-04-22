import {
  DataTypes,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../config/database";
import ProductMedia from "./ProductMedia";
import { ProductInfoVO } from "../vo/ProductInfoVo";

interface ProductAttributes {
  id: number;
  name: string;
  category: string;
  unit?: string;
  pricePerUnit: number;
  description?: string;
  minimumToSale?: number;
  wholeSalePrice?: number;
  quantityForRequest?: number;
  tags?: string;
  information?: object; // JSON kiểu object
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    | "id"
    | "unit"
    | "description"
    | "minimumToSale"
    | "wholeSalePrice"
    | "quantityForRequest"
    | "tags"
    | "information"
    | "createdAt"
    | "updatedAt"
  > {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public category!: string;
  public unit?: string;
  public pricePerUnit!: number;
  public description?: string;
  public minimumToSale?: number;
  public wholeSalePrice?: number;
  public quantityForRequest?: number;
  public tags?: string;
  public information?: object;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  // Associations
  public getMedia!: HasManyGetAssociationsMixin<ProductMedia>;
  public readonly media?: ProductMedia[];
}

Product.init(
  {
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
    information: {
      type: DataTypes.JSON,
      allowNull: true,
      get() {
        const raw = this.getDataValue("information");
        if (!raw) return null;
        return ProductInfoVO.fromJSON(raw);
      },
      set(value: ProductInfoVO | object) {
        if (value instanceof ProductInfoVO) {
          this.setDataValue("information", value.toJSON());
        } else {
          this.setDataValue("information", value);
        }
      },
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
    sequelize,
    tableName: "product",
    timestamps: true,
  }
);

// Associations
Product.hasMany(ProductMedia, {
  foreignKey: "product_id",
  as: "media",
});
ProductMedia.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

export default Product;
