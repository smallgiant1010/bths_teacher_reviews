import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./css/App.css"
import Sidebar from "./components/sidebar.js"
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"
import Error404 from "./pages/PageNotFound.js"
import AdminDashboard from "./pages/AdminDashboard.js"
import { useTeachersContext } from './hooks/useTeachersContext.js'

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useTeachersContext();

  // Using this to make sure that we dont needa repeatedly call this API Call
  React.useEffect(() => {
    const fetchTeachers = async () => {
        try { 
            const response = await fetch("/api/teachers/") 
            const content = await response.json() 
            if (response.ok) {
                console.log("Fetched teachers: ", content)
                dispatch({ type: "SET_TEACHERS" , payload: content});
            } else { 
                console.error("Failed to fetch teachers")
            } 
        } catch (error) { 
            console.error("Error fetching teachers: ", error)
        } finally {
          setLoading(false);
        }
      }
      
      fetchTeachers()
  }, [dispatch]);

  // Make Animation for waiting for the page to load.
  if(loading) {
    return <div>Loading...</div>
  }

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