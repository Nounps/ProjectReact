import React, { useState } from "react";
import { IoIosList } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../../CSS/Costmanagement.css";
import Navbar from "../../Navigation/navbar";

const CostManagement = () => {
  const [warehouse, setWarehouse] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSave = () => {
    alert("Saved successfully!");
  };

  return (
      <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Cost Management Section */}
      <div className="cost-container">
        <h3>ຈັດການຕົ້ນທຸນ</h3>

        <div className="form-group">
          <label>
            ຊື່ຄັງ <span className="required">*</span>
          </label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          >
            <option value="">ເລືອກຄັງ</option>
            <option value="Warehouse A">ຄັງ A</option>
            <option value="Warehouse B">ຄັງ B</option>
          </select>
        </div>

        <div className="table-header">
          <span>ວັນທີ່ຮັບເຂົ້າ</span>
          <span>ສິນຄ້າ</span>
          <span>ຈຳນວນ</span>
          <span>ລາຄາ</span>
        </div>

        <div className="product-table">
          {/* You can add dynamic rows here later */}
        </div>

        <div className="save-section">
          <button className="save-btn" onClick={handleSave}>
            ບັນທຶກ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostManagement;
