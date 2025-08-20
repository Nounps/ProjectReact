import React, { useMemo, useState } from "react";
import "../../CSS/Withdrawal_transfer.css";
import Navbar from "../../Navigation/navbar";

export default function Withdrawal_Transfer() {
  // ---- mock data (replace with API later) ----
  const WAREHOUSES = useMemo(
    () => [
      "ເລືອກຄັງ",
      "Main Warehouse",
      "Secondary Warehouse",
      "Cold Storage",
    ],
    []
  );
  const PRODUCTS = useMemo(
    () => [
      { id: 101, name: "Black Welding Gloves" },
      { id: 102, name: "Waterproof Apron" },
      { id: 103, name: "20MPA Cement" },
      { id: 104, name: "Hard Hat" },
      { id: 105, name: "PVC Pipe 2 in." },
    ],
    []
  );

  // ---- form states ----
  const [warehouse, setWarehouse] = useState("");
  const [mode, setMode] = useState("Withdraw"); // Withdraw | Transfer
  const [receiver, setReceiver] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [items, setItems] = useState([]); // {id, name, qty}
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---- handlers ----
  const onAddItem = () => {
    if (!selectedProductId) return;
    const prod = PRODUCTS.find(
      (p) => String(p.id) === String(selectedProductId)
    );
    if (!prod) return;

    // if already exists, +1 qty
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === prod.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { id: prod.id, name: prod.name, qty: 1 }];
    });

    setSelectedProductId("");
  };

  const onChangeQty = (id, val) => {
    const qty = Math.max(1, Number(val || 0));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const onRemove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const onSave = () => {
    // very small validation (you can swap for real form lib later)
    if (!warehouse) return alert("ຍັງບໍ່ໄດ້ລືອກຄັງ.");
    if (!mode) return alert("ຍັງບໍ່ໄດ້ເລືອກຕົວເລືອກ");
    if (items.length === 0) return alert("ກະລຸນາເພີ່ມຢ່າງຫນ່ອຍ 1 ສິນຄ້າ");

    const payload = {
      warehouse,
      mode,
      receiver,
      date,
      note,
      items,
    };
    // TODO: POST to backend
    console.log("Submit payload:", payload);
    alert("Saved! (mock)");
  };

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <h2 className="wt-title">ເບິກອອກ/ຍ້າຍຄັງ</h2>

      {/* Top form grid */}
      <div className="wt-grid">
        <div className="wt-field">
          <label className="wt-label">
            ຕົ້ນທາງ<span className="req">*</span>
          </label>
          <div className="wt-select-wrap">
            <select
              className="wt-input wt-select"
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
            >
              <option value="" hidden>
                ເລືອກຄັງ
              </option>
              {WAREHOUSES.filter((w) => w !== "Select warehouse").map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            <span className="wt-caret">▾</span>
          </div>
        </div>

        <div className="wt-field">
          <label className="wt-label">
            ຕົວເລືອກ<span className="req">*</span>
          </label>
          <div className="wt-select-wrap">
            <select
              className="wt-input wt-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="Withdraw">ເບິກອອກ</option>
              <option value="Transfer">Transfer</option>
            </select>
            <span className="wt-caret">▾</span>
          </div>
        </div>

        <div className="wt-field">
          <label className="wt-label">ຊື່ຜູ້ຮັບ</label>
          <input
            className="wt-input"
            placeholder="Enter receiver name"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>

        <div className="wt-field">
          <label className="wt-label">ວັນທີ່</label>
          <input
            type="date"
            className="wt-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Note */}
      <div className="wt-field">
        <label className="wt-label">ໂນ້ດ</label>
        <textarea
          className="wt-input wt-note"
          rows={4}
          placeholder="Write a note…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Table header */}
      <div className="wt-table-header">
        <div className="col-index">ເລກ</div>
        <div className="col-product">ສິນຄ້າ</div>
        <div className="col-qty">ຈຳນວນ</div>
      </div>

      {/* Items */}
      <div className="wt-table-body">
        {items.length === 0 ? (
          <div className="wt-empty">No products added.</div>
        ) : (
          items.map((it, idx) => (
            <div className="wt-row" key={it.id}>
              <div className="col-index">{idx + 1}</div>
              <div className="col-product">{it.name}</div>
              <div className="col-qty">
                <input
                  type="number"
                  min={1}
                  className="qty-input"
                  value={it.qty}
                  onChange={(e) => onChangeQty(it.id, e.target.value)}
                />
                <button className="remove-btn" onClick={() => onRemove(it.id)}>
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add product */}
      <div className="wt-add-row">
        <label className="wt-label">
          ເພີ່ມສິນຄ້າ<span className="req">*</span>
        </label>
        <div className="wt-add-controls">
          <div className="wt-select-wrap wt-add-select">
            <select
              className="wt-input wt-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Nothing selected</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <span className="wt-caret">▲</span>
          </div>
          <button type="button" className="add-btn" onClick={onAddItem}>
            ເພີ່ມ
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="wt-actions">
        <button className="save-btn" onClick={onSave}>
          ບັນທຶກ
        </button>
      </div>
    </div>
  );
}
