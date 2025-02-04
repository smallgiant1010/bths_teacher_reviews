import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import "../css/sidebar.css"

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const {logout} = useLogout();
    const toggleSidebar = () => { setCollapsed(!collapsed) }

    const [isLoggedIn, setIsLoggedIn] = useState(false)
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

    const [teachers, get_all_teachers] = useState(null)
        useEffect(() => {
            const fetchTeachers = async () => {
                try { 
                    const response = await fetch("/api/teachers/") 
                    const content = await response.json() 
                    if (response.ok) {
                        console.log("Fetched teachers: ", content)
                        get_all_teachers(content)
                    } else { 
                        console.error("Failed to fetch teachers")
                    } 
                } catch (error) { 
                    console.error("Error fetching teachers: ", error)
                }
            }
           
            fetchTeachers()
        }, [])
    
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