import React, { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import "../../CSS/Warehouse.css";
import Navbar from "../../Navigation/navbar";


// Mock data (replace with API later)
const warehouses = [
  {
    id: 1,
    name: "ສະຫງວນອຸປະກອນ",
    skuCount: 15,
    productCount: 17938,
  },
];

export default function Warehouse() {
  const navigate = useNavigate(); // ✅ create navigate function
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAdd = () => {
    navigate("/wareincrease"); // ✅ ไปหน้า wareincrease.js
  };

  const handleEdit = (id) => {
    // navigate(`/wareedit/ ${id}`); // ✅ ไปหน้า wareedit.js พร้อมส่ง id
     navigate(`/wareedit`);
  };

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <div className="wh-page">
      <div className="wh-header">
        <h2 className="wh-title">ຄັງສິນຄ້າ (ພົບ {warehouses.length} ລາຍການ)</h2>
        <button className="wh-add" onClick={handleAdd}>
          <FaPlus className="wh-add-icon" /> ເພີ່ມ
        </button>
      </div>

      <div className="wh-table">
        <div className="wh-row wh-head">
          <div className="col-id">ລຳດັບ</div>
          <div className="col-name">ຊື່ຄັງ</div>
          <div className="col-sku">ຈໍານວນ SKU</div>
          <div className="col-total">ຈໍານວນສິນຄ້າ</div>
          <div className="col-action"></div>
        </div>

        {warehouses.map((w) => (
          <div className="wh-row" key={w.id}>
            <div className="col-id">{w.id}</div>
            <div className="col-name">{w.name}</div>
            <div className="col-sku">{w.skuCount}</div>
            <div className="col-total">{w.productCount.toLocaleString()}</div>
            <div className="col-action">
              <button className="wh-edit-btn" onClick={() => handleEdit(w.id)}>
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
