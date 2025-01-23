import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "./css/App.css"
import Sidebar from "./components/sidebar.js"
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Error404 from "./pages/PageNotFound.js"
import TeacherDetails from "./pages/TeacherDetails.js"
import AdminDashboard from "./pages/AdminDashboard.js"
import { AuthContextProvider, AuthContext } from "./context/AuthContext.js"


function App() {
 const [collapsed, setCollapsed] = useState(false)
 return (
   <div className="App">
     <BrowserRouter>
     <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
       <div className="pages">
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route
             path="/teacher/:id"
             element={
               role === 'LOGIN' ? <TeacherDetails /> : <Navigate to="/login" />
             }
           />
           <Route
             path="/admin"
             element={
               role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />
             }
           />
           <Route path="*" element={<Error404 />} />
         </Routes>
       </div>
     </BrowserRouter>
   </div>
 )
}
function MainApp() {
 return (
     <AuthContextProvider>
         <App />
     </AuthContextProvider>
 );
}


export default MainApp;