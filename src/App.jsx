import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ReportIssue from "./Pages/ReportIssue";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </div>
  );
}

export default App;
