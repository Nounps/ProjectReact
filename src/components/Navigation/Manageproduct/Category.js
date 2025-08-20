import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoTimeOutline, IoAdd } from "react-icons/io5";
import Navbar from "../../Navigation/navbar";
import { useNavigate } from "react-router-dom";
import "../../CSS/Category.css"; // CSS สำหรับแบรนด์

export default function CategoryPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  // const [openForm, setOpenForm] = useState(false);
  // const [editing, setEditing] = useState(null); // object | null
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: connect your API and replace this mock
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

  // const onEdit = (row) => {
  //   setEditing(row);
  //   setOpenForm(true);
  //   // navigate(`/categories/${row.id}/edit`) // if you want page navigation instead of modal
  // };

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <section className="Catecard">
        <header className="Catecard__header">
          <h2 className="Catecard__title">
            ລາຍການໝວດໝູ່ສິນຄ້າ{" "}
            <span className="muted">(ພົບ {rows.length} ລາຍການ)</span>
          </h2>

          <div className="actions-stack">
            <button
              className="fab fab--secondary"
              onClick={() => navigate("/catedelete")}
            >
              <IoTimeOutline className="fab__icon" />
              <span className="fab__label">ທີ່ຖຶກລົບ</span>
            </button>

            <button
              className="fab fab--primary"
              onClick={() => navigate("/cateincrease")}
            >
              <IoAdd className="fab__icon" />
              <span className="fab__label">ເພີ່ມ</span>
            </button>
          </div>
        </header>

        <div className="table-wrap">
          {err && (
            <div style={{ color: "#c00", padding: "12px 16px" }}>{err}</div>
          )}

          <table className="Cate-table">
            <thead>
              <tr>
                <th style={{ minWidth: 100 }}>#</th>
                <th style={{ minWidth: 100 }}>ໝວດໝູ່ຫຼັກ</th>
                <th style={{ minWidth: 100 }}>ຊື່ພາສາລາວ</th>
                <th style={{ minWidth: 100 }}>ຊື່ພາສາອັງກິດ</th>
                <th style={{ minWidth: 100 }}>ລຳດັບຄວາມສຳຄັນ</th>
                <th style={{ minWidth: 100 }}>ຈຳນວນສິນຄ້າ</th>
                <th style={{ minWidth: 120 }}></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    ກຳລັງໂຫຼດ……
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    ຍັງບໍ່ມີຂໍ້ມູນ
                  </td>
                </tr>
              ) : (
                rows.map((b, i) => (
                  <tr key={b.id}>
                   <td data-label="#"><span className="cell-value">{i + 1}</span></td>
<td data-label="ໝວດໝູ່ຫຼັກ"><span className="cell-value">{b.parentName}</span></td>
<td data-label="ຊື່ພາສາລາວ"><span className="cell-value">{b.nameLa}</span></td>
<td data-label="ຊື່ພາສາອັງກິດ"><span className="cell-value">{b.nameEn}</span></td>
<td data-label="ລຳດັບຄວາມສຳຄັນ"><span className="cell-value">{b.priority}</span></td>
<td data-label="ຈຳນວນສິນຄ້າ"><span className="cell-value">{b.productCount}</span></td>

<td className="col-actions" data-label="ຈັດການ">
                      <div className="row-actions">
                        <button
                          className="edit-btn"
                          title="ແກ້ໄຂ"
                          onClick={() => navigate("../cateEdit")}
                        >
                          <FiEdit2 />
                        </button>
                        {/* If you need delete later:
                        <button className="edit-btn" style={{background:'#ef4444',color:'#fff'}} onClick={() => onDelete(b)}>
                          <FiTrash2/>
                        </button>
                        */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* If you keep a modal form, render it here */}
      {/* {openForm && (
        <CateFormModal
          initial={editing}
          onClose={() => setOpenForm(false)}
          onSaved={() => { setOpenForm(false); /* fetchRows(); */ /*}}
        />
      )} */}
    </div>
  );
}
