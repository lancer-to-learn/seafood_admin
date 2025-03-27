import React, { useState, useEffect } from "react";
import "./branchList.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import BranchCard from "../../components/Card/BranchCard";
import BranchEditor from "../../components/Form/BranchEditor";
import { Toast, ToastContainer } from "react-bootstrap";
import { getAllBranches, createBranch, updateBranch } from "../../services/branchServices.js";
import BranchEditors from "../../components/Form/BranchEditors.jsx";

const BranchList = () => {
  const [branches, setBranches] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const getToastClass = (type) => {
    switch (type) {
      case "success":
        return "bg-success text-white";
      case "error":
        return "bg-danger text-white";
      case "warning":
        return "bg-warning text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  const toggleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };
  const selectAll = () => {
    setSelected(branches.map((b) => b.id));
  };

  const confirmDelete = (id) => {
    setBranchToDelete(id);
    setShowConfirm(true);
  };

  const deleteBranch = () => {
    setBranches(branches.filter((branch) => branch.id !== branchToDelete));
    setShowConfirm(false);
    setBranchToDelete(null);
    showToast("Chi nhánh đã được xóa thành công!", "success");
  };

  const confirmDeleteSelected = () => {
    setShowConfirmMultiple(true);
  };

  const deleteSelected = () => {
    setBranches(branches.filter((branch) => !selected.includes(branch.id)));
    setSelected([]);
    setShowConfirmMultiple(false);
    showToast("Các chi nhánh đã được xóa thành công!", "success");
  };

  const addOrUpdateBranch = (branch) => {
    if (branch.id) {
      updateBranch(branch.id, branch).then((res) => {
        if (res.status === 200) {
          setBranches(branches.map((b) => (b.id === branch.id ? branch : b)));
          showToast("Chi nhánh đã được cập nhật thành công!", "success");
        } else {
          showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error");
        }
      }).catch(showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error"));
    } else {
      createBranch(branch).then((res) => {
        if (res.status === 200) {
          setBranches(branches.map((b) => (b.id === branch.id ? branch : b)));
          showToast("Chi nhánh mới đã được thêm thành công!", "success");
        } else {
          showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error");
        }
      }).catch(showToast("Có lỗi xảy ra, vui lòng thử lại sau!", "error"));
    }
    setShowForm(false);
    setEditingBranch(null);
  };

  const fetchData = () => {
    getAllBranches().then(res => {
      setBranches(res.data);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main id="main" className="main">
      <PageTitle title="Branches" />
      <div>
        {selected && selected.length > 0 ? (
          <div className="d-flex justify-content-between align-items-center mb-3 p-2 rounded flex-wrap">
            <div>
              <strong
                className="text-primary mr-3"
                style={{ cursor: "pointer" }}
                onClick={selectAll}
              >
                Chọn tất cả
              </strong>
              <span> | </span>
              <strong
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setSelected([])}
              >
                Bỏ chọn tất cả
              </strong>
            </div>
            <i
              className="bx bx-trash bx-md ml-3"
              onClick={confirmDeleteSelected}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center mb-3 p-2 rounded">
            <i
              className="bx bx-plus-circle bx-md ml-auto"
              onClick={() => setShowForm(true)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        )}
      </div>
      {showForm && (
        <BranchEditor
          branch={editingBranch}
          onSave={addOrUpdateBranch}
          onClose={() => {
            setShowForm(false);
            setEditingBranch(null);
          }}
        />
      )}
      <div className="row">
        {branches !== null && branches.length > 0 ? (
          branches.map((branch) => (
            <BranchCard
              branch={branch}
              isSelected={selected.includes(branch.id)}
              onSelect={() => toggleSelect(branch.id)}
              onEdit={() => {
                setEditingBranch(branch);
                setShowForm(true);
              }}
              onDelete={() => confirmDelete(branch.id)}
            />
          ))
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <i
              className="bi bi-shop text-secondary"
              style={{ fontSize: "4rem" }}
            ></i>
            <p className="text-muted fs-3 mt-3">Chưa có chi nhánh</p>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4 className="text-center">Xác nhận xóa</h4>
            <p>Bạn có chắc chắn muốn xóa chi nhánh này không?</p>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                Hủy
              </button>
              <button className="btn btn-danger" onClick={deleteBranch}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmMultiple && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4 className="text-center">Xác nhận xóa</h4>
            <p>Bạn có chắc chắn muốn xóa các chi nhánh đã chọn không?</p>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmMultiple(false)}
              >
                Hủy
              </button>
              <button className="btn btn-danger" onClick={deleteSelected}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-end" className="toast-message mb-3 p-3">
        <Toast
          show={!!toast.message}
          className={getToastClass(toast.type)}
          autohide
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </main>
  );
};

export default BranchList;
