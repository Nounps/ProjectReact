import React, { useState } from "react";
import "../CSS/WareIncrease.css";
import Navbar from "../Navigation/navbar";
import { useNavigate } from "react-router-dom";

export default function WareIncreasePage() {
  const [warehouseName, setWarehouseName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    // Simple browser back (safe if no Router)
    if (window.history.length > 1) window.history.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!warehouseName.trim()) return;
    console.log("Saving warehouse:", warehouseName);
    // TODO: call your API here
  };

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <header className="ch-topbar">
        <button
          className="ch-back"
          type="button"
          aria-label="Back"
          onClick={handleBack}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="11" />
            <polyline points="12 8 8 12 12 16" />
            <line x1="16" y1="12" x2="8" y2="12" />
          </svg>
        </button>

        <h1 className="ch-title">ເພີ່ມຄັງສິນຄ້າ</h1>

        <nav className="breadcrumb">
          <span  style={{ color: "#f06f19", cursor: "pointer" }} onClick={() => navigate("/warehouse")}>ຄັງສິນຄ້າ</span>
          <span className="sep" >›</span>
          <span className="crumb current">ເພີ່ມຄັງສິນຄ້າ</span>
        </nav>
      </header>

      <section className="ch-card">
        <form onSubmit={handleSubmit} className="ch-form">
          <div className="ch-row">
            <label htmlFor="warehouseName" className="ch-label">
              ຊື່ຄັງສິນຄ້າ <span className="req">*</span>
            </label>

            <input
              id="warehouseName"
              className="ch-input"
              type="text"
              placeholder="ໃສ່ຊື່ຄັງສິນຄ້າ"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
              required
            />
          </div>

          <div className="ch-actions">
            <button className="ch-save" type="submit">
              ບັນທຶກ
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
