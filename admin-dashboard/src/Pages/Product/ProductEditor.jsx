// src/pages/ProductEditor.tsx

import React, { useState } from "react";
import "../styles/ProductEditor.css";

const ProductEditor = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    unit: "",
    pricePerUnit: 0,
    description: "",
    tags: "",
    minimumToSale: 0,
    wholeSalePrice: 0,
    quantityForRequest: 0,
    information: {
      colors: [],
      productSpecific: {},
      productInfoContent: [],
    },
    media: [],
  });

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="product-editor">
      <h2>Thông tin sản phẩm</h2>
      <div className="form-group">
        <label>Tên sản phẩm:</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Danh mục:</label>
        <input
          type="text"
          value={product.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Đơn vị tính:</label>
        <input
          type="text"
          value={product.unit}
          onChange={(e) => handleInputChange("unit", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Giá bán lẻ:</label>
        <input
          type="number"
          value={product.pricePerUnit}
          onChange={(e) => handleInputChange("pricePerUnit", parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label>Mô tả sản phẩm:</label>
        <textarea
          value={product.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></textarea>
      </div>

      <div className="form-section">
        <h3>Media</h3>
        <input type="file" multiple accept="image/*,video/*" />
      </div>

      <div className="form-section">
        <h3>Thông tin chi tiết</h3>
        <label>Màu sắc:</label>
        <input type="text" placeholder="Nhập các màu (vd: đỏ, đen, xanh đen)" />
        <label>Thông số kỹ thuật:</label>
        <textarea placeholder="Nhập thông tin kỹ thuật..." />
      </div>

      <div className="form-submit">
        <button>Lưu sản phẩm</button>
      </div>
    </div>
  );
};

export default ProductEditor;
