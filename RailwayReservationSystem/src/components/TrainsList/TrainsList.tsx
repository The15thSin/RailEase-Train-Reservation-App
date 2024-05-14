import { useLocation, useNavigate } from 'react-router-dom';
import './TrainsList.css'

function TrainsList() {
    const location = useLocation();
    const { trains, doj, srcStation, destStation, seatData } = location.state;
    console.log(trains)
    console.log(seatData)

    const dateString = doj;
    console.log(dateString)
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[dayIndex];

    const navigate = useNavigate();
    
    async function handleBookSeat(
        train:
        {
            key: string | undefined;
            trainNo: number | null | undefined;
            trainName: string | null | undefined;
            daysOfOp: any[];
            stations: {
                arrTime: string | null | undefined;
                deptTime: string | null | undefined;
            }[];
            travelTime: string | null | undefined;
            seats: {
                sl: number | null | undefined;
                ac3: number | null | undefined;
                ac2: number | null | undefined;
            };
        },
        coach: string
    ) {
        navigate('/dashboard/book-seat', { state: { train: train, coach: coach, doj: doj, srcStation, destStation } });


    }

    return (
        <>
            <div className="TrainsList-container">
                <h2 className='tlh-heading'> Trains running from
                    <p className='tlh-src-dest'>{srcStation}</p>
                    <img width="16" height="16" src="https://img.icons8.com/color/20/arrow--v1.png" alt="arrow--v1" />
                    <p className='tlh-src-dest'>{destStation}</p>
                    :
                    <p className='tlh-doj'>{dayName}, {doj}</p>
                </h2>
            </div>

            {
                trains.map((train: {
                    key: string | undefined;
                    trainNo: number ;
                    trainName: string | null | undefined;
                    daysOfOp: any[];
                    stations: {
                        arrTime: string | null | undefined,
                        deptTime: string | null | undefined
                    }[];
                    travelTime: string | null | undefined;
                    seats: {
                        sl: number | null | undefined;
                        ac3: number | null | undefined;
                        ac2: number | null | undefined;
                    };
                }) => (
                    <div key={train.trainNo} className='TrainsList-container'>
                        <p className='train-no-name-dot'>
                            <p>{train.trainNo} - {train.trainName}</p>
                            <p className='tl-doj'><p style={{ color: "rgb(0, 151, 0)", fontSize: "0.9rem" }}>Runs on: </p> {train.daysOfOp.join(', ')}</p>
                        </p>
                        <span className='tl-stn-time'>
                            <span className='tl-stn-src'>
                                <div>{srcStation}</div>
                                <h3>{train.stations[0].arrTime}</h3>
                                <p style={{ fontSize: "0.7rem" }}>{doj}</p>
                            </span>
                            <span className='tl-trvl-time'>
                                <p>{train.travelTime}</p>
                                <img width="50" height="50" src="https://img.icons8.com/ios/50/long-arrow-right--v1.png" alt="long-arrow-right--v1" />
                            </span>
                            <span className='tl-stn-dest'>
                                <div>{destStation}</div>
                                <h3>{train.stations[2].arrTime}</h3>
                            </span>
                        </span>
                        <div className='tl-seats'>
                            <span className="tl-seat-blocks">
                                <p className='tlsb-coach'>SL</p>
                                <p className='tlsb-availability'>
                                    <span>
                                    {(train.seats.sl !== undefined && train.seats.sl !== null && train.seats.sl  - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.sl > 0)
                                        ?
                                        <p style={{ color: "green" }}>Available - #{
                                            train.seats.sl 
                                            - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.sl
                                        }</p>
                                        :
                                        <p style={{ color: "red" }}>Not Available</p>
                                    }
                                    </span>
                                </p>
                                {(train.seats.sl !== undefined && train.seats.sl !== null && train.seats.sl  - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.sl  > 0)
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

                                    {(train.seats.ac3 !== undefined && train.seats.ac3 !== null && train.seats.ac3 - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.ac3  > 0)
                                        ?
                                        <p style={{ color: "green" }}>Available - #{train.seats.ac3
                                            - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.ac3
                                        }</p>
                                        :
                                        <p style={{ color: "red" }}>Not Available</p>
                                    }
                                    </span>
                                </p>
                                {(train.seats.ac3 !== undefined && train.seats.ac3 !== null && train.seats.ac3 - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.ac3 > 0)
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
                                        
                                    {(train.seats.ac2 !== undefined && train.seats.ac2 !== null && train.seats.ac2 - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.ac2 > 0)
                                        ?
                                        <p style={{ color: "green" }}>Available - #{train.seats.ac2
                                            - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.ac2
                                        }</p>
                                        :
                                        <p style={{ color: "red" }}>Not Available</p>
                                    }
                                    </span>
                                </p>
                                {(train.seats.ac2 !== undefined && train.seats.ac2 !== null && train.seats.ac2  - seatData.find((data: { trainNo: number; })=> data.trainNo === train.trainNo).seats.ac2  > 0)
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
        </>
    );
};

export default TrainsList;
