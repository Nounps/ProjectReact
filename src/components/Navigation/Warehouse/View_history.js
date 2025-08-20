import React, { useMemo, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import "../../CSS/View_history.css";
import Navbar from "../../Navigation/navbar";

const MOCK_DATA = [
  {
    id: 1,
    datetime: "2025-08-05 10:40:51",
    product: "Black Welding Gloves",
    warehouse: "Main Warehouse",
    action: "withdraw",
    qty: 5,
    actor: "Super Admin",
  },
  {
    id: 2,
    datetime: "2025-08-05 10:40:51",
    product: "Waterproof Apron",
    warehouse: "Main Warehouse",
    action: "withdraw",
    qty: 1,
    actor: "Super Admin",
  },
  {
    id: 3,
    datetime: "2025-08-04 23:18:14",
    product: "20MPA Cement",
    warehouse: "Main Warehouse",
    action: "withdraw",
    qty: 1,
    actor: "Super Admin",
  },
  {
    id: 4,
    datetime: "2025-08-04 23:18:14",
    product: "Waterproof Apron",
    warehouse: "Main Warehouse",
    action: "withdraw",
    qty: 2,
    actor: "Super Admin",
  },
  {
    id: 5,
    datetime: "2025-08-04 23:18:14",
    product: "Black Welding Gloves",
    warehouse: "Main Warehouse",
    action: "withdraw",
    qty: 3,
    actor: "Super Admin",
  },
  {
    id: 6,
    datetime: "2025-08-04 23:17:18",
    product: "20MPA Cement",
    warehouse: "Main Warehouse",
    action: "received",
    qty: 17777,
    actor: "Super Admin",
  },
];

export default function ViewHistory() {
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [actor, setActor] = useState("");
  const [action, setAction] = useState("");
  const [from, setFrom] = useState("2025-08-01");
  const [to, setTo] = useState("2025-08-11");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredData = useMemo(() => {
    const fromTime = from ? new Date(from + "T00:00:00").getTime() : -Infinity;
    const toTime = to ? new Date(to + "T23:59:59").getTime() : Infinity;
    return MOCK_DATA.filter((row) => {
      const ts = new Date(row.datetime.replace(" ", "T")).getTime();
      const byDate = ts >= fromTime && ts <= toTime;
      const bySearch =
        !search ||
        row.product.toLowerCase().includes(search.toLowerCase()) ||
        row.warehouse.toLowerCase().includes(search.toLowerCase());
      const byWh = !warehouse || row.warehouse === warehouse;
      const byActor = !actor || row.actor === actor;
      const byAction = !action || row.action === action;
      return byDate && bySearch && byWh && byActor && byAction;
    });
  }, [search, warehouse, actor, action, from, to]);

  const formatNumber = (n) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleExport = () => {
    const headers = [
      "Date",
      "Product",
      "Warehouse",
      "Action",
      "Quantity",
      "Performed By",
    ];
    const rows = filteredData.map((r) => [
      r.datetime,
      r.product,
      r.warehouse,
      r.action,
      r.qty,
      r.actor,
    ]);
    const csv =
      "\uFEFF" +
      [headers, ...rows].map((row) => row.map(String).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="vh-toolbar">
        <h2 className="vh-title">ປະຫວັດຄັງ</h2>

        {/* Filter Row */}
        <div className="vh-filters">
          <input
            className="vh-input"
            placeholder="ຄົ້ນຫາສິນຄ້າ ຫລື ຄັງ…………………"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />

          <select
            className="vh-input"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            aria-label="Warehouse"
          >
            <option value="">ເລືອກຄັງ</option>
            <option value="Main Warehouse">Main Warehouse</option>
          </select>

          <div className="date-range" aria-label="Date range">
            <input
              type="date"
              className="date-input"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <span className="vh-to">to</span>
            <input
              type="date"
              className="date-input"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <select
            className="vh-input"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            aria-label="User"
          >
            <option value="">ເລືອກຜູ້ເຮັດ</option>
            <option value="Super Admin">Super Admin</option>
          </select>

          <select
            className="vh-input"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            aria-label="Action"
          >
            <option value="">ເຮັດລາຍການ</option>
            <option value="withdraw">Withdraw</option>
            <option value="received">Received</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        {/* Buttons Row */}
        <div className="vh-buttons">
          <button
            className="btn btn-search"
            onClick={() => {
              /* no-op; filters auto-apply */
            }}
          >
            ຄົ້ນຫາ
          </button>
          <button className="btn btn-excel" onClick={handleExport}>
            <FaFileExcel />
            Export Excel
          </button>
        </div>
      </div>

      {/* Table / Cards */}
      <div className="vh-card">
        <div className="vh-table-head" aria-hidden="true">
          <div>ວັນທີ່</div>
          <div>ສິນຄ້າ</div>
          <div>ຄັງສິນຄ້າ</div>
          <div>ເຮັດລາຍການ</div>
          <div>ຈຳນວນ</div>
          <div>ຜູ້ເຮັດລາຍການ</div>
        </div>

        <div className="vh-table-body">
          {filteredData.map((row) => (
            <div className="vh-row" key={row.id}>
              <div className="vh-cell" data-label="Date">
                {row.datetime}
              </div>
              <div className="vh-cell vh-product" data-label="Product">
                {row.product}
              </div>
              <div className="vh-cell" data-label="Warehouse">
                {row.warehouse}
              </div>
              <div className="vh-cell" data-label="Action">
                {row.action}
              </div>
              <div className="vh-cell" data-label="Quantity">
                {formatNumber(row.qty)}
              </div>
              <div className="vh-cell" data-label="Performed By">
                {row.actor}
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div className="vh-empty">No data found</div>
          )}
        </div>
      </div>
    </div>
  );
}
