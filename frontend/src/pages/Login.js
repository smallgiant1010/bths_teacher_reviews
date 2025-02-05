import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLogin } from '../hooks/useLogin'
import "../css/Login.css"

const Login = ({ setSidebarVisible }) => {
    const {error, isLoading, userLogin} = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        await userLogin(username, password);
    }

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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    {error ? <p>{error.email}</p> : <p></p>}
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    {error ? <p>{error.password}</p> : <p></p>}
                    <br />
                    <button type="submit">{isLoading ? 'Logging In...' : 'Login'}</button>
                </form>
                <Link to="/register">Don't have an account? Register here</Link>
            </div>
        </div>
    )
}

export default Login
