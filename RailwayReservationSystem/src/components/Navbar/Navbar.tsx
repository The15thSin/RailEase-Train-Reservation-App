import { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.length !== 0) {
            setIsLoggedIn(true);
        }
    })

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
                        <img width="55" height="55"
                            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/128/252bc2/external-train-hotel-services-and-city-elements-flatart-icons-outline-flatarticons.png"
                            alt="external-train-hotel-services-and-city-elements-flatart-icons-outline-flatarticons" />
                        <p>Malabar Railway Booking Portal</p>
                    </span>
                    <span>
                        {
                            (isLoggedIn) ?
                                <>
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
