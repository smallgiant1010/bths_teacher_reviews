import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./css/App.css"
import Sidebar from "./components/sidebar.js"
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"
import Error404 from "./pages/PageNotFound.js"
import AdminDashboard from "./pages/AdminDashboard.js"

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <div className="App">
      <BrowserRouter>
      {sidebarVisible && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
        <div className={`pages ${!sidebarVisible ? 'invisible' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setSidebarVisible={setSidebarVisible} />} />
            <Route path="/register" element={<Register setSidebarVisible={setSidebarVisible} />} />
            <Route path="/admin" element={ <AdminDashboard />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App