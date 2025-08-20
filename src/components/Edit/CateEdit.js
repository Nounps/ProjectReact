import React, { useState } from "react";
import "../CSS/CateEdit.css";
import Navbar from "../Navigation/navbar";
import { useNavigate } from "react-router-dom";

export default function CategoryEditPage() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false);
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
  
  const [form, setForm] = useState({
    parentId: "",
    EditnameEn: "",
    nameTh: "",
    Editpriority: "",
  });
  const [errors, setErrors] = useState({});
  const parents = [
    { id: "p1", label: "ອຸປະກອນອີເລັກໂທຣນິກ" },
    { id: "p2", label: "ສິນຄ້າອຸປະໂພກ" },
    { id: "p3", label: "ອຸປະກອນການເກັບຮັກສາ" },
  ];

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: name === "Editpriority" ? Number(value) : value }));
  }

function validate() {
  const errs = {};
  if (!form.parentId) errs.parentId = "ກະລຸນາເລືອກຫົວໜ່ວຍ";
  if (!form.EditnameEn.trim()) errs.EditnameEn = "ຂຽນຊື່ພາສາອັງກິດ";
  if (!form.nameTh.trim()) errs.nameTh = "ຂຽນຊື່ພາສາໄທ";

  const n = Number(form.Editpriority);
  if (form.Editpriority === "" || !Number.isFinite(n) || n <= 0) {
    errs.Editpriority = "ຕ້ອງຫຼາຍກວ່າ 0";
  }


  setErrors(errs);
  return Object.keys(errs).length === 0;
}



  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // mock submit
    alert(
      `Saved!\nParent: ${parents.find((p) => p.id === form.parentId)?.label}\nEN: ${form.EditnameEn}\nTH: ${form.nameTh}\nEditPriority: ${form.Editpriority}`
    );
    // reset
    setForm({ parentId: "", EditnameEn: "", nameTh: "", Editpriority: 0 });
    setErrors({});
  }

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 
      <header className="Editpage__topbar">
  <button className="back" type="button" onClick={() => window.history.back()} aria-label="Back">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="11"/>
      <polyline points="12 8 8 12 12 16"/>
      <line x1="16" y1="12" x2="8" y2="12"/>
    </svg>
  </button>
  <div className="Editheader-content">
    <h1 className="Editpage__title">ໝວດໝູ່ສິນຄ້າ</h1>
    <nav className="breadcrumb" aria-label="breadcrumb"> 
      <span style={{ color: "#f06f19", cursor: "pointer" }} onClick={() => navigate("/categories")}>ໝວດໝູ່ສິນຄ້າ</span>
      <span className="sep">›</span>
      <span className="current">ແກ້ໄຂໝວດໝູ່</span>
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
            <label htmlFor="EditnameEn" className="label">ຊື່ພາສາອັງກິດ <span className="req">*</span></label>
            <div className="control">
              <input id="EditnameEn" name="EditnameEn" value={form.EditnameEn} onChange={onChange} className={`input ${errors.EditnameEn ? "invalid" : ""}`} placeholder="e.g. Accessories" />
              {errors.EditnameEn && <div className="error">{errors.EditnameEn}</div>}
            </div>
          </div>

          {/* Thai name */}
          <div className="row">
            <label htmlFor="EditnameTh" className="label">ຊື່ພາສາໄທ <span className="req">*</span></label>
            <div className="control">
              <input id="EditnameTh" name="EditnameTh" value={form.EditnameTh} onChange={onChange} className={`input ${errors.EditnameTh ? "invalid" : ""}`} placeholder="ເຊັ່ນ ເສື້ອ" />
              {errors.EditnameTh && <div className="error">{errors.EditnameTh}</div>}
            </div>
          </div>

          {/* EditPriority */}
          <div className="row">
  <label htmlFor="Editpriority" className="label">
    ລຳດັບຄວາມສຳຄັນ <span className="req">*</span>
  </label>
  <div className="control">
   <input
  id="Editpriority"
  type="number"
  min={1}
  step={1}
  name="Editpriority"
  value={form.Editpriority}
  onChange={(e) => {
    const v = e.target.value;
    // allow clearing to empty string so the user can retype
    if (v === "") return setForm((s) => ({ ...s, Editpriority: "" }));
    // clamp to >= 1
    const n = parseInt(v, 10);
    setForm((s) => ({ ...s, Editpriority: Number.isNaN(n) ? "" : Math.max(1, n) }));
  }}
  onBlur={() =>
    setForm((s) => ({
      ...s,
      Editpriority: s.Editpriority === "" ? "" : Math.max(1, Number(s.Editpriority)),
    }))
  }
  required
  className={`input w-160 ${errors.Editpriority ? "invalid" : ""}`}
/>

    {errors.Editpriority && <div className="error">{errors.Editpriority}</div>}
  </div>
</div>

          <div className="actions">
  {/* ADD: cancel button (does not change your Save button) */}
  <button
    type="button"
    className="btn-secondary"
    onClick={() => window.history.back()}
  >
    Cancel
  </button>

  <button className="btn-primary" type="submit">ບັນທຶກ</button>
</div>

        </form>

        {/* ADD: bottom-right remove link */}
<div className="danger-zone">
  <button type="button" className="remove-link" onClick={handleAskDelete}>
    {/* trash icon */}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
    </svg>
    ລົບໝວດໝູ່ນີ້
  </button>
</div>


      </main>

      {/* ADD: confirm modal */}
      {showConfirm && (
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-dialog">
            <div className="confirm-title">ຍືນຍັນການລົບໝວດໝູ່ສິນຄ້າ</div>
            <div className="confirm-actions">
              <button className="btn-ok" onClick={handleConfirmDelete}>OK</button>
              <button className="btn-secondary" onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
