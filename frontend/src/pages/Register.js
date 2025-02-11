import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSignup } from '../hooks/useSignup'
import "../css/Login.css"

const Register = ({ setSidebarVisible }) => {
    const { error, isLoading, signup } = useSignup()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (confirmPassword === password) {
            await signup(username, password)
        }
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
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input 
                            className="input" 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Username" 
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
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input 
                            className="input" 
                            type="password" 
                            id="confirm-password" 
                            name="confirm-password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error ? <p>{error.error}</p> : <p></p>}
                    <input className="submit-login" type="submit" value={isLoading ? 'Registering...' : 'Register'} />
                    <span className="span">Already have an account? <Link to="/login">Login here</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Register
