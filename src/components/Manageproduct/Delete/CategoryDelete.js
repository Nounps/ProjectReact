import React, { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { PiGreaterThanBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Navigation/navbar";
// import { listCate, createCate, updateCate, deleteCate} from "../api/categories";
// import { urlFor } from "../api/client";
 // CSS สำหรับแบรนด์
import "../../CSS/CateDelete.css";


export default function CategoryDeletePage() {
    const navigate = useNavigate();
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
//       const data = await listCategories(); // backend คืนเป็น array
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
//       await deleteCate(row.id);
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
            ລາຍການໝວດໝູ່ສິນຄ້າ <span className="muted">(ພົບ {rows.length} ລາຍການ)</span>
          </h2>
          <div className="actions-stack">
        <h6 style={{ color: "#f06f19", cursor: "pointer" }} onClick={() => navigate("/categories")}>
  ໝວດໝູ່ສິນຄ້າ
</h6>
        <PiGreaterThanBold style={{ margin: "25px 0px", verticalAlign: "middle" }} />
        <h6 > ທີ່ຖືກລົບ</h6>
          </div>
        </header>

        <div className="table-wrap">
          {err && <div style={{color:"#c00", padding:"12px 16px"}}>{err}</div>}
          <table className="Cate-table">
            <thead>
              <tr>
                <th style={{ minWidth: 100 }}>#</th>
                <th style={{ minWidth: 100 }}>ໝວດໝູ່ຫຼັກ</th>
                <th style={{ minWidth: 100 }}>ຊື່ພາສາລາວ</th>
                <th style={{ minWidth: 100 }}>ຊື່ພາສາອັງກິດ</th>
                <th style={{ minWidth: 100 }}>ລຳດັບຄວາມສຳຄັນ</th>
                <th style={{ minWidth: 100 }}>ຈຳນວນສິນຄ້າ</th>
                <th style={{ minWidth: 100 }}></th>
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
        <CateFormModal
          initial={editing}
          onClose={() => setOpenForm(false)}
        //   onSaved={() => { setOpenForm(false); fetchRows(); }}
        />
      )}
    </div>
  );
}

/* ===== โมดัลฟอร์มเพิ่ม/แก้ไข ===== */
function CateFormModal({ initial, onClose, onSaved }) {
  const [name, setName] = useState(initial?.name || "");
  const [submitting, setSubmitting] = useState(false);



  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("กรอกชื่อแบรนด์");
    setSubmitting(true);
    try {
    //   if (initial) await updateCate(initial.id, { name, imageFile: file || undefined });
    //   else await createCate({ name, imageFile: file || undefined });
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