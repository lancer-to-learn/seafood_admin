import React, { useState, useEffect } from 'react'
import './branchEditor.css'

function BranchEditor({ onClose, onSave, branch }) {
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        address: "",
        manager: "",
      });
    
      useEffect(() => {
        if (branch) {
          setFormData(branch);
        } else {
          setFormData({ id: null, name: "", address: "", manager: "" });
        }
      }, [branch]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
      };
    
      return (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4 className="text-center mb-4">
              {formData.id ? "Chỉnh Sửa Chi Nhánh" : "Thêm Chi Nhánh"}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label><i className="bx bx-building-house"></i> Tên Chi Nhánh</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label><i className="bx bx-map"></i> Địa Chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label><i className="bx bx-user"></i> Người Quản Lý</label>
                <input
                  type="text"
                  className="form-control"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">
                  {formData.id ? "Cập Nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default BranchEditor