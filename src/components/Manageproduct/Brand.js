import React, { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { IoTimeOutline, IoAdd } from "react-icons/io5";
import Navbar from "../Navigation/navbar";
// import { listBrands, createBrand, updateBrand, deleteBrand } from "../api/brands";
// import { urlFor } from "../api/client";
import '../CSS/Brand.css' // CSS สำหรับแบรนด์

export default function BrandsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null); // object | null
const [sidebarOpen, setSidebarOpen] = useState(false); 

//   const fetchRows = async () => {
//     setLoading(true);
//     setErr("");
//     try {
//       const data = await listBrands(); // backend คืนเป็น array
//       setRows(Array.isArray(data) ? data : data.items || []);
//     } catch (e) {
//       setErr(e?.message || "โหลดข้อมูลไม่สำเร็จ");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchRows(); }, []);

  const onAdd = () => { setEditing(null); setOpenForm(true); };
  const onEdit = (row) => { setEditing(row); setOpenForm(true); };

//   const onDelete = async (row) => {
//     if (!window.confirm(`ลบแบรนด์ “${row.name}” ?`)) return;
//     try {
//       await deleteBrand(row.id);
//       fetchRows();
//     } catch (e) {
//       alert(e?.message || "ลบไม่สำเร็จ");
//     }
//   };

  return (
    <div className="main">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section className="card">
        <header className="card__header">
          <h2 className="card__title">
            รายการแบรนด์ <span className="muted">(พบ {rows.length} รายการ)</span>
          </h2>
          <div className="actions-stack">
            <button className="fab fab--secondary" onClick={() => alert("TODO: ไปหน้า/โมดัลถังขยะ")}>
              <IoTimeOutline className="fab__icon" /><span className="fab__label">ที่ถูกลบ</span>
            </button>
            <button className="fab fab--primary" onClick={onAdd}>
              <IoAdd className="fab__icon" /><span className="fab__label">เพิ่ม</span>
            </button>
          </div>
        </header>

        <div className="table-wrap">
          {err && <div style={{color:"#c00", padding:"12px 16px"}}>{err}</div>}
          <table className="brand-table">
            <thead>
              <tr>
                <th style={{ minWidth: 60 }}>#</th>
                <th>ชื่อแบรนด์</th>
                <th style={{ minWidth: 220 }}>รูป</th>
                <th style={{ minWidth: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="empty-cell">กำลังโหลด…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={4} className="empty-cell">ยังไม่มีข้อมูล</td></tr>
              ) : rows.map((b, i) => (
                <tr key={b.id}>
                  <td className="col-index" data-label=""> {i + 1} </td>

                  <td className="col-name" data-label="ชื่อแบรนด์">
                    <span className="name-ellipsis">{b.name}</span>
                  </td>

                  {/* <td className="col-image" data-label="รูป">
                    {b.imageUrl ? (
                      <img className="brand-img" src={urlFor(b.imageUrl)} alt={b.name} />
                    ) : (<div className="img-placeholder">ไม่มีรูป</div>)}
                  </td> */}

                  <td className="col-actions" data-label="การจัดการ">
                    <div className="row-actions">
                      <button className="edit-btn" title="แก้ไข" onClick={() => onEdit(b)}><FiEdit2/></button>
                      {/* <button className="edit-btn" title="ลบ" style={{background:"#ef4444", color:"#fff"}} onClick={() => onDelete(b)}>
                        <FiTrash2/>
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {openForm && (
        <BrandFormModal
          initial={editing}
          onClose={() => setOpenForm(false)}
        //   onSaved={() => { setOpenForm(false); fetchRows(); }}
        />
      )}
    </div>
  );
}

/* ===== โมดัลฟอร์มเพิ่ม/แก้ไข ===== */
function BrandFormModal({ initial, onClose, onSaved }) {
  const [name, setName] = useState(initial?.name || "");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

//   const preview = useMemo(
//     () => file ? URL.createObjectURL(file) : (initial?.imageUrl ? urlFor(initial.imageUrl) : ""),
//     [file, initial]
//   );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("กรอกชื่อแบรนด์");
    setSubmitting(true);
    try {
    //   if (initial) await updateBrand(initial.id, { name, imageFile: file || undefined });
    //   else await createBrand({ name, imageFile: file || undefined });
    //   onSaved();
    // } catch (e) {
      alert(e?.message || "บันทึกไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={backdrop}>
      <div style={modal}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <h3 style={{margin:0}}>{initial ? "แก้ไขแบรนด์" : "เพิ่มแบรนด์"}</h3>
          <button onClick={onClose} style={iconBtn}><FiX/></button>
        </div>

        <form onSubmit={onSubmit}>
          <label className="lbl">ชื่อแบรนด์</label>
          <input className="inp" value={name} onChange={(e)=>setName(e.target.value)} placeholder="เช่น LaoDev" />

          <label className="lbl">รูปภาพ (ไม่บังคับ)</label>
          <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
          {/* {preview && <img src={preview} alt="preview" style={{marginTop:10, maxHeight:140, borderRadius:6}} />} */}

          <div style={{display:"flex", gap:8, justifyContent:"flex-end", marginTop:18}}>
            <button type="button" onClick={onClose} className="btn-secondary">ยกเลิก</button>
            <button className="btn-primary" disabled={submitting}>{submitting ? "กำลังบันทึก…" : "บันทึก"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===== inline styles สั้น ๆ สำหรับโมดัล ===== */
const backdrop = {
  position:"fixed", inset:0, background:"rgba(0,0,0,.35)",
  display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
};
const modal = { background:"#fff", width:420, maxWidth:"90vw", borderRadius:12, padding:16, boxShadow:"0 10px 25px rgba(0,0,0,.2)" };
const iconBtn = { background:"transparent", border:0, fontSize:20, cursor:"pointer" };