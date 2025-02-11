import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useTeachersContext } from '../hooks/useTeachersContext'
import "../css/sidebar.css"

const Sidebar = ({ collapsed, setCollapsed }) => {
    const toggleSidebar = () => { setCollapsed(!collapsed) }
    const {logout} = useLogout();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {teachers} = useTeachersContext();
    const navigate = useNavigate()

    const handleAuthButton = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false)
            // Logout function that automatically removes cookies for both admin and regular user
            logout();
        } else {
            navigate('/login')
        }
    };

    const set = new Set()
    if (teachers) { 
        teachers.forEach(teacher => { set.add(teacher.category) })
    } 
    const categories = Array.from(set)

    return (
        <div id="sidebar" className={collapsed ? 'collapsed' : ''}>
            <button id="toggle-button" type="button" onClick={toggleSidebar}>
                {collapsed ? "→" : "←"}
            </button>
            
            {!collapsed && ( 
                <div className="sidebar-shortcuts"> 
                {categories.map(cat => (
                    <div key={`${cat}-shortcut`}><a href={`#${cat}`} >{cat}</a></div>
                ))} 
                </div> 
            )}
        </div>
    )
}

export default Sidebar