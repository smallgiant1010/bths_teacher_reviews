import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "./App.css"
import Sidebar from "./components/sidebar"
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
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