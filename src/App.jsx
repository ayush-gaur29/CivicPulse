import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import ReportIssue from "./Pages/ReportIssue";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import { ThemeProvider } from "./Context/ThemeContext";
import { ToastProvider } from "./Components/ui/Toast";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-500/20 selection:text-blue-700 dark:selection:text-blue-300">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
