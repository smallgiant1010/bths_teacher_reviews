import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "./App.css"
import Sidebar from "./components/sidebar"
import Home from "./pages/Home"

function App() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;