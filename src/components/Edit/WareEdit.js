import React, { useState } from "react";
import "../CSS/WareEdit.css"; 
import Navbar from "../Navigation/navbar";
import { useNavigate } from "react-router-dom";

export default function WareEditPage() {
  const [name, setName] = useState("ວັງວຽງຄັງສິນຄ້າ"); // demo value
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

      function handleAskDelete() {
  setShowConfirm(true);
}

function handleConfirmDelete() {
  setShowConfirm(false);
  // TODO: call your API to delete here
  alert("Deleted!"); 
}

function handleCancelDelete() {
  setShowConfirm(false);
}

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/";
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    console.log("Save warehouse:", name);
    // TODO: call your API here
  };


  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Header */}
      <header className="ching1-header">
        <button className="ching1-back" onClick={goBack} aria-label="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="11" />
            <polyline points="12 8 8 12 12 16" />
            <line x1="16" y1="12" x2="8" y2="12" />
          </svg>
        </button>

        <h1 className="ching1-title">ແກ້ໄຂຄັງສິນຄ້າ</h1>
        <nav className="ching1-breadcrumb">
          <span className="crumb crumb-muted" onClick={() => navigate("/warehouse")}>ຄັງສິນຄ້າ</span>
          <span className="crumb-sep">›</span>
          <span className="crumb">ແກ້ໄຂຄັງສິນຄ້າ</span>
        </nav>
      </header>

      {/* Card */}
      <section className="ching1-card">
        <form onSubmit={onSave} className="ching1-form">
          <label htmlFor="wname" className="ching1-label">
            ຊື່ຄັງສິນຄ້າ <span className="req">*</span>
          </label>

          <input
            id="wname"
            className="ching1-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter warehouse name"
          />

          <div className="ching1-actions">
            <button type="submit" className="btn btn-primary">
              ບັນທຶກ
            </button>
          </div>
        </form>
      </section>

      {/* Right-side delete */}
      <div className="ching1-delete-wrap">
            <button type="button" className="btn btn-danger" onClick={handleAskDelete}>
          ລຶບ
        </button>
      </div>


      {showConfirm && (
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-dialog">
            <div className="confirm-title">ຍືນຍັນການລົບໝວດໝູ່ສິນຄ້າ</div>
            <div className="confirm-actions">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>OK</button>
              <button className="btn-secondary" onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
