// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import CategoryDelete from "./components/Manageproduct/Delete/CategoryDelete";
import Category from "../src/components/Manageproduct/Category.js"; // Import the CSS file for styling
//import Navbar from "./components/Navigation/navbar";
import Brands from "./components/Manageproduct/Brand.js"; // Import the Brands component'
import CateDelete from "../src/components/Manageproduct/Delete/CategoryDelete"; // Import the CSS file for styling


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/brands" element={<Brands />} />
         <Route path="/catedelete" element={<CateDelete />} />
      </Routes>
    </Router>
  );
}
