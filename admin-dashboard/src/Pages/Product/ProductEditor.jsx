import React, { useState } from "react";
import "./productEditor.css";
import PageTitle from "../../components/PageTitle/PageTitle";

function ProductEditor({ onSubmit, product = {}, isEditing = false }) {
  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [images, setImages] = useState(product.images || "");
  const [price, setPrice] = useState(product.price || "");
  const [description, setDescription] = useState(product.description || "");
  const [tags, setTags] = useState(product.tags || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      category,
      images,
      price: parseFloat(price),
      description,
      tags,
    };
    onSubmit(newProduct);
  };

  return (
    <main id="main" className="main">
        <PageTitle title="Sản phẩm" />
    <div className="">
      <div className="p-4">
        <h3 className="text-center mb-4">
          {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label>Danh mục</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Giá</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Hình ảnh (URL, cách nhau bằng dấu phẩy)</label>
            <input
              type="text"
              className="form-control"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Mô tả</label>
            <textarea
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Tags (cách nhau bằng dấu phẩy)</label>
            <input
              type="text"
              className="form-control"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </main>
  );
}

export default ProductEditor;