import { useLocation, useNavigate } from 'react-router-dom';
import './TrainsList.css'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TrainInfo from '../TrainInfo/TrainInfo';
import config from '../../config';

function TrainsList() {
    const location = useLocation();
    const { trains, doj, srcStation, destStation, seatData } = location.state;
    // console.log(trains)
    // console.log(seatData)

    const dateString = doj;
    const date = new Date(dateString);
    // console.log(date)
    const dayIndex = date.getDay();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[dayIndex];

    const [viewTD, setViewTD] = useState(0)

    const navigate = useNavigate();

    const getFare = (trainType: string, coach: string, srcDist: number, destDist: number) => {

        // base fare calculation
        let base_fare;
        base_fare = (100 * Math.log10(destDist - srcDist)) + Math.pow(destDist - srcDist, 0.8)
        base_fare = Math.round(base_fare / 10) * 10
        // console.log(base_fare);

        let fare = 0;

        // fare depending on train type
        if (trainType === "SF-Express") {
            fare = base_fare + base_fare * 0.2;
        }
        else if (trainType === "Mail-Express") {
            fare = base_fare + base_fare * 0.05;
        }
        else if (trainType === "AC-Express") {
            fare = base_fare + base_fare * 0.4;
        }

        // fare depending on coach type
        if (coach === "ac2") {
            fare = fare + Math.round(base_fare / 100) * 300
        } else if (coach === "ac3") {
            fare = fare + Math.round(base_fare / 100) * 150
        }

        // taxes on fare calc
        let tax;
        tax = fare * 0.05;

        fare += tax;
        // console.log(fare);
        
        return fare.toFixed(2);
    }

    async function handleBookSeat(
        train:
            {
                key: string;
                trainNo: number;
                trainName: string;
                daysOfOp: any[];
                stations: {
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
            },
        coach: string
    ) {

        console.log("trains info : ", train);
        let fare = getFare(
            train.trainType,
            coach,
            train.stations
                .filter((station) => station.stationCode === srcStation)
                .map((station) => station.distance)[0],
            train.stations
                .filter((station) => station.stationCode === destStation)
                .map((station) => station.distance)[0])
        console.log("fare : ", fare);
        
        navigate('/dashboard/book-seat', {
            state: {
                train: train,
                coach: coach,
                doj: doj,
                srcStation,
                destStation,
                fare: fare
            }
        });
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

    async function getStnName(stationCode: string) {
        const res = await fetch(`${config.BACKEND_URL}/api/getStnName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stationCode: stationCode
            })
        });

        const data = await res.json();
        const stnName = data[0].stationName;
        // await console.log("Station Name : ", stnName)
        return stnName;
    }

    const [srcStnName, setSrcStnName] = useState<string | null>(null);
    const [destStnName, setDestStnName] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStnName(srcStation);
            const data2 = await getStnName(destStation);
            setSrcStnName(data);
            setDestStnName(data2);
        };
        fetchData();
    }, [srcStation, destStation])

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.2 }}
        >
            <div className="TrainsList-container">
                <h2 className='tlh-heading'> Trains running from
                    <p className='tlh-src-dest'>{srcStation}</p>
                    <img width="16" height="16" src="https://img.icons8.com/color/20/arrow--v1.png" alt="arrow--v1" />
                    <p className='tlh-src-dest'>{destStation}</p>
                    on
                    <p className='tlh-doj'>{dayName}, {doj}</p>
                </h2>
            </div>

            {
                trains
                    .filter((train: { daysOfOp: any[]; }) => train.daysOfOp.includes(dayName))
                    .map((train: {
                        key: string;
                        trainNo: number;
                        trainName: string;
                        daysOfOp: any[];
                        stations: {
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
                    ) => (
                        <div key={train.trainNo} className='TrainsList-container'>
                            <p className='train-no-name-dot'>
                                <p>
                                    {train.trainNo} - {train.trainName}
                                    <span className='train-type'>
                                        {train.trainType}
                                    </span>
                                    <button className='view-train-details'
                                        onClick={() => setViewTD(train.trainNo)}>
                                        View Details
                                    </button>
                                </p>
                                <p className='tl-doj'><p style={{ color: "rgb(0, 151, 0)", fontSize: "0.9rem" }}>Runs on: </p> {train.daysOfOp.join(', ')}</p>
                            </p>
                            <span className='tl-stn-time'>
                                <span className='tl-stn-src'>
                                    <div>{srcStnName}</div>
                                    <div style={{ fontSize: "0.9rem" }}>({srcStation})</div>


                                    {/* Shows the arrival time */}
                                    <h3>
                                        {
                                            calcTime(train.startTime,
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.duration).reduce((a, b) => a + b)
                                            ).time
                                        }
                                    </h3>

                                    {/* Shows the Date of Journey */}
                                    <p style={{ fontSize: "0.7rem", fontWeight: "500", marginTop: "4px" }}>
                                        {
                                            doj
                                        }
                                    </p>
                                </span>
                                <span className='tl-trvl-time'>
                                    <p>
                                        {
                                            Math.floor((train.stations
                                                .filter((station) => station.stationCode === destStation)
                                                .map((station) => station.duration).reduce((a, b) => a + b)
                                                -
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.duration).reduce((a, b) => a + b)) / 60).toString().padStart(2, '0')
                                            + ':' +
                                            ((train.stations
                                                .filter((station) => station.stationCode === destStation)
                                                .map((station) => station.duration).reduce((a, b) => a + b)
                                                -
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.duration).reduce((a, b) => a + b)) % 60).toString().padStart(2, '0')
                                        } hours
                                    </p>
                                    <img width="50" height="50" src="https://img.icons8.com/ios/50/long-arrow-right--v1.png" alt="long-arrow-right--v1" />
                                    <p>
                                        {
                                            // Distance between two stations
                                            (train.stations
                                                .filter((station) => station.stationCode === destStation)
                                                .map((station) => station.distance)[0])
                                            -
                                            (train.stations
                                                .filter((station) => station.stationCode === srcStation)
                                                .map((station) => station.distance)[0])
                                        } kms
                                    </p>
                                </span>
                                <span className='tl-stn-dest'>
                                    <div>{destStnName}</div>
                                    <div style={{ fontSize: "0.9rem" }}>({destStation})</div>
                                    <h3>
                                        {
                                            calcTime(train.startTime,
                                                train.stations
                                                    .filter((station) => station.stationCode === destStation)
                                                    .map((station) => station.duration).reduce((a, b) => a + b)
                                            ).time
                                        }
                                    </h3>
                                    <p style={{ fontSize: "0.7rem", fontWeight: "500", marginTop: "4px" }}>
                                        {
                                            calcDate(new Date(doj),
                                                calcTime(train.startTime,
                                                    train.stations
                                                        .filter((station) => station.stationCode === destStation)
                                                        .map((station) => station.duration).reduce((a, b) => a + b)
                                                ).day)
                                        }
                                    </p>
                                </span>
                            </span>
                            <div className='tl-seats'>
                                <span className="tl-seat-blocks">
                                    <p className='tlsb-coach'>SL</p>
                                    <p className='tlsb-availability'>
                                        <span>
                                            {(train.seats.sl !== undefined && train.seats.sl !== null && train.seats.sl - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.sl > 0)
                                                ?
                                                <p style={{ color: "green" }}>Available - #{
                                                    train.seats.sl
                                                    - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.sl
                                                }</p>
                                                :
                                                <p style={{ color: "red" }}>Not Available</p>
                                            }
                                        </span>
                                    </p>
                                    <p className='tlsb-fare'>
                                        &#8377;
                                        {
                                            getFare(
                                                train.trainType,
                                                "sl",
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.distance)[0],
                                                train.stations
                                                    .filter((station) => station.stationCode === destStation)
                                                    .map((station) => station.distance)[0]
                                            )
                                        }
                                    </p>
                                    {(train.seats.sl !== undefined && train.seats.sl !== null && train.seats.sl - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.sl > 0)
                                        ?
                                        <button className="tlsb-book-btn" onClick={() => handleBookSeat(train, "sl")}>
                                            Book Now
                                        </button>
                                        :
                                        <button className='tlsb-book-btn tlsb-book-btn-disabled'>
                                            Book Now
                                        </button>
                                    }
                                </span>
                                <span className="tl-seat-blocks">
                                    <p className='tlsb-coach'>3AC</p>
                                    <p className='tlsb-availability'>
                                        <span>

                                            {(train.seats.ac3 !== undefined && train.seats.ac3 !== null && train.seats.ac3 - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.ac3 > 0)
                                                ?
                                                <p style={{ color: "green" }}>Available - #{train.seats.ac3
                                                    - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.ac3
                                                }</p>
                                                :
                                                <p style={{ color: "red" }}>Not Available</p>
                                            }
                                        </span>
                                    </p>
                                    <p className='tlsb-fare'>
                                        &#8377;
                                        {
                                            getFare(
                                                train.trainType,
                                                "ac3",
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.distance)[0],
                                                train.stations
                                                    .filter((station) => station.stationCode === destStation)
                                                    .map((station) => station.distance)[0]
                                            )
                                        }
                                    </p>
                                    {(train.seats.ac3 !== undefined && train.seats.ac3 !== null && train.seats.ac3 - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.ac3 > 0)
                                        ?
                                        <button className="tlsb-book-btn" onClick={() => handleBookSeat(train, "ac3")}>
                                            Book Now
                                        </button>
                                        :
                                        <button className='tlsb-book-btn tlsb-book-btn-disabled'>
                                            Book Now
                                        </button>
                                    }
                                </span>
                                <span className="tl-seat-blocks">
                                    <p className='tlsb-coach'>2AC</p>
                                    <p className='tlsb-availability'>
                                        <span>
                                            {(train.seats.ac2 !== undefined && train.seats.ac2 !== null && train.seats.ac2 - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.ac2 > 0)
                                                ?
                                                <p style={{ color: "green" }}>Available - #{train.seats.ac2
                                                    - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.ac2
                                                }</p>
                                                :
                                                <p style={{ color: "red" }}>Not Available</p>
                                            }
                                        </span>
                                    </p>
                                    <p className='tlsb-fare'>
                                        &#8377;
                                        {
                                            getFare(
                                                train.trainType,
                                                "ac2",
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.distance)[0],
                                                train.stations
                                                    .filter((station) => station.stationCode === destStation)
                                                    .map((station) => station.distance)[0]
                                            )
                                        }
                                    </p>
                                    {(train.seats.ac2 !== undefined && train.seats.ac2 !== null && train.seats.ac2 - seatData.find((data: { trainNo: number; }) => data.trainNo === train.trainNo).seats.ac2 > 0)
                                        ?
                                        <button className="tlsb-book-btn" onClick={() => handleBookSeat(train, "ac2")}>
                                            Book Now
                                        </button>
                                        :
                                        <button className='tlsb-book-btn tlsb-book-btn-disabled'>
                                            Book Now
                                        </button>
                                    }
                                </span>
                            </div>
                        </div>
                    ))
            }
            {
                trains.filter((train: { daysOfOp: any[]; }) => train.daysOfOp.includes(dayName)).length === 0?
                <div className='tlh-no-trains'>No Trains Found running on this day...</div>:
                <></>
            }

            <hr />

            <div className="other-days">
                <h2>Trains running on Other days</h2>
            </div>
            {
                trains
                    .filter((train: { daysOfOp: any[]; }) => !train.daysOfOp.includes(dayName))
                    .map((train: {
                        key: string | undefined;
                        trainNo: number;
                        trainName: string | null | undefined;
                        daysOfOp: any[];
                        stations: {
                            stationCode: string | null | undefined;
                            duration: number;
                            distance: number | null | undefined;
                            halt: number | null | undefined;
                        }[];
                        startTime: string;
                        seats: {
                            sl: number | null | undefined;
                            ac3: number | null | undefined;
                            ac2: number | null | undefined;
                        };
                        trainType: string | null | undefined;
                    }) => (
                        <div key={train.trainNo} className='TrainsList-container'>
                            <p className='train-no-name-dot'>
                                <p>{train.trainNo} - {train.trainName} <span className='train-type'>{train.trainType}</span> </p>
                                <p className='tl-doj'><p style={{ color: "rgb(0, 151, 0)", fontSize: "0.9rem" }}>Runs on: </p> {train.daysOfOp.join(', ')}</p>
                            </p>
                            <span className='tl-stn-time'>
                                <span className='tl-stn-src'>
                                    <div>{srcStnName}</div>
                                    <div style={{ fontSize: "0.9rem" }}>({srcStation})</div>
                                    <h3>
                                        {
                                            calcTime(train.startTime,
                                                train.stations
                                                    .filter((station) => station.stationCode === srcStation)
                                                    .map((station) => station.duration).reduce((a, b) => a + b)
                                            ).time
                                        }</h3>
                                </span>
                                <span className='tl-trvl-time'>
                                    <p>{
                                        Math.floor((train.stations
                                            .filter((station) => station.stationCode === destStation)
                                            .map((station) => station.duration).reduce((a, b) => a + b)
                                            -
                                            train.stations
                                                .filter((station) => station.stationCode === srcStation)
                                                .map((station) => station.duration).reduce((a, b) => a + b)) / 60).toString().padStart(2, '0')
                                        + ':' +
                                        ((train.stations
                                            .filter((station) => station.stationCode === destStation)
                                            .map((station) => station.duration).reduce((a, b) => a + b)
                                            -
                                            train.stations
                                                .filter((station) => station.stationCode === srcStation)
                                                .map((station) => station.duration).reduce((a, b) => a + b)) % 60).toString().padStart(2, '0')
                                    } hours
                                    </p>
                                    <img width="50" height="50" src="https://img.icons8.com/ios/50/long-arrow-right--v1.png" alt="long-arrow-right--v1" />
                                </span>
                                <span className='tl-stn-dest'>
                                    <div>{destStnName}</div>
                                    <div style={{ fontSize: "0.9rem" }}>({destStation})</div>
                                    <h3>
                                        {
                                            calcTime(train.startTime,
                                                train.stations
                                                    .filter((station) => station.stationCode === destStation)
                                                    .map((station) => station.duration).reduce((a, b) => a + b)
                                            ).time
                                        }
                                    </h3>
                                </span>
                            </span>
                        </div>
                    ))
            }
            {
                trains.filter((train: { daysOfOp: any[]; }) => !train.daysOfOp.includes(dayName)).length === 0?
                <div className='tlh-no-trains'>No Trains Found on other days...</div>:
                <></>
            }
            <AnimatePresence mode='wait'>
                {
                    (viewTD !== 0) &&
                    (<motion.div
                        className="view-train-details-window"
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: "0" }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <button
                            className="view-train-details-close-btn"
                            onClick={() => { setViewTD(0) }}
                        >
                            &#10539;
                        </button>
                        <TrainInfo trainNo={viewTD} />
                    </motion.div>)
                }
            </AnimatePresence>
        </motion.div>
    );
};

export default TrainsList;
