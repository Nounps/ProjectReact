import React, { useMemo, useState } from "react";
import "../../CSS/Cycle_count.css";
import Navbar from "../../Navigation/navbar";

/** Mock data — replace with API later */
const WAREHOUSES = [
  { id: "wh1", name: "Main Warehouse" },
  { id: "wh2", name: "Backup Warehouse" },
];

const MOCK_STOCK = [
  {
    id: 1,
    name: "Black Welding Gloves",
    warehouseId: "wh1",
    currentQty: 25,
    alertPoint: 10,
  },
  {
    id: 2,
    name: "Waterproof Apron",
    warehouseId: "wh1",
    currentQty: 8,
    alertPoint: 5,
  },
  {
    id: 3,
    name: "20MPA Cement",
    warehouseId: "wh2",
    currentQty: 177,
    alertPoint: 30,
  },
];

export default function CycleCount() {
  const [warehouseId, setWarehouseId] = useState(""); // Selected warehouse
  const [draft, setDraft] = useState({}); // { [id]: { newQty?: number, alertPoint?: number } }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const rows = useMemo(
    () =>
      MOCK_STOCK.filter((r) =>
        warehouseId ? r.warehouseId === warehouseId : true
      ),
    [warehouseId]
  );

  const handleChange = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value === "" ? "" : Number(value),
      },
    }));
  };

  const getNewQty = (row) =>
    draft[row.id]?.newQty === "" || draft[row.id]?.newQty === undefined
      ? ""
      : Number(draft[row.id].newQty);

  const getAlertPoint = (row) =>
    draft[row.id]?.alertPoint === "" || draft[row.id]?.alertPoint === undefined
      ? row.alertPoint
      : Number(draft[row.id].alertPoint);

  const diff = (row) => {
    const nq = getNewQty(row);
    if (nq === "") return "";
    return nq - row.currentQty;
  };

  const changedPayload = () =>
    rows
      .map((r) => ({
        id: r.id,
        newQty: draft[r.id]?.newQty,
        alertPoint: draft[r.id]?.alertPoint ?? r.alertPoint,
      }))
      .filter(
        (x) => typeof x.newQty === "number" || typeof x.alertPoint === "number"
      );

  const handleSave = () => {
    const payload = changedPayload();
    // TODO: call API here
    console.log("Saving payload:", payload);
    alert("Save successful (mock) — See payload in console");
  };

  const saveDisabled = changedPayload().length === 0;

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <h1 className="cc-title">Cycle Count</h1>

      <div className="cc-toolbar">
        <select
          className="cc-select"
          value={warehouseId}
          onChange={(e) => setWarehouseId(e.target.value)}
        >
          <option value="">ເລືອກຄັງ</option>
          {WAREHOUSES.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <button
          className="cc-save"
          onClick={handleSave}
          disabled={saveDisabled}
        >
          ບັນທຶກ
        </button>
      </div>

      <div className="cc-table">
        <div className="cc-row cc-head">
          <div className="col-name">ຊື່ສິນຄ້າ</div>
          <div className="col-current">ຈຳນວນປັດຈຸບັນ</div>
          <div className="col-new">ຈຳນວນໃຫມ່</div>
          <div className="col-diff">ຜົນຕ່າງ</div>
          <div className="col-alert">ຈຸດແຈ້ງເຕືອນ</div>
        </div>

        {rows.length === 0 ? (
          <div className="cc-empty">No product data in this warehouse</div>
        ) : (
          rows.map((r) => (
            <div className="cc-row" key={r.id}>
              <div className="col-name cell-text" title={r.name}>
                {r.name}
              </div>

              <div className="col-current cell-number">{r.currentQty}</div>

              <div className="col-new">
                <input
                  className="cc-input"
                  type="number"
                  min="0"
                  placeholder="-"
                  value={draft[r.id]?.newQty ?? ""}
                  onChange={(e) => handleChange(r.id, "newQty", e.target.value)}
                />
              </div>

              <div
                className={`col-diff cell-number ${
                  diff(r) === ""
                    ? ""
                    : diff(r) > 0
                    ? "pos"
                    : diff(r) < 0
                    ? "neg"
                    : "zero"
                }`}
              >
                {diff(r) === "" ? "-" : diff(r)}
              </div>

              <div className="col-alert">
                <input
                  className="cc-input"
                  type="number"
                  min="0"
                  value={draft[r.id]?.alertPoint ?? r.alertPoint}
                  onChange={(e) =>
                    handleChange(r.id, "alertPoint", e.target.value)
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
