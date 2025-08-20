import React, { useState } from "react";
import { IoIosList } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../../CSS/Import.css";
import Navbar from "../../Navigation/navbar";

const Import = () => {
  const [warehouse, setWarehouse] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productList, setProductList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const exists = productList.find((item) => item.name === selectedProduct);
    if (!exists) {
      setProductList([...productList, { name: selectedProduct, quantity: 0 }]);
      setSelectedProduct("");
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedList = [...productList];
    updatedList[index].quantity = value;
    setProductList(updatedList);
  };

  return (
      /* === Navbar === */
            <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
                  <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* === Import Form === */}
      <div className="import-container">
        <h2>ຮັບຂອງເຂົ້າ</h2>

        <div className="form-row">
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

          <label>
            ວັນທີ່ຮັບ <span className="required">*</span>
          </label>
          <input
            type="date"
            value={receiveDate}
            onChange={(e) => setReceiveDate(e.target.value)}
          />
        </div>

        <div className="table-header">
          <span>ສິນຄ້າ</span>
          <span>ຈຳນວນ</span>
        </div>

        <div className="product-table">
          {productList.map((item, index) => (
            <div className="table-row" key={index}>
              <span>{item.name}</span>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="form-footer">
          <label>
            ເພີ່ມສິນຄ້າ <span className="required">*</span>
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">ເລືອກຄັງ</option>
            <option value="Product A">ສິນຄ້າ A</option>
            <option value="Product B">ສິນຄ້າ B</option>
          </select>

          <button className="save-btn" onClick={handleAddProduct}>
            ບັນທຶກ
          </button>
        </div>
      </div>
      </div>
  );
};

export default Import;
