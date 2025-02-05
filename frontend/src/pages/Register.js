import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSignup } from '../hooks/useSignup'
import "../css/Login.css"

const Register = ({ setSidebarVisible }) => {
    const {error, isLoading, signup} = useSignup();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(confirmPassword === password) {
            await signup(username, password);
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
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br />
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    <br />
                    {error ? <p>{error.error}</p> :<p></p>}
                    <button type="submit">{isLoading ? 'Registering...' : 'Register'}</button>
                </form>
                <Link to="/login">Already have an account? Login here</Link>
            </div>
        </div>
    )
}

export default Register
