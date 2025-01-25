import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./css/App.css"
import Sidebar from "./components/sidebar.js"
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Error404 from "./pages/PageNotFound.js"
import TeacherDetails from "./pages/TeacherDetails.js"
import AdminDashboard from "./pages/AdminDashboard.js"

function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacher/:id" element={ <TeacherDetails />} />
            <Route path="/admin" element={ <AdminDashboard />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App;