import { useState, useEffect } from 'react';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import './CancelBooking.css'
import Loading from '../Loading/Loading';
import { motion } from 'framer-motion';

function CancelBooking() {

    const [isLoading, setIsLoading] = useState(true);
    const [tkts, setTkts] = useState([{}]);
    const [pnr, setPnr] = useState(0);
    const [cancelTkt, setCancelTkt] = useState(false);
    const navigate = useNavigate();

    function decode(token: string) {
        try {
            const tokenValue = JSON.parse(window.atob(token.split(".")[1]));
            // console.log(tokenValue);
            return tokenValue;
        } catch (e) {
            return undefined;
        }
    }
    const user = decode(localStorage.getItem('token')!);
    console.log(user.email)

    async function getTickets() {
        const res = await fetch(`${config.BACKEND_URL}/api/getTicketsByEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: user.email })
        })
        const tickets = await res.json();
        await setIsLoading(false)
        return tickets;
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const tkts = await getTickets();
            await setTkts(tkts);
            console.log(tkts)
        };
        fetchData();
    }, [])

    const handleCancelAction = async () => {
        setIsLoading(true);
        console.log(pnr);
        async function cancelTkt() {
            const res = await fetch(`${config.BACKEND_URL}/api/cancel-ticket`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pnr: pnr })
            })
            const data = await res.json();
            await console.log(data);
            await setCancelTkt(false);
            navigate('/my-bookings');
        }
        await cancelTkt();
        setIsLoading(false);
    }

    return (
        <motion.div 
            className='cancel-booking'
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {isLoading && <Loading />}
            {
                cancelTkt &&
                <div className='cancel-confirmation-container'>
                    <div className='cancel-dialogue-box'>
                        <h1>
                            Cancel Reservation ?
                        </h1>
                        <img width="96" height="96" src="https://img.icons8.com/fluency/96/break.png" alt="break"/>
                        <p>
                            Are you sure you want to cancel this ticket. This process is not reversible.
                        </p>
                        <span className='cancel-dialogue-box-btns'>
                            <button className='cb-no' onClick={()=>{setCancelTkt(false)}}>
                                NO, GO BACK
                            </button>
                            <button className='cb-yes' onClick={()=>{handleCancelAction()}}>
                                YES, CONTINUE
                            </button>
                        </span>
                    </div>
                </div>
            }
            <h1>Cancel booking</h1>
            <div className="mb-ticket-list-container">
                <ul className="mb-ticket-list">
                    <h4>Upcoming Train Tickets</h4>
                    {
                        tkts
                            .filter((ticket: any) => new Date(ticket.travelDate) >= new Date() && ticket.ticketStatus === "Confirmed")
                            .map((ticket: any) => (
                                <li key={ticket._id} className='mb-ticket-item'>
                                    <div className='mb-ticket-details'>
                                        <div>
                                            <h3>PNR: {ticket.pnr}</h3>
                                        </div>
                                        <div className="mbt-tname">
                                            <p style={{ fontWeight: "bold" }}>{ticket.trainNo} - </p>
                                            <p style={{ fontWeight: "bold" }}>{ticket.trainName}</p>
                                        </div>
                                        <div className='mbt-from-to'>
                                            <p>
                                                From: <strong>{ticket.boardingPoint}</strong>
                                            </p>
                                            <p>
                                                To: <strong>{ticket.destination}</strong>
                                            </p>
                                        </div>
                                        <div className='mbt-travel-date'>
                                            <p>Travel Date:</p>
                                            <p style={{ fontWeight: "bold" }}>{new Date(ticket.travelDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='mbt-class'>
                                            <p>Class: </p>
                                            <p style={{ fontWeight: "bold" }}>{ticket.coach === undefined ? "na" : (ticket.coach).toUpperCase()}</p>
                                        </div>
                                        <div className='mbt-ticket-status'>
                                            <p>Ticket Status:</p>
                                            {
                                                ticket.ticketStatus === "Confirmed" ?
                                                    <p style={{ fontWeight: "bold", color: "green" }}>{ticket.ticketStatus}</p>
                                                    :
                                                    <p style={{ fontWeight: "bold", color: "red" }}>{ticket.ticketStatus}</p>
                                            }
                                        </div>
                                        <div className='mbt-fare'>
                                            <p>Fare:</p>
                                            <p style={{ fontWeight: "bold" }}>₹{ticket.fare === undefined ? 0 : ticket.fare.toFixed(2)}</p>
                                        </div>
                                        <div className='mbt-booked-date'>
                                            <p>Booked on: </p>
                                            <p><em>{new Date(ticket.bookingDate).toLocaleDateString()}</em></p>
                                        </div>
                                    </div>
                                    <div className='mbt-actions-btns'>
                                        <button onClick={() => { setCancelTkt(true); setPnr(ticket.pnr); }} className={ticket.ticketStatus === "Confirmed" ? 'mbt-cancel-btn' : 'mbt-cancel-btn-disabled'}>
                                            Cancel Ticket
                                        </button>
                                    </div>
                                </li>
                            ))
                    }
                    {
                        tkts.filter((ticket: any) => new Date(ticket.travelDate) >= new Date()).length === 0 &&
                        <div className='no-tickets'>
                            <img width="100" height="100" src="https://img.icons8.com/ios/200/000000/nothing-found.png" alt="nothing-found" />
                            <p>
                                You don't have any Upcoming tickets yet.
                            </p>
                        </div>
                    }
                </ul>
            </div>
        </motion.div>
    )
}

export default CancelBooking;