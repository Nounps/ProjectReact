import React, { useState } from "react";
import '../CSS/CateIncerease.css';
import Navbar from "../Navigation/navbar";
import { useNavigate } from "react-router-dom";

export default function AddCategoryForm() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [form, setForm] = useState({
    parentId: "",
    nameEn: "",
    nameTh: "",
    priority: "",
  });
  const [errors, setErrors] = useState({});
  const parents = [
    { id: "p1", label: "ອຸປະກອນອີເລັກໂທຣນິກ" },
    { id: "p2", label: "ສິນຄ້າອຸປະໂພກ" },
    { id: "p3", label: "ອຸປະກອນການເກັບຮັກສາ" },
  ];

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: name === "priority" ? Number(value) : value }));
  }

function validate() {
  const errs = {};
  if (!form.parentId) errs.parentId = "ກະລຸນາເລືອກຫົວໜ່ວຍ";
  if (!form.nameEn.trim()) errs.nameEn = "ຂຽນຊື່ພາສາອັງກິດ";
  if (!form.nameTh.trim()) errs.nameTh = "ຂຽນຊື່ພາສາໄທ";

  const n = Number(form.priority);
  if (form.priority === "" || !Number.isFinite(n) || n <= 0) {
    errs.priority = "ຕ້ອງຫຼາຍກວ່າ 0";
  }

  setErrors(errs);
  return Object.keys(errs).length === 0;
}



  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // mock submit
    alert(
      `Saved!\nParent: ${parents.find((p) => p.id === form.parentId)?.label}\nEN: ${form.nameEn}\nTH: ${form.nameTh}\nPriority: ${form.priority}`
    );
    // reset
    setForm({ parentId: "", nameEn: "", nameTh: "", priority: 0 });
    setErrors({});
  }

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
  <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <header className="page__topbar">
  <button className="back" type="button" onClick={() => window.history.back()} aria-label="Back">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="11"/>
      <polyline points="12 8 8 12 12 16"/>
      <line x1="16" y1="12" x2="8" y2="12"/>
    </svg>
  </button>
  <div className="header-content">
    <h1 className="page__title">ເພີ່ມໝວດໝູ່ສິນຄ້າ</h1>
    <nav className="breadcrumb" aria-label="breadcrumb"> 
      <span style={{ color: "#f06f19", cursor: "pointer" }} onClick={() => navigate("/categories")}>ໝວດໝູ່ສິນຄ້າ</span>
      <span className="sep">›</span>
      <span className="current">ເພີ່ມໝວດໝູ່ສິນຄ້າ</span>
    </nav>
  </div>
</header>

      <main className="card">
        <form onSubmit={onSubmit} className="form">
          {/* Parent */}
          <div className="row">
            <label htmlFor="parentId" className="label">ໝວດໝູ່ຫຼັກ <span className="req">*</span></label>
            <div className="control">
              <select id="parentId" name="parentId" value={form.parentId} onChange={onChange} className={`input ${errors.parentId ? "invalid" : ""}`}>
                <option value="" disabled>— ເລືອກໝວດໝູ່ຫຼັກ —</option>
                {parents.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
              {errors.parentId && <div className="error">{errors.parentId}</div>}
            </div>
          </div>

          {/* English name */}
          <div className="row">
            <label htmlFor="nameEn" className="label">ຊື່ພາສາອັງກິດ <span className="req">*</span></label>
            <div className="control">
              <input id="nameEn" name="nameEn" value={form.nameEn} onChange={onChange} className={`input ${errors.nameEn ? "invalid" : ""}`} placeholder="e.g. Accessories" />
              {errors.nameEn && <div className="error">{errors.nameEn}</div>}
            </div>
          </div>

          {/* Thai name */}
          <div className="row">
            <label htmlFor="nameTh" className="label">ຊື່ພາສາໄທ <span className="req">*</span></label>
            <div className="control">
              <input id="nameTh" name="nameTh" value={form.nameTh} onChange={onChange} className={`input ${errors.nameTh ? "invalid" : ""}`} placeholder="ເຊັ່ນ ເສື້ອ" />
              {errors.nameTh && <div className="error">{errors.nameTh}</div>}
            </div>
          </div>

          {/* Priority */}
          <div className="row">
  <label htmlFor="priority" className="label">
    ລຳດັບຄວາມສຳຄັນ <span className="req">*</span>
  </label>
  <div className="control">
   <input
  id="priority"
  type="number"
  min={1}
  step={1}
  name="priority"
  value={form.priority}
  onChange={(e) => {
    const v = e.target.value;
    // allow clearing to empty string so the user can retype
    if (v === "") return setForm((s) => ({ ...s, priority: "" }));
    // clamp to >= 1
    const n = parseInt(v, 10);
    setForm((s) => ({ ...s, priority: Number.isNaN(n) ? "" : Math.max(1, n) }));
  }}
  onBlur={() =>
    setForm((s) => ({
      ...s,
      priority: s.priority === "" ? "" : Math.max(1, Number(s.priority)),
    }))
  }
  required
  className={`input w-160 ${errors.priority ? "invalid" : ""}`}
/>

    {errors.priority && <div className="error">{errors.priority}</div>}
  </div>
</div>

          <div className="actions">
            <button type="button"className="btn-secondary"onClick={() => window.history.back()}>Cancel</button>
            <button className="btn-primary" type="submit">ບັນທຶກ</button>
          </div>
        </form>
      </main>
          </div>
  );
}
