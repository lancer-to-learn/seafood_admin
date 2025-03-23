import React from "react";
import "./branchCard.css";

function BranchCard({ branch, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <div key={branch.id} className="col-md-3 mb-4">
      <div
        className={`card h-100 shadow-sm branch-card position-relative ${
            isSelected ? "selected" : ""
        }`}
      >
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <i className="bx bx-building-house bx-md mr-3"></i>
          <h5 className="mb-0">{branch.name}</h5>
        </div>
        <div className="card-body text-left">
          <p className="card-text">
            <i className="bx bx-map"></i> <strong>Địa chỉ:</strong>{" "}
            {branch.address}
          </p>
          <p className="card-text">
            <i className="bx bx-user"></i> <strong>Người quản lý:</strong>{" "}
            {branch.manager}
          </p>
        </div>
        <div className="card-icons">
        <i className='bx bx-edit edit-icon' onClick={onEdit}></i>
        <i className='bx bx-trash delete-icon' onClick={onDelete}></i>
        </div>
        <div className="select-icon" onClick={onSelect}>
          <i
            className={`bx ${
                isSelected ? "bx-check-circle" : "bx-circle"
            } text-white`}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default BranchCard;
