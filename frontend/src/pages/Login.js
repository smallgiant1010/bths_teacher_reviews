import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from '../hooks/useLogin'
import "../css/Login.css"

const Login = ({ setSidebarVisible }) => {
    const { error, isLoading, userLogin } = useLogin()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await userLogin(username, password)
    }

    useEffect(() => {
        setSidebarVisible(false)
        return () => {
            setSidebarVisible(true)
        }
    }, [setSidebarVisible])

    return (
        <div className="login">
            <button className="back-to-home" onClick={() => navigate('/')}>← &nbsp;Back to Home</button>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input 
                            className="input" 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter Username" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    {error ? <p>{error.email}</p> : <p></p>}
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            className="input" 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error ? <p>{error.password}</p> : <p></p>}
                    <input className="submit-login" type="submit" value={isLoading ? 'Logging In...' : 'Login'} />
                    <span className="span">Don't have an account? <Link to="/register">Sign up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
