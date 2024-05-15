import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BookingForm.css';

interface Passenger {
    name: string;
    age: number;
    gender: string;
}


function BookingForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { train, coach, doj, srcStation, destStation } = location.state;
    
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const passengerObject: Passenger = {
        name: "",
        age: Number(null),
        gender: "",
    };
    
    const [passenger_count, setPassenger_count] = useState(0);

    const addPassenger = () => {
        if (passenger_count >= 5) {
            alert("Cannot add more than 5 passengers!!!")
            return
        }
        setPassengers([...passengers, { ...passengerObject }]);
        setPassenger_count(passenger_count + 1);
    };

    const removePassenger = (x: number) => {
        setPassengers(passengers.filter((_, id) => id !== x));
        setPassenger_count(passenger_count - 1);
    };

    async function handleSubmit(e: { preventDefault: () => void; }): Promise<void> {
        e.preventDefault();
        // Check for empty fields
        let hasEmptyField = false;
        for (const passenger of passengers) {
            if (!passenger.name || !passenger.age || !passenger.gender) {
                hasEmptyField = true;
                break; // Stop iterating if an empty field is found
            }
        }

        if (hasEmptyField) {
            alert("Please fill in all required fields!");
            return;
        }

        if (passenger_count === 0) {
            alert("Please add a passenger");
            return;
        }

        const ticketReq = {
            userID: "1",
            trainNo: train.trainNo,
            trainName: train.trainName,
            coach: coach,
            doj: doj,
            srcStation: srcStation,
            destStation: destStation,
            passengers: passengers,
        };


        console.log("Submitted passenger data:", ticketReq);

        const response = await fetch("http://localhost:6969/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketReq),
        });
        const data = await response.json();
        console.log("Ticket data : ", data);
        if (data.status === "ok") {
            alert("Ticket booked successfully");
            navigate("/ticket", { state: { pnr: data.ticketInfo.newTicket.pnr } });
            
        } else {
            alert("Ticket booking failed");
        }
    };

    const fadeInUp = {
        opacity: 0,
        y: -20,
        transition: { duration: 0.5, ease: 'easeInOut' },
    };

    const fadeOutDown = {
        opacity: 0,
        x: -110,
        transition: { duration: 5, ease: 'easeInOut' },
    };

    const visible = {
        opacity: 1,
        y: 0,
    };

    return (
        <div className='booking-form-container'>
            <div className="booking-form">
                <h2>Booking Form</h2>

                <div className="booking-details-container">
                    <div className="booking-detail">
                        <span className="detail-label">Train:</span>
                        <span className="detail-value">{train.trainNo} - {train.trainName}</span>
                    </div>
                    <div className="booking-detail">
                        <span className="detail-label">Coach:</span>
                        <span className="detail-value">{coach.toUpperCase()}</span>
                    </div>
                    <div className="booking-detail">
                        <span className="detail-label">Date of Journey:</span>
                        <span className="detail-value">{doj}</span>
                    </div>
                    <div className="booking-detail">
                        <span className="detail-label">Source:</span>
                        <span className="detail-value">{srcStation}</span>
                    </div>
                    <div className="booking-detail">
                        <span className="detail-label">Destination:</span>
                        <span className="detail-value">{destStation}</span>
                    </div>
                </div>


                {/* Form for passenger details */}

                <form onSubmit={handleSubmit} className="passenger-form">
                    {passengers.map((passenger, index) => (
                        <motion.div key={index}
                            id={`passenger${index}`}
                            className='single-passenger'
                            initial={fadeInUp}
                            exit={fadeOutDown}
                            animate={visible}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <span className='bf-passenger-details'>
                                <label htmlFor={`name${index}`} className="form-label">
                                    Passenger Name:{index === 0 ? <div className='asterisk'>*</div> : <></>}
                                </label>
                                <input
                                    type="text"
                                    id={`name${index}`}
                                    name={`name${index}`}
                                    value={passenger.name}
                                    onChange={(e) =>
                                        setPassengers(
                                            passengers.map((p, i) => (i === index ? { ...p, name: e.target.value } : p))
                                        )
                                    }
                                    required
                                    className="form-input"
                                />
                            </span>
                            <span className='bf-passenger-details'>
                                <label htmlFor={`age${index}`} className="form-label">
                                    Passenger Age:{index === 0 ? <div className='asterisk'>*</div> : <></>}
                                </label>
                                <input
                                    type="number"
                                    id={`age${index}`}
                                    name={`age${index}`}
                                    value={passenger.age}
                                    onChange={(e) =>
                                        setPassengers(
                                            passengers.map((p, i) => (i === index ? { ...p, age: Number(e.target.value) } : p))
                                        )
                                    }
                                    required
                                    className="form-input"
                                />
                            </span>
                            <span className='bf-passenger-details'>
                                <label htmlFor={`gender${index}`} className="form-label">
                                    Passenger Gender:{index === 0 ? <div className='asterisk'>*</div> : <></>}
                                </label>
                                <select className='gender-select' id={`gender${index}`} name={`gender${index}`} value={passenger.gender} onChange={(e) =>
                                    setPassengers(
                                        passengers.map((p, i) => (i === index ? { ...p, gender: e.target.value } : p))
                                    )
                                }
                                    required
                                >
                                    <option defaultValue={""}>Select your Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Gay">Others</option>
                                </select>
                            </span>
                            <button type="button"
                                className={`remove-passenger-btn ${index === 0 ? 'remove-disabled' : ''}`}
                                onClick={index !== 0 ? () => removePassenger(index) : undefined}>
                                Delete
                                <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-trash.png" alt="filled-trash" />
                            </button>
                        </motion.div>
                    ))}
                    <button key="5" type="button" className="add-passenger-btn" onClick={addPassenger}>
                        Add Passenger
                        <img width="24" height="24" src="https://img.icons8.com/external-thin-kawalan-studio/ffffff/36/external-user-plus-users-thin-kawalan-studio.png" alt="external-user-plus-users-thin-kawalan-studio" />
                    </button>
                </form>

            </div>
            <button key="6" type="submit" className="submit-btn" onClick={handleSubmit}>
                Submit Booking
            </button>
        </div>
    );
}

export default BookingForm;
