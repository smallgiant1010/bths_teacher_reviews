import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "../css/Login.css"

const Register = ({ setSidebarVisible }) => {
    useEffect(() => {
        setSidebarVisible(false)
        return () => {
            setSidebarVisible(true)
        }
    }, [setSidebarVisible])

    return (
        <div className="login">
            <div className="login-container">
                <h2>Register</h2>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                    <br />
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" />
                    <br />
                    <button type="submit">Register</button>
                </form>
                <Link to="/login">Already have an account? Login here</Link>
            </div>
        </div>
    )
}

export default Register
