import { useState, useEffect } from 'react';
import config from '../../config';
import './CancelBooking.css'
import {  useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

function CancelBooking() {

    const [tkts, setTkts] = useState([{}]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

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

    const handleCancelAction = (pnr: string) => {
        console.log(pnr);
        navigate("/cancel-ticket", { state: { pnr: pnr } });
    }

    return (
        <div className='cancel-booking'>
            {isLoading && <Loading />}
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
                                        <button onClick={()=>{handleCancelAction(ticket.pnr)}} className={ticket.ticketStatus === "Confirmed" ? 'mbt-cancel-btn' : 'mbt-cancel-btn-disabled'}>
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
        </div>
    )
}

export default CancelBooking;