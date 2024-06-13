import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import './Ticket.css'
import { motion } from 'framer-motion';

interface Train {
    key: string;
    trainNo: number;
    trainName: string;
    daysOfOp: any[];
    stations: {
        stationName: string;
        stationCode: string;
        duration: number;
        distance: number;
        halt: number;
    }[];
    startTime: string;
    seats: {
        sl: number;
        ac3: number;
        ac2: number;
    };
    trainType: string;
}

function Ticket() {
    const tktRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();
    const pnr = location.state.pnr;
    const [trainInfo, setTrainInfo] = useState<Train>()

    const [boardingStnName, setBoardingStnName] = useState("");
    const [destinationStnName, setDestinationStnName] = useState("");
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
        fare: 0
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

    async function getStnName(stationCode: string) {
        const res = await fetch("http://localhost:6969/api/getStnName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ stationCode }),
        })
        const data = await res.json();
        return data;
    }

    async function getTrainDetails(trainNo: number) {
        // console.log("Train no: ", trainNo)
        const res = await fetch("http://localhost:6969/api/getTrainInfoByNumber", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ trainNo: trainNo }),
        })
        const data = await res.json();
        // console.log(data)
        return data;
    }

    const calcTime = (startTime: String, duration: Number) => {
        // console.log(startTime, duration)
        let time = startTime.split(':')
        let hr = Math.floor(Number(duration) / 60)
        let min = Number(duration) % 60
        let calcHr = hr + Number(time[0])
        let calcMin = min + Number(time[1])
        let calcDay = 0;
        if (calcMin >= 60) {
            calcMin -= 60;
            calcHr += 1;
        }
        if (calcHr >= 24) {
            calcHr -= 24;
            calcDay += 1;
        }
        let actualTime = {
            time: calcHr.toString().padStart(2, '0') + ':' + calcMin.toString().padStart(2, '0'),
            day: calcDay
        }

        return actualTime;
    }

    const calcDate = (doj: Date, day: number) => {
        // console.log(doj)
        let newDate = new Date(doj.getTime() + day * 24 * 60 * 60 * 1000)

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const date = String(newDate.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

        return `${year}-${month}-${date}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const tktData = await getTicketDetails();
            await setTicket(tktData[0]);
            // console.log(ticket);
            const boardingStn = await getStnName(tktData[0].boardingPoint);
            const destinationStn = await getStnName(tktData[0].destination);
            await setBoardingStnName(boardingStn[0].stationName);
            await setDestinationStnName(destinationStn[0].stationName);
            const trainData = await getTrainDetails(tktData[0].trainNo);
            await setTrainInfo(trainData);
            // console.log(trainData);
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
                <table className='ticket-table'>
                    <tbody>
                        <tr>
                            <th>PNR</th>
                            <th>Train No./Name</th>
                            <th>Class</th>
                        </tr>
                        <tr>
                            <td style={{color: "blue", fontWeight: "bolder"}}>{ticket.pnr}</td>
                            <td>{ticket.trainNo} / {ticket.trainName} {trainInfo?.trainType}</td>
                            <td>{
                                ticket.coach === "sl" ?
                                    <>
                                        Sleeper
                                    </> :
                                    <>
                                        {
                                            ticket.coach === "ac3" ?
                                                <>Three Tier AC</> : <>Second Tier AC</>
                                        }
                                    </>
                            }</td>
                        </tr>
                    </tbody>
                </table>
                <table className='ticket-table'>
                    <colgroup>
                        <col style={{ width: "40%" }} />
                        <col style={{ width: "40%" }} />
                        <col style={{ width: "20%" }} />

                    </colgroup>
                    <tbody>    
                        <tr>
                            <th>Boarding Point</th>
                            <th>Departure Point</th>
                            <th>Distance/ Duration</th>
                        </tr>
                        <tr>
                            <td>
                                <div className='tt-td-div'>
                                    <span>
                                        {boardingStnName} ({ticket.boardingPoint})
                                    </span>
                                    <span style={{ color: "blue", fontWeight: "bolder" }}>
                                        {
                                            calcTime(trainInfo?.startTime || "00:00",
                                                trainInfo?.stations
                                                    .filter((station) => station.stationCode === ticket.boardingPoint)
                                                    .map((station) => station.duration).reduce((a, b) => a + b) || 0
                                            ).time
                                        }
                                    </span>
                                    <span style={{ color: "blue", fontWeight: "600" }}>
                                        {ticket.travelDate.slice(0, 10)}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className='tt-td-div'>
                                    <span>
                                        {destinationStnName} ({ticket.destination})
                                    </span>
                                    <span style={{ color: "blue", fontWeight: "bolder" }}>
                                        {
                                            calcTime(trainInfo?.startTime || "00:00",
                                                trainInfo?.stations
                                                    .filter((station) => station.stationCode === ticket.destination)
                                                    .map((station) => station.duration).reduce((a, b) => a + b) || 0
                                            ).time
                                        }
                                    </span>
                                    <span style={{ color: "blue", fontWeight: "600" }}>
                                        {
                                            calcDate(new Date(ticket.travelDate.slice(0, 10)),
                                                calcTime(trainInfo?.startTime || "00:00",
                                                    trainInfo?.stations
                                                        .filter((station) => station.stationCode === ticket.destination)
                                                        .map((station) => station.duration).reduce((a, b) => a + b) || 0
                                                ).day)
                                        }
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className='tt-td-div'>
                                    <span>
                                        {
                                            (trainInfo?.stations
                                                .filter((station) => station.stationCode === ticket.destination)
                                                .map((station) => station.distance).reduce((a, b) => a + b) || 0)
                                            -
                                            (trainInfo?.stations
                                                .filter((station) => station.stationCode === ticket.boardingPoint)
                                                .map((station) => station.distance).reduce((a, b) => a + b) || 0)
                                        } Kms
                                    </span>
                                    <span>
                                        {
                                            Math.floor(((trainInfo?.stations
                                                .filter((station) => station.stationCode === ticket.destination)
                                                .map((station) => station.duration).reduce((a, b) => a + b) || 0)
                                            -
                                            (trainInfo?.stations
                                                .filter((station) => station.stationCode === ticket.boardingPoint)
                                                .map((station) => station.duration).reduce((a, b) => a + b) || 0))/60).toString().padStart(2,'0')
                                            + ":" +
                                            (((trainInfo?.stations
                                                .filter((station) => station.stationCode === ticket.destination)
                                                .map((station) => station.duration).reduce((a, b) => a + b) || 0)
                                            -
                                            (trainInfo?.stations
                                                .filter((station) => station.stationCode === ticket.boardingPoint)
                                                .map((station) => station.duration).reduce((a, b) => a + b) || 0))%60).toString().padStart(2, "0")
                                        } Hrs
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="passenger-list">
                    <h3 className='passenger-heading'>Passengers:</h3>
                    <table className='passenger-table'>
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "50%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "30%" }} />
                        </colgroup>
                        <tbody>

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
                        </tbody>
                    </table>
                </div>
                <div style={{width: "100%"}}>
                    <table className='fare-table'>
                        <colgroup>
                            <col style={{ width: "20%" }}/>
                            <col style={{ width: "80%" }}/>
                        </colgroup>
                        <tr>
                            <th>Total Fare</th>
                            <th>&#8377;{ticket.fare}
                            </th>
                        </tr>
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
