import { useEffect, useState } from 'react';
import './MyBookings.css'
import { useNavigate } from 'react-router-dom';
import config from '../../config.ts'

function MyBookings() {

    const [tkts, setTkts] = useState([{}]);
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
        const res = await fetch(`${config.BACKEND_URL}http://localhost:6969/api/getTicketsByEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: user.email })
        })
        const tickets = await res.json();
        return tickets;
    }

    useEffect(() => {
        const fetchData = async () => {
            const tkts = await getTickets();
            await setTkts(tkts);
            console.log(tkts)
        };
        fetchData();
    }, [])

    const handlePrintClick = (pnr: string) => {
        console.log(pnr);
        navigate("/ticket", { state: { pnr: pnr } });
    }

    return (
        <div className='my-bookings'>
            <h1>
                My Bookings
            </h1>
            <div className="mb-ticket-list-container">
                {Array.isArray(tkts) && tkts.length > 0 ? (
                    <ul className="mb-ticket-list">
                        <h4>Upcoming Train Tickets</h4>
                        {
                            tkts
                                .filter((ticket: any) => new Date(ticket.travelDate) >= new Date())
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
                                            <p style={{ fontWeight: "bold", color: "green" }}>{ticket.ticketStatus}</p>
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
                                        <button className='mbt-print-btn' onClick={()=>{handlePrintClick(ticket.pnr)}}>
                                            Print Ticket
                                        </button>
                                        <button className='mbt-cancel-btn'>
                                            Cancel Ticket
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                        {
                            tkts.filter((ticket: any) => new Date(ticket.travelDate) >= new Date()).length === 0 && 
                            <div className='no-tickets'>
                                <img width="100" height="100" src="https://img.icons8.com/ios/200/000000/nothing-found.png" alt="nothing-found"/>
                                <p>
                                    You don't have any past tickets yet.
                                </p>
                            </div>
                        }
                    </ul>
                ) : (
                    <p>You don't have any booked tickets yet.</p>
                )}
                {Array.isArray(tkts) && tkts.length > 0 ? (
                    <ul className="mb-ticket-list">
                        <h4>Past Train Tickets</h4>
                        {
                            tkts
                                .filter((ticket: any) => new Date(ticket.travelDate) < new Date())
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
                                            <p style={{ fontWeight: "bold", color: "green" }}>{ticket.ticketStatus}</p>
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
                                        <button className='mbt-print-btn' onClick={()=>{handlePrintClick(ticket.pnr)}}>
                                            Print Ticket
                                        </button>
                                        {/* <button className='mbt-cancel-btn'>
                                            Cancel Ticket
                                        </button> */}
                                    </div>
                                </li>
                            ))
                        }
                        {
                            tkts.filter((ticket: any) => new Date(ticket.travelDate) < new Date()).length === 0 && 
                            <div className='no-tickets'>
                                <img width="100" height="100" src="https://img.icons8.com/ios/200/000000/nothing-found.png" alt="nothing-found"/>
                                <p>
                                    You don't have any past tickets yet.
                                </p>
                            </div>
                        }
                    </ul>
                ) : (
                    <p>You don't have any booked tickets yet.</p>
                )}
            </div>
        </div>
    )
}

export default MyBookings
