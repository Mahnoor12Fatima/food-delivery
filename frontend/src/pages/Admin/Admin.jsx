import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "../../components/Sidebar/Sidebar";

import List from "../List/List";
import Add from "../Add/Add";
import Edit from "../Edit/Edit";
import Orders from "../Orders/Orders";

const App = () => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />


      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-100px)]">
            <Routes>
              <Route index element={<List url={url} />} />
              <Route path="list" element={<List url={url} />} />
              <Route path="add" element={<Add url={url} />} />
              <Route path="edit/:id" element={<Edit url={url} />} />
              <Route path="orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;