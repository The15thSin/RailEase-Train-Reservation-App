import './Footer.css'
import logo from '../../assets/img/RE_nav_logo.png'
import ayush from '../../assets/img/ProfPics/ayush.png'
import biswa from '../../assets/img/ProfPics/biswa.jpg'
import dinesh from '../../assets/img/ProfPics/dinesh.png'
import avishek from '../../assets/img/ProfPics/avishek.jpg'

function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <div className='Footer'>
                    <div className='f-logo-about'>
                        <span>
                            <img src={logo} alt="logo" />
                            <p className='f-head'>RailEase</p>
                        </span>
                        <span>
                            <p>
                                RailEase is a Railway Reservation Software designed by the group of 4 students as a Software Enginnering project in the 3rd year. This project was made within 1 month and it was made using MERN Stack. It is a fully working Full Stack Applicaton.
                                RailEase is a software that mimics the whole IRCTC Railway Reservation system in a small prototype model. And could be used by any Railway Company on a big scale.
                            </p>
                        </span>
                    </div>

                    <div className='f-team'>
                        <h2>Meet our bright Team : </h2>
                        <div className='f-t-cards'>
                            <span className='f-t-card'>
                                <img className="ft-pfp" width="50px" height="50px" src={ayush} alt="prof" />
                                <div className='ft-name-desg'>
                                    <h4>Ayush Jalan</h4>
                                    <p>Fullstack Engineer</p>
                                </div>
                                <div className='ft-icons'>
                                    <a href="https://github.com/The15thSin" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/fluency/48/github.png" alt="github" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/ayush-jalan/" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="linkedin-circled--v1" />
                                    </a>
                                </div>
                            </span>
                            <span className='f-t-card'>
                                <img className="ft-pfp" width="50px" height="50px" src={biswa} alt="prof" />
                                <div className='ft-name-desg'>
                                    <h4>Biswarup Naha</h4>
                                    <p>Fullstack Engineer</p>
                                </div>
                                <div className='ft-icons'>
                                    <a href="https://github.com/biswarup-naha" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/fluency/48/github.png" alt="github" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/biswarup-naha-1a3aa4137/" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="linkedin-circled--v1" />
                                    </a>
                                </div>
                            </span>
                            <span className='f-t-card'>
                                <img className="ft-pfp" width="50px" height="50px" src={dinesh} alt="prof" />
                                <div className='ft-name-desg'>
                                    <h4>Dinesh Kumar</h4>
                                    <p>Frontend Enginner</p>
                                </div>
                                <div className='ft-icons'>
                                    <a href="https://github.com/Dinesh870" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/fluency/48/github.png" alt="github" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/dinesh-kumar-singh-17546322b/" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="linkedin-circled--v1" />
                                    </a>
                                </div>
                            </span>
                            <span className='f-t-card'>
                                <img className="ft-pfp" width="50px" height="50px" src={avishek} alt="prof" />
                                <div className='ft-name-desg'>
                                    <h4>Avishek Gorai</h4>
                                    <p>Database Engineer</p>
                                </div>
                                <div className='ft-icons'>
                                    <a href="https://github.com/not-so-great-gorai" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/fluency/48/github.png" alt="github" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/avishek-gorai-7502412b7/" target="_blank">
                                        <img width="36" height="36" src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="linkedin-circled--v1" />
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>

                    <div className='f-project-links'>
                        <h2>Project Links:</h2>
                        <span className='fp-links'>
                            <a href="https://github.com/The15thSin/RailEase-Train-Reservation-App" target="_blank">
                                <img width="48" height="48" src="https://img.icons8.com/fluency/96/github.png" alt="github_repo" />
                            </a>
                            <a href="https://railease.vercel.app/" target="_blank">
                                <img width="48" height="48" src="https://img.icons8.com/color/96/domain--v1.png" alt="website_link" />
                            </a>
                            <a href="https://malabarrailwayreservation.onrender.com" target="_blank">
                                <img width="48" height="48" src="https://img.icons8.com/dusk/64/server.png" alt="server" />
                            </a>
                            <a href="https://docs.google.com/document/d/11eCXQX5YiBYaaNywU9d4BfZznIS1mFQPRG4koyg07cQ/edit?usp=sharing" target="_blank">
                                <img width="48" height="48" src="https://img.icons8.com/dusk/64/document--v1.png" alt="SRS-document" />
                            </a>
                        </span>
                    </div>
                </div>
                <div className='footer-copyright'>
                    <p>
                        Copyright &#169; 2024 RailEase. All rights reserved.
                    </p>
                    <p>
                        Made with lots of efforts and love  <span className="footer-heart">&#10084;</span>.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
