import './Landing.css'
import rana from '../../assets/img/rana.png'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

function Landing() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        localStorage.clear();
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            <motion.div className="main"
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: "0" }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <div className="main-head">
                    <p className='main-head-p1'>Hello Everyone</p>
                    <p className='main-head-p2'>This is RailEase : Making Railway Ticket Booking Easy...</p>
                    <img src={rana} alt="rana" />
                    <p className="rana-img-tag">Fastest Train Ticket Booking</p>
                </div>
                <div className="main-features">
                    <div className="mf-head">
                        <h2>Why Book Train Tickets Here:</h2>
                    </div>
                    <div className="mf-grid">
                        <div className="mf-grid-item">
                            <span>
                                <img width="40" height="40" src="https://img.icons8.com/ios/100/two-tickets.png" alt="two-tickets" />
                            </span>
                            <span>
                                <h4>Get Train Tickets</h4>
                                <p>Get your confirm tickets hassle free and without worrying about the queues in railway station.</p>
                            </span>
                        </div>
                        <div className="mf-grid-item">
                            <span>
                                <img width="40" height="40" src="https://img.icons8.com/ios-filled/100/no-hidden-fee.png" alt="no-hidden-fee" />
                            </span>
                            <span>
                                <h4>No Cancellation Charges </h4>
                                <p>Not sure if you wanna do the journey or not. Don't worry, you can cancel your tickets here as well without any charges.</p>
                            </span>
                        </div>
                        <div className="mf-grid-item">
                            <span>
                                <img width="40" height="40" src="https://img.icons8.com/wired/64/refund.png" alt="refund" />
                            </span>
                            <span>
                                <h4>Instant Refunds</h4>
                                <p>After the cancellation of tickets, get your refunds easily and fast.</p>
                            </span>
                        </div>
                        <div className="mf-grid-item">
                            <span>
                                <img width="40" height="40" src="https://img.icons8.com/ios/100/queue.png" alt="queue" />
                            </span>
                            <span>
                                <h4>Avoid Queue</h4>
                                <p>Stay safe and book tickets online. Avoid the queue on the Reservation counter.</p>
                            </span>
                        </div>
                        <div className="mf-grid-item">
                            <span>
                                <img width="40" height="40" src="https://img.icons8.com/external-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto/64/external-headphone-digital-service-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto.png" alt="external-headphone-digital-service-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto" />
                            </span>
                            <span>
                                <h4>Booking &#38; Enquiry Support</h4>
                                <p>24X7 customer support, for any train enquiry &#38; booking related queries call 08068243910.</p>
                            </span>
                        </div>
                        <div className="mf-grid-item">
                            <span>
                                <img width="40" height="40" src="https://img.icons8.com/external-others-phat-plus/128/external-authentic-authentication-outline-others-phat-plus-3.png" alt="external-authentic-authentication-outline-others-phat-plus-3" />
                            </span>
                            <span>
                                <h4>Used by 1M+ trusted Customers</h4>
                                <p>A large number of users trusts our platform and make their life easy by using this app.</p>
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className='extras'>
                
            </div>
        </>
    )
}

export default Landing