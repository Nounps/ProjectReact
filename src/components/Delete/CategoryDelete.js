import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbRestore } from "react-icons/tb"; 

import Navbar from "../Navigation/navbar";
// import { listCate, createCate, updateCate, deleteCate} from "../api/categories";
// import { urlFor } from "../api/client";
 // CSS สำหรับแบรนด์
import "../CSS/CateDelete.css";


export default function CategoryDeletePage() {
    const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null); // object | null
const [sidebarOpen, setSidebarOpen] = useState(false); 
const [confirm, setConfirm] = useState({ open: false, row: null });



  useEffect(() => {
    // Simulate fetch
    setLoading(true);
    setTimeout(() => {
      // Example mock data so you can see the layout working
      setRows([
        {
          id: 1,
          parentName: "ອຸປະກອນອີເລັກໂທຣນິກ",
          nameLa: "ສາຍຊາດ",
          nameEn: "Charger Cable",
          priority: 2,
          productCount: 37,
        },
        {
          id: 2,
          parentName: "ສິນຄ້າອຸປະໂພກ",
          nameLa: "ກະດາດທຳຄວາມສະອາດ",
          nameEn: "Tissue",
          priority: 1,
          productCount: 12,
        },
      ]);
      setErr("");
      setLoading(false);
    }, 250);
  }, []);

  function ConfirmDialog({ open, title, okText="OK", cancelText="Cancel", onOK, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2 className="modal__title">{title}</h2>
        <div className="modal__actions">
          <button className="btn btn--primary" onClick={onOK} autoFocus>{okText}</button>
          <button className="btn btn--ghost" onClick={onCancel}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
}


  function openConfirm(row) { setConfirm({ open: true, row }); }
function closeConfirm()   { setConfirm({ open: false, row: null }); }

async function handleRestore() {
  // TODO: เรียก API กู้คืนจริง เช่น await restoreCategory(confirm.row.id)
  // เดโม่: ลบออกจาก list ชั่วคราวเหมือนกู้คืนแล้ว
  setRows(prev => prev.filter(r => r.id !== confirm.row.id));
  closeConfirm();
}

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
    <div className={`delete-wrapper${sidebarOpen ? " shifted" : ""}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section className="card">
        <header className="card__header">
  <button className="back" type="button" onClick={() => window.history.back()} aria-label="Back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="11"/>
            <polyline points="12 8 8 12 12 16"/>
            <line x1="16" y1="12" x2="8" y2="12"/>
          </svg>
        </button>

  <h1 className="card__title">
    ລາຍການໝວດໝູ່ສິນຄ້າທີ່ຖຶກລົບ <span className="muted">(ພົບ {rows.length} ລາຍການ)</span>
  </h1>

  <nav className="space breadcrumb" aria-label="breadcrumb">
    <span style={{ color: "#f06f19", cursor: "pointer" }} onClick={() => navigate("/categories")}>ໝວດໝູ່ສິນຄ້າ</span>
    <span className="sep">›</span>
    <span className="current">ທີ່ຖຶກລົບ</span>
  </nav>
</header>


        <div className="table-wrap">
          {err && <div style={{color:"#c00", padding:"12px 16px"}}>{err}</div>}
          <table className="Cate-table">
        <thead>
  <tr>
    <th className="col-idx">#</th>
    <th>ໝວດໝູ່ຫຼັກ</th>
    <th>ຊື່ພາສາລາວ</th>
    <th>ຊື່ພາສາອັງກິດ</th>
    <th>ລຳດັບຄວາມສຳຄັນ</th>
    <th>ຈຳນວນສິນຄ້າ</th>
    <th className="col-actions-hdr" aria-label="actions"></th>
  </tr>
</thead>

<tbody>
  {loading ? (
    <tr><td colSpan={7} className="empty-cell">ກຳລັງໂຫຼດ…</td></tr>
  ) : rows.length === 0 ? (
    <tr><td colSpan={7} className="empty-cell">ຍັງບໍ່ມີຂໍ້ມູນ</td></tr>
  ) : rows.map((b, i) => (
    <tr key={b.id}>
      <td data-label="#" className="col-index"><span className="cell-value">{i + 1}</span></td>
      <td data-label="ໝວດໝູ່ຫຼັກ" className="col-name"><span className="cell-value">{b.parentName}</span></td>
      <td data-label="ຊື່ພາສາລາວ"><span className="cell-value">{b.nameLa}</span></td>
      <td data-label="ຊື່ພາສາອັງກິດ"><span className="cell-value">{b.nameEn}</span></td>
      <td data-label="ລຳດັບຄວາມສຳຄັນ"><span className="cell-value">{b.priority}</span></td>
      <td data-label="ຈຳນວນສິນຄ້າ"><span className="cell-value">{b.productCount}</span></td>
<td className="col-actions" data-label="ຈັດການ">
  <div className="row-actions">
    <button
  type="button"
  className="icon-btn icon-btn--refresh"
  title="ກູ້ຄືນ"
  onClick={() => openConfirm(b)}   // <-- เปลี่ยนเป็นเรียก openConfirm
  aria-label="Restore category"
>
  <TbRestore size={20} />
</button>
  </div>
</td>

    </tr>
  ))}
</tbody>

          </table>
        </div>
      </section>

      {/* {openForm && (
        <CateFormModal
          initial={editing}
          onClose={() => setOpenForm(false)}
        //   onSaved={() => { setOpenForm(false); fetchRows(); }}
        />
      )} */}

      <ConfirmDialog
  open={confirm.open}
  title="ຢືນຢັນການຄືນຄ່າໝວດໝູ່ສິນຄ້າ"
  okText="OK"
  cancelText="Cancel"
  onOK={handleRestore}
  onCancel={closeConfirm}
/>

    </div>
  );
}

/* ===== โมดัลฟอร์มเพิ่ม/แก้ไข ===== */
// function CateFormModal({ initial, onClose, onSaved }) {
//   const [name, setName] = useState(initial?.name || "");
//   const [submitting, setSubmitting] = useState(false);



//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return alert("กรอกชื่อแบรนด์");
//     setSubmitting(true);
//     try {
//     //   if (initial) await updateCate(initial.id, { name, imageFile: file || undefined });
//     //   else await createCate({ name, imageFile: file || undefined });
//     //   onSaved();
//     // } catch (e) {
//       alert(e?.message || "บันทึกไม่สำเร็จ");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={backdrop}>
//       <div style={modal}>
//         <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
//           <h3 style={{margin:0}}>{initial ? "แก้ไขแบรนด์" : "เพิ่มแบรนด์"}</h3>
//           <button onClick={onClose} style={iconBtn}><FiX/></button>
//         </div>

//         <form onSubmit={onSubmit}>
//           <label className="lbl">ชื่อแบรนด์</label>
//           <input className="inp" value={name} onChange={(e)=>setName(e.target.value)} placeholder="เช่น LaoDev" />

//           <div style={{display:"flex", gap:8, justifyContent:"flex-end", marginTop:18}}>
//             <button type="button" onClick={onClose} className="btn-secondary">ยกเลิก</button>
//             <button className="btn-primary" disabled={submitting}>{submitting ? "กำลังบันทึก…" : "บันทึก"}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

/* ===== inline styles สั้น ๆ สำหรับโมดัล ===== */
// const backdrop = {
//   position:"fixed", inset:0, background:"rgba(0,0,0,.35)",
//   display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
// };
// const modal = { background:"#fff", width:420, maxWidth:"90vw", borderRadius:12, padding:16, boxShadow:"0 10px 25px rgba(0,0,0,.2)" };
// const iconBtn = { background:"transparent", border:0, fontSize:20, cursor:"pointer" };