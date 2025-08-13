import React, { useEffect, useRef, useState} from "react";
import { IoIosList } from "react-icons/io";
import { RiArrowDropDownLine,RiLogoutBoxRLine } from "react-icons/ri";
import {
  FaHome, FaBoxes, FaWarehouse,FaUser, FaKey} from "react-icons/fa";
import { Link, NavLink, useLocation,useNavigate} from "react-router-dom";
import "../CSS/navbar.css"; // CSS styles for the navbar

const NAV = [
  { label: "ໜ້າຫຼັກ", icon: FaHome, to: "/" },
  {
    label: "ຈັດການສິນຄ້າ",
    icon: FaBoxes,
    children: [
      { label: "ໝວດໝູ່ສິນຄ້າ", to: "/categories",  },
      { label: "ແບຣນ",         to: "/brands",  },
      { label: "ສິນຄ້າ",          to: "/products",},
    ],
  },
  {
    label: "ຈັດການຄັງສິນຄ້າ",
    icon: FaWarehouse,
    children: [
      { label: "ພາບລວມ",            to: "/inventory/overview",   },
      { label: "ຈັດການຕົ້ນທຸນ",        to: "/inventory/cost",       },
      { label: "ເບິກອອກ/ຍ້າຍຄັງ",    to: "/inventory/transfer",  },
      { label: "ເບິ່ງປະຫວັດ",          to: "/inventory/history",    },
      { label: "Cycle Count",       to: "/inventory/cycle-count",  },
      { label: "ຄັງສິນຄ້າ",         to: "/inventory/warehouses",   },
    ],
  },
];

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const { pathname } = useLocation();

  /** sync header height -> CSS var */
  useEffect(() => {
    const setHeaderVar = () => {
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight || 72;
        document.documentElement.style.setProperty("--header-h", `${h}px`);
      }
    };
    setHeaderVar();
    window.addEventListener("resize", setHeaderVar);
    return () => window.removeEventListener("resize", setHeaderVar);
  }, []);

  /** ดันเนื้อหา (desktop เท่านั้น) เมื่อ sidebar เปิด */
  useEffect(() => {
    const main = document.querySelector(".main");
    if (!main) return;
    if (sidebarOpen && window.innerWidth >= 768) main.classList.add("shifted");
    else main.classList.remove("shifted");
  }, [sidebarOpen]);

  /** Accordion: เปิดได้ทีละกลุ่ม */
  const [openGroup, setOpenGroup] = useState(null);
  useEffect(() => {
    const match = NAV.find(g => g.children?.some(c => pathname.startsWith(c.to)));
    setOpenGroup(match?.label ?? null);
  }, [pathname]);

    // ✅ dropdown ผู้ใช้
  const userRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  //const { pathname } = useLocation();
  const navigate = useNavigate();

  //ปิด sidebar & user menu เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(".menu-icon")
      ) setSidebarOpen(false);

      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    const handleEsc = (e) => e.key === "Escape" && (setSidebarOpen(false), setUserOpen(false));
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setSidebarOpen]);
  const handleLogout = () => {
    setUserOpen(false);
    // TODO: ใส่ลอจิก logout จริง
    navigate("/login");
  };
  return (
    <>
      <header ref={headerRef} className="header">
        <div className="left">
          <IoIosList
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="menu-icon"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSidebarOpen(p => !p)}
          />
          <h1 className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-u">U</span>
              <span className="text-black">Lao</span>
              <span className="Dev">Dev</span>
            </Link>
          </h1>
        </div>
         {/* ✅ User dropdown */}
        <div className="user" ref={userRef}>
          <button
            className={`user-btn ${userOpen ? "open" : ""}`}
            onClick={() => setUserOpen(v => !v)}
            aria-haspopup="menu"
            aria-expanded={userOpen}
          >
            <span>Super Admin</span>
            <RiArrowDropDownLine className="drop-icon" />
          </button>

          <div className={`user-menu ${userOpen ? "open" : ""}`} role="menu">
            <button className="user-item" onClick={() => { setUserOpen(false); navigate("/account"); }}>
              <FaUser /><span>ຂໍ້ມູນສ່ວນໂຕ</span>
            </button>
            <button className="user-item" onClick={() => { setUserOpen(false); navigate("/change-password"); }}>
              <FaKey /><span>ປ່ຽນລະຫັດຜ່ານ</span>
            </button>
            <div className="user-divider" />
            <button className="user-item danger" onClick={handleLogout}>
              <RiLogoutBoxRLine /><span>ອອກຈາກລະບົບ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar list menu left */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
      >
        <ul className="menu-list">
          {NAV.map((item) =>
            item.children ? (
              <li key={item.label} className="menu-group">
              <button
                className={`menu-item menu-group-btn ${
                  item.children.some(c => pathname.startsWith(c.to)) ? "active-root" : ""
                }`}
                onClick={() => setOpenGroup(g => (g === item.label ? null : item.label))}
                aria-expanded={openGroup === item.label}
              >
                <span className="mi-left">
                  <item.icon />
                  <span>{item.label}</span>
                </span>
                <span className={`mi-right ${openGroup === item.label ? "open" : ""}`}>
                  {openGroup === item.label ? "−" : "+"}
                </span>
              </button>

              {/* ⬇️ อยู่ตลอด แต่สลับ class */}
                <ul className={`submenu ${openGroup === item.label ? "open" : ""}`}>
                  {item.children.map((c) => (
                    <li key={c.to}>
                      <NavLink
                        to={c.to}
                        className={({ isActive }) => `submenu-link ${isActive ? "active" : ""}`}
                      >
                        {c.icon && <c.icon className="sub-ic" />}
                        <span className="dash">–</span>
                        <span>{c.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      </aside>
    </>
  );
}