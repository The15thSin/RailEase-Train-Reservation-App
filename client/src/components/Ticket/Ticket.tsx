import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import './Ticket.css'
import { motion } from 'framer-motion';

function Ticket() {
    const tktRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();
    const pnr = location.state.pnr;
    // const pnr = 11037490
    // console.log(pnr)

    const [ticket, setTicket] = useState({
        pnr: "",
        trainNo: 0,
        trainName: "",
        boardingPoint: "",
        destination: "",
        travelDate: "",
        coach: "",
        passengerDetails: [
            {
                name: "",
                age: 0,
                gender: "",
                _id: ""
            }
        ],
    });
    async function getTicketDetails() {
        const res = await fetch("http://localhost:6969/api/getTickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pnr }),
        })
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            const tktData = await getTicketDetails();
            setTicket(tktData[0]);
        };
        fetchData();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.2 }}
            className='tkt-wrapper'>
            <div ref={tktRef} className='tkt-container'>
                <h2>
                    Ticket
                </h2>
                <div className="ticket-details">
                    <div className="ticket-info">
                        <p className="info-label">PNR:</p>
                        <p className="info-value">{ticket.pnr}</p>
                    </div>
                    <div className="ticket-info">
                        <p className="info-label">Train No:</p>
                        <p className="info-value">{ticket.trainNo}</p>
                    </div>
                    <div className="ticket-info">
                        <p className="info-label">Train Name:</p>
                        <p className="info-value">{ticket.trainName}</p>
                    </div>
                    <div className="ticket-info">
                        <p className="info-label">Boarding Point:</p>
                        <p className="info-value">{ticket.boardingPoint}</p>
                    </div>
                    <div className="ticket-info">
                        <p className="info-label">Destination:</p>
                        <p className="info-value">{ticket.destination}</p>
                    </div>
                    <div className="ticket-info">
                        <p className="info-label">Travel Date:</p>
                        <p className="info-value">{ticket.travelDate.slice(0, 10)}</p>
                    </div>
                    <div className="ticket-info">
                        <p className="info-label">Coach:</p>
                        <p className="info-value">{ticket.coach.toUpperCase()}</p>
                    </div>
                </div>
                <div className="passenger-list">
                    <h3 className='passenger-heading'>Passengers:</h3>
                    <table className='passenger-table'>
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "50%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "30%" }} />
                        </colgroup>
                        <tr className='passenger-header'>
                            <th className='passenger-key'>S.No</th>
                            <th className='passenger-key'>Name</th>
                            <th className='passenger-key'>Age</th>
                            <th className='passenger-key'>Gender</th>
                        </tr>
                        {
                            ticket.passengerDetails.map((passenger, index) => (
                                <tr key={passenger._id} className='passenger-row'>
                                    <td className='passenger-value'>{index + 1}</td>
                                    <td className='passenger-value'>{passenger.name}</td>
                                    <td className='passenger-value'>{passenger.age}</td>
                                    <td className='passenger-value'>{passenger.gender}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>

            <ReactToPrint trigger={() => (
                <button className='print-tkt'>
                    Print
                    <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/ffffff/print.png" alt="print" />
                </button>
            )}
                content={() => tktRef.current ? tktRef.current : null}
            />
        </motion.div>
    )
}

export default Ticket
