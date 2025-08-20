import React, { useMemo, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import "../../CSS/Overview.css";
import Navbar from "../../Navigation/navbar";

const MOCK_DATA = [
  {
    id: 1,
    name: "ບຸງຊັບຕະຊູດຮ່ວງວານ 20MPA",
    category: "ວັດຖຸກໍ່ສ້າງ",
    unit: "ຖົງ",
    total_in: 17784,
    total_out: 8,
    remaining: 17776,
    total: 17776,
  },
  {
    id: 2,
    name: "ຊີມັງໃສ່ປຸ່ຍ",
    category: "ວັດຖຸກໍ່ສ້າງ",
    unit: "ກ້ວຍ",
    total_in: 100,
    total_out: 5,
    remaining: 95,
    total: 95,
  },
  {
    id: 3,
    name: "ເຫຼັກກ້ອນດໍາ",
    category: "ອຸປະກອນ",
    unit: "ແທ່ງ",
    total_in: 100,
    total_out: 33,
    remaining: 67,
    total: 67,
  },
  {
    id: 4,
    name: "ເຫຼັກ 10 ບ້ອງອ້ອຍ VSI",
    category: "ເຫຼັກ",
    unit: "ແທ່ງ",
    total_in: 12,
    total_out: 12,
    remaining: 0,
    total: 0,
  },
  {
    id: 5,
    name: "ເຫຼັກ 20 ບ້ອງອ້ອຍ VSI",
    category: "ເຫຼັກ",
    unit: "ແທ່ງ",
    total_in: 36,
    total_out: 36,
    remaining: 0,
    total: 0,
  },
  {
    id: 6,
    name: "ເຫຼັກ 6 ມມ VSI",
    category: "ເຫຼັກ",
    unit: "ແທ່ງ",
    total_in: 5,
    total_out: 5,
    remaining: 0,
    total: 0,
  },
  {
    id: 7,
    name: "ແຜ່ນກ້ອນກະທີບ 4x8",
    category: "ວັດຖຸກໍ່ສ້າງ",
    unit: "ແຜ່ນ",
    total_in: 12,
    total_out: 12,
    remaining: 0,
    total: 0,
  },
];

export default function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("remaining:asc");

  const data = useMemo(() => {
    const filtered = MOCK_DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.category.toLowerCase().includes(q.toLowerCase())
    );
    const [field, dirRaw] = sort.split(":");
    const dir = (dirRaw || "asc").toLowerCase();
    return [...filtered].sort((a, b) => {
      const va = a[field];
      const vb = b[field];
      if (typeof va === "number" && typeof vb === "number") {
        return dir === "asc" ? va - vb : vb - va;
      }
      return dir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [q, sort]);

  const handleExport = () => {
    alert("ກົດເພື່ອສົ່ງອອກເປັນ Excel (ຕ້ອງເຊື່ອມກັບ /api/inventory/export).");
  };

  return (
    <div className={`ov-wrapper${sidebarOpen ? " shifted" : ""}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <h2 className="ov-title">ສະຖານະຄັງສິນຄ້າທັງໝົດ</h2>
      {/* Controls */}
      <div className="ov-controls">
        <input
          className="ov-input"
          placeholder="ຄົ້ນຫາ"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="ov-select-wrap">
          <select
            className="ov-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="remaining:asc">
              ຈັດລຽງຈາກຈໍານວນຄົງເຫຼືອນ້ອຍໄປຫາຫຼາຍ
            </option>
            <option value="remaining:desc">
              ຈັດລຽງຈາກຈໍານວນຄົງເຫຼືອຫຼາຍໄປຫານ້ອຍ
            </option>
            <option value="name:asc">ຈັດລຽງຕາມຊື່ (A–Z)</option>
            <option value="name:desc">ຈັດລຽງຕາມຊື່ (Z–A)</option>
            <option value="total_in:desc">ຮວມຮັບເຂົ້າ ຫຼາຍ→ນ້ອຍ</option>
            <option value="total_out:desc">ຮວມເບີກອອກ ຫຼາຍ→ນ້ອຍ</option>
          </select>
          <IoIosArrowDown className="ov-select-caret" />
        </div>
        <div className="">
          <button className="ov-btn ov-search">ຄົ້ນຫາ</button>
        </div>
        <div className="">
          {" "}
          <button className="ov-btn ov-excel" onClick={handleExport}>
            <FaFileExcel className="mr-2" />
            ສົ່ງອອກ Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="ov-table-wrap">
        <table className="ov-table">
          <thead>
            <tr>
              <th className="left">ລາຍການສິນຄ້າ</th>
              <th>ປະເພດ</th>
              <th>ຫົວໜ່ວຍ</th>
              <th>ຮວມຮັບເຂົ້າ</th>
              <th>ຮວມເບີກອອກ</th>
              <th>ຄົງເຫຼືອປັດຈຸບັນ</th>
              <th>ຮວມ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id}>
                <td className="left">
                  <div className="ov-name">{r.name}</div>
                  <button className="ov-link">ລາຍລະອຽດ</button>
                </td>
                <td>{r.category}</td>
                <td>{r.unit}</td>
                <td>{r.total_in.toLocaleString()}</td>
                <td>{r.total_out.toLocaleString()}</td>
                <td className="bold">{r.remaining.toLocaleString()}</td>
                <td className="bold">{r.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}