import React, { useState } from "react";
import "./productEditor.css";

const ProductEditor = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    pricePerUnit: 0,
    stock: 0,
    category: "",
    description: "",
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

  const handleMediaUpload = (files) => {
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024);
    const newMedia = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setProduct((prev) => ({
      ...prev,
      media: [...prev.media, ...newMedia],
    }));
  };

  return (
    <main id="main" className="main">
<div className="product-editor">
      <div className="editor-header">
        <button className="back-button">←</button>
        <h2>Motorcycle Product Editor</h2>
        <div className="editor-actions">
          <button className="delete-button">🗑 Delete</button>
          <button className="save-button">💾 Save Product</button>
        </div>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab("basic")} className={activeTab === "basic" ? "active" : ""}>Basic Info</button>
        <button onClick={() => setActiveTab("details")} className={activeTab === "details" ? "active" : ""}>Specifications</button>
        <button onClick={() => setActiveTab("media")} className={activeTab === "media" ? "active" : ""}>Media</button>
      </div>

      {activeTab === "basic" && (
        <div className="tab-content">
          <h3>Basic Information</h3>
          <p>Enter the basic details about your motorcycle product.</p>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={product.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                placeholder="Enter brand name"
                value={product.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={product.pricePerUnit}
                onChange={(e) => handleInputChange("pricePerUnit", parseFloat(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                placeholder="Enter stock quantity"
                value={product.stock}
                onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
              />
            </div>
            <div className="form-group full-width">
              <label>Category</label>
              <select
                value={product.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                <option value="">Select category</option>
                <option value="scooter">Scooter</option>
                <option value="sport">Sport</option>
                <option value="cruiser">Cruiser</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                placeholder="Enter product description"
                value={product.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      )}

{activeTab === "details" && (
  <div className="tab-content">
    <h3>Specifications</h3>
    <p>Enter technical specifications of the product.</p>
    <div className="form-grid">
      <div className="form-group">
        <label>Origin</label>
        <input
          type="text"
          placeholder="Enter origin"
          value={product.information.productSpecific.origin || ""}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              information: {
                ...prev.information,
                productSpecific: {
                  ...prev.information.productSpecific,
                  origin: e.target.value,
                },
              },
            }))
          }
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <input
          type="text"
          placeholder="Enter type"
          value={product.information.productSpecific.type || ""}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              information: {
                ...prev.information,
                productSpecific: {
                  ...prev.information.productSpecific,
                  type: e.target.value,
                },
              },
            }))
          }
        />
      </div>
      <div className="form-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="Enter weight"
          value={product.information.productSpecific.weight || ""}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              information: {
                ...prev.information,
                productSpecific: {
                  ...prev.information.productSpecific,
                  weight: parseFloat(e.target.value),
                },
              },
            }))
          }
        />
      </div>
      <div className="form-group">
        <label>Dimensions (L×W×H cm)</label>
        <input
          type="text"
          placeholder="Enter dimensions"
          value={product.information.productSpecific.dimensions || ""}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              information: {
                ...prev.information,
                productSpecific: {
                  ...prev.information.productSpecific,
                  dimensions: e.target.value,
                },
              },
            }))
          }
        />
      </div>
      <div className="form-group full-width">
        <label>Other Notes</label>
        <textarea
          placeholder="Enter additional specs or notes"
          value={product.information.productSpecific.notes || ""}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              information: {
                ...prev.information,
                productSpecific: {
                  ...prev.information.productSpecific,
                  notes: e.target.value,
                },
              },
            }))
          }
        ></textarea>
      </div>
    </div>
    {/* ProductInfoContent List */}
<div className="form-section">
  <h4>Product Information Content</h4>
  {product.information.productInfoContent.map((item, index) => (
    <div key={index} className="form-grid">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={item.title}
          placeholder="Enter title"
          onChange={(e) => {
            const updated = [...product.information.productInfoContent];
            updated[index].title = e.target.value;
            setProduct((prev) => ({
              ...prev,
              information: { ...prev.information, productInfoContent: updated },
            }));
          }}
        />
      </div>
      <div className="form-group full-width">
        <label>Content</label>
        <textarea
          value={item.content}
          placeholder="Enter content"
          onChange={(e) => {
            const updated = [...product.information.productInfoContent];
            updated[index].content = e.target.value;
            setProduct((prev) => ({
              ...prev,
              information: { ...prev.information, productInfoContent: updated },
            }));
          }}
        />
      </div>
    </div>
  ))}
  <button
    className="add-button"
    onClick={() => {
      setProduct((prev) => ({
        ...prev,
        information: {
          ...prev.information,
          productInfoContent: [
            ...prev.information.productInfoContent,
            { title: "", content: "" },
          ],
        },
      }));
    }}
  >
    ➕ Add Info Section
  </button>
</div>

{/* Product Colors */}
<div className="form-section">
  <h4>Product Colors</h4>
  {product.information.colors.map((color, index) => (
    <div key={index} className="form-grid">
      <div className="form-group">
        <label>Color</label>
        <input
          type="text"
          value={color.color}
          placeholder="Enter color name"
          onChange={(e) => {
            const updated = [...product.information.colors];
            updated[index].color = e.target.value;
            setProduct((prev) => ({
              ...prev,
              information: { ...prev.information, colors: updated },
            }));
          }}
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          value={color.image}
          placeholder="Enter image URL"
          onChange={(e) => {
            const updated = [...product.information.colors];
            updated[index].image = e.target.value;
            setProduct((prev) => ({
              ...prev,
              information: { ...prev.information, colors: updated },
            }));
          }}
        />
      </div>
    </div>
  ))}
  <button
    className="add-button"
    onClick={() => {
      setProduct((prev) => ({
        ...prev,
        information: {
          ...prev.information,
          colors: [...prev.information.colors, { color: "", image: "" }],
        },
      }));
    }}
  >
    ➕ Add Color Option
  </button>
</div>

  </div>
)}


{activeTab === "media" && (
  <div className="tab-content">
    <h3>Media Upload</h3>
    <p>
      Upload images and videos of your motorcycle product. Drag and drop files
      or click to browse.
    </p>

    <div
      className="media-dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleMediaUpload(files);
      }}
    >
      <div className="dropzone-content">
        <div className="upload-icon">⬆️</div>
        <p className="drop-text">Drag and drop files here</p>
        <p className="file-info">
          Supported formats: JPG, PNG, GIF, MP4, WebM<br />
          Maximum file size: 10MB
        </p>
        <label htmlFor="fileInput" className="browse-button">
          + Browse Files
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*,video/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleMediaUpload(Array.from(e.target.files || []))}
        />
      </div>
    </div>
  </div>
)}

    </div>
    </main>
  );
};

export default ProductEditor;