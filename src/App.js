// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import Category from "../src/components/Navigation/Manageproduct/Category.js"; // Import the CSS file for styling
//import Navbar from "./components/Navigation/navbar";
import Brands from "./components/Navigation/Manageproduct/Brand.js"; // Import the Brands component'
import CateDelete from "./components/Delete/CategoryDelete.js"; // Import the CSS file for styling
import CateIncrease from "./components/Increase/CategoryIncrease"; // Import the CSS file for styling
import CateEdit from "../src/components/Edit/CateEdit"; // Import the CSS file for styling
import Account from "./components/Navigation/Account.js"; // Import the User component
import Overview from "./components/Navigation/Warehouse/Overview.js";
import Costmanagement from "./components/Navigation/Warehouse/Costmanagement";
import Import from "./components/Navigation/Warehouse/Import.js";
import WithdrawalTransfer from "./components/Navigation/Warehouse/Withdrawal_transfer";
import History from "./components/Navigation/Warehouse/View_history.js"
import CycleCount from "./components/Navigation/Warehouse/Cycle_count.js";
import Warehouse from "./components/Navigation/Warehouse/Warehouse.js";
import Login from "./view/Login.js"
import Signup from "./view/Sign.js"
import BrandIN from "./components/Increase/BrandIncrease.js"
import BranEdit from "./components/Edit/BrandEdit.js"
import Product from "./components/Navigation/Manageproduct/Products"
import ProductIncrease from "./components/Increase/ProductIncrease.js"
import WareIn from "./components/Increase/WareIncrease.js"
import WareEdit from "./components/Edit/WareEdit.js";




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/catedelete" element={<CateDelete />} />
        <Route path="/cateincrease" element={<CateIncrease />} />
        <Route path="/cateEdit" element={<CateEdit />} />
        <Route path="/account" element={<Account />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/import" element={<Import />} />
        <Route path="/costmanagement" element={<Costmanagement />} />
        <Route path="/withdrawalTransfer" element={<WithdrawalTransfer />} />
        <Route path="/history" element={<History />} />
        <Route path="/cyclecount" element={<CycleCount />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/brandincrease" element={<BrandIN />} />
        <Route path="/branedit" element={<BranEdit />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productincrease" element={<ProductIncrease />} />
        <Route path="/wareincrease" element={<WareIn />} />
        <Route path="/wareedit" element={<WareEdit />} />
      </Routes>
    </Router>
  );
}
