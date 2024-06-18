import { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import logo from "../../assets/img/RE_nav_logo.png"


function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (!decodedToken || !decodedToken.exp) {
                    throw new Error('Invalid token');
                }
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setIsLoggedIn(true);
                } else {
                    // Token has expired
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Token validation error:', error);
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
        // console.log("isLoggedIn:", isLoggedIn);
    });

    function handleLogout() {
        setIsLoggedIn(false);
        navigate('/');
        localStorage.clear();
    }

    return (
        <div>
            <header>
                <div className="nav">
                    <span>
                        <img className="nav-logo" width="55" height="55" src={logo} alt="logo" />
                        <p>RailEase</p>
                    </span>
                    <span>
                        {
                            (isLoggedIn) ?
                                <>
                                    <Link to = '/dashboard'>
                                        <button className='go-to-dashboard' >
                                            Go to Dashboard
                                        </button>
                                    </Link>
                                    <button className="logout-button" onClick={handleLogout}>
                                        Logout
                                        <img width="20" height="20" src="https://img.icons8.com/tiny-glyph/16/ff0000/exit.png"
                                            alt="exit--v1" />
                                    </button>
                                </>
                                :
                                <>
                                    <Link to="/register">
                                        <button className="register-button">
                                            Register
                                            <img width="25" height="25" src="https://img.icons8.com/ios/252bc2/add-user-male.png"
                                                alt="add-user-male--v2" />
                                        </button>
                                    </Link >
                                    <Link to="/login">
                                        <button className="login-button">
                                            Login
                                            <img width="25" height="25"
                                                src="https://img.icons8.com/ios-filled/ffffff/login-rounded-right.png"
                                                alt="login-rounded-right" />
                                        </button>
                                    </Link>
                                </>
                        }

                    </span>
                </div>
            </header>
        </div>
    )
}

export default Navbar
