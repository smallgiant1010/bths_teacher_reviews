import React from 'react'
import "./sidebar.css"
import { FaBars } from "react-icons/fa"
import { Link } from "react-router-dom"

function sidebar() {
  return (
    <div class="sidebar">
      <Link to="#" class="menu-bars">
        <FaBars/>
      </Link>
    </div>
  )
}

export default sidebar