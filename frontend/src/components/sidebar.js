import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom"

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const toggleSidebar = () => { setCollapsed(!collapsed) }

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
        <div id={`sidebar${collapsed?'collapsed':''}`}>
            <button type="button" onClick={toggleSidebar} id="menu-button">
                <CgMenu/> 
            </button>
            {!collapsed && ( 
                <div className="sidebar-shortcuts"> 
                {categories.map(cat => (
                    <div key={`${cat}-shortcut`}><Link to={cat}>{cat}</Link></div>
                ))} 
                </div> 
            )}
        </div>
    )
}

export default Sidebar