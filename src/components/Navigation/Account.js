import React, { useState } from "react";
import "../../components/CSS/Account.css"; // Import the CSS file for styling
import { GrFormViewHide  } from "react-icons/gr";
import { BiShowAlt } from "react-icons/bi";
import Navbar from "./navbar";

export default function ProfileSecurityForm() {
      const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    token: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // 👁 state for each password visibility
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "ກະລຸນາໃສ່ຊື່";
    if (!form.surname.trim()) errs.surname = "ກະລຸນາໃສ່ນາມສະກຸນ";

    const wantsChange =
      form.currentPassword || form.newPassword || form.confirmPassword;

    if (wantsChange) {
      if (!form.currentPassword) errs.currentPassword = "ກະລຸນາໃສ່ລະຫັດເກົ່າ";
      if (!form.newPassword) errs.newPassword = "ກະລຸນາໃສ່ລະຫັດໃໝ່";
      if (form.newPassword && form.newPassword.length < 6)
        errs.newPassword = "ລະຫັດຢ່າງນ້ອຍ 6 ຕົວອັກສອນ";
      if (!form.confirmPassword)
        errs.confirmPassword = "ກະລຸນາຢືນຢັນລະຫັດໃໝ່";
      if (
        form.newPassword &&
        form.confirmPassword &&
        form.newPassword !== form.confirmPassword
      )
        errs.confirmPassword = "ລະຫັດບໍ່ຕົງກັນ";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    alert("Saved!");
    setSubmitted(false);
  };

  return (
    <div className={`wrapper${sidebarOpen ? " shifted" : ""}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <header className="page__topbar">
        <h1 className="userpage__title">ຂໍ້ມູນສ່ວນຕົວ</h1>
      </header>

      <main className="card">
        <form onSubmit={onSubmit} className="form">
          {/* ——— Personal Info ——— */}
          <div className="section-title">ຂໍ້ມູນສ່ວນຕົວ</div>

          <div className="row">
            <label htmlFor="name" className="label">
              ຊື່ <span className="req">*</span>
            </label>
            <div className="control">
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                className={`input ${submitted && errors.name ? "invalid" : ""}`}
              />
              {submitted && errors.name && (
                <div className="error">{errors.name}</div>
              )}
            </div>
          </div>

          <div className="row">
            <label htmlFor="surname" className="label">
              ນາມສະກຸນ <span className="req">*</span>
            </label>
            <div className="control">
              <input
                id="surname"
                name="surname"
                value={form.surname}
                onChange={onChange}
                className={`input ${
                  submitted && errors.surname ? "invalid" : ""
                }`}
              />
              {submitted && errors.surname && (
                <div className="error">{errors.surname}</div>
              )}
            </div>
          </div>

              <div className="row">
            <label htmlFor="token" className="label">
              Line Token
            </label>
            <div className="control">
              <input
                id="token"
                name="token"
                value={form.token}
                onChange={onChange}
                className={`input ${
                  submitted && errors.token ? "invalid" : ""
                }`}
                placeholder="................................"
              />
            </div>
          </div>

          {/* ——— Change Password ——— */}
          <div className="section-title mt-24">ປ່ຽນລະຫັດຜ່ານ</div>

          {[
            { id: "currentPassword", label: "ລະຫັດເກົ່າ" },
            { id: "newPassword", label: "ລະຫັດໃໝ່" },
            { id: "confirmPassword", label: "ຢືນຢັນລະຫັດໃໝ່" },
          ].map((field) => (
            <div className="row">
  <label htmlFor={field.id} className="label">
    {field.label} <span className="req">*</span>
  </label>
  <div className="control">
    <div className="input-wrap">
      <input
        type={showPassword[field.id] ? "text" : "password"}
        id={field.id}
        name={field.id}
        value={form[field.id]}
        onChange={onChange}
        className={`input ${submitted && errors[field.id] ? "invalid" : ""}`}
      />
      <button
        type="button"
        className="toggle-password"
        onClick={() => toggleShow(field.id)}
      >
        {showPassword[field.id] ? <GrFormViewHide /> : <BiShowAlt />}
      </button>
    </div>

    {/* error BELOW the input */}
    {submitted && errors[field.id] && (
      <div className="error">{errors[field.id]}</div>
    )}
  </div>
</div>
          ))}

          <div className="actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              ບັນທຶກ
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
