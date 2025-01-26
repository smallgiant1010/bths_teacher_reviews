import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "../css/Login.css"

const Login = ({ setSidebarVisible }) => {
    useEffect(() => {
        setSidebarVisible(false)
        return () => {
            setSidebarVisible(true)
        }
    }, [setSidebarVisible])

    return (
        <div className="login">
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                    <br />
                    <button type="submit">Login</button>
                </form>
                <Link to="/register">Don't have an account? Register here</Link>
            </div>
        </div>
    )
}

export default Login
