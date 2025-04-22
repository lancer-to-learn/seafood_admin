import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Định nghĩa các thuộc tính của ProductMedia
interface ProductMediaAttributes {
  id: number;
  product_id: number;
  type: "image" | "video" | "3d";
  url: string;
  isThumbnail?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Các thuộc tính optional khi tạo mới
interface ProductMediaCreationAttributes
  extends Optional<ProductMediaAttributes, "id" | "isThumbnail" | "createdAt" | "updatedAt"> {}

// Định nghĩa lớp model
class ProductMedia
  extends Model<ProductMediaAttributes, ProductMediaCreationAttributes>
  implements ProductMediaAttributes
{
  public id!: number;
  public product_id!: number;
  public type!: "image" | "video" | "3d";
  public url!: string;
  public isThumbnail?: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

// Khởi tạo model
ProductMedia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    tableName: "product_media",
    timestamps: true,
  }
);

export default ProductMedia;
