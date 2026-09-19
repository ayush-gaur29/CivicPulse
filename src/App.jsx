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
import { NotificationProvider } from "./Context/NotificationContext";

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500/20 selection:text-cyan-300">
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
        </NotificationProvider>
      </ThemeProvider>
    );
  }

export default App;
