// import { Link } from "react-router-dom"
import { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function LoginUser(event: { preventDefault: () => void }) {
        event.preventDefault()
        const response = await fetch('http://localhost:6969/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()

        if (data.status === 'ok') {
            localStorage.setItem('token', data.token);
            alert('Login Successfull');
            navigate('/dashboard')
        } else {
            alert('Please check your username and password')
        }

        console.log(data)
    }

    return (
        <div className="Login">
            <div className="login-container">
                <div className="login-head">
                    &nbsp;Sign In
                    <div className="go-back">
                        <Link to = "/">
                            <img width="35" height="35" src="https://img.icons8.com/ios/100/ffffff/circled-left-2.png" alt="circled-left-2" />
                        </Link>
                    </div>
                </div>
                <div className="login-form">
                    <form onSubmit={LoginUser}>
                        <input
                            className="login-form-input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            required
                        />
                        <input
                            className="login-form-input"
                            type="password"
                            id="passwd"
                            name="passwd"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required
                        />
                        <p className="login-form-frgt-psswd">Forgot Password?<a href="/recover"> Click Here</a></p>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="login-dont-have-acc">
                    <p>Don't have an account? </p> &nbsp;
                    <Link to="/register"> SIGN UP NOW</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
