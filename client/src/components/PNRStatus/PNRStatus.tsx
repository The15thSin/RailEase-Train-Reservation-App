import { useEffect, useState } from 'react';
import './PNRStatus.css';
import config from '../../config';
import StatusCard from './StatusCard/StatusCard';
import Loading from '../Loading/Loading';

function PNRStatus() {
    const [isLoading, setIsLoading] = useState(false);
    type PNRStatus = {
        trainNo: number;
        trainName: string;
        userEmail: string;
        boardingPoint: string;
        destination: string;
        travelDate: string;
        coach: string;
        passengerDetails: Array<{ _id: string; name: string; age: number; gender: string }>;
        fare: number;
        ticketStatus: string;
        bookingDate: string;
    };

    const [pnr, setPnr] = useState<number>(NaN);
    const [status, setStatus] = useState<PNRStatus>({
        trainNo: 0,
        trainName: '',
        userEmail: '',
        boardingPoint: '',
        destination: '',
        travelDate: '',
        coach: '',
        passengerDetails: [],
        fare: 0,
        ticketStatus: '',
        bookingDate: ''
    });
    const [pnrError, setPnrError] = useState("")

    const validateInput = (inputValue: number) => {
        if(Number.isNaN(inputValue)){
            return -1;
        }
        else if (inputValue < 10000000) {
            setPnrError('Please enter 8 digits.');
            setIsLoading(false);
            return -1;
        } else if (inputValue > 99999999) {
            setPnrError('Maximum of 8 digits allowed.');
            setIsLoading(false);
            return -1;
        } else {
            setPnrError('');
            return 1;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        if (validateInput(pnr) !== -1) {
            console.log(pnr);
            const res = await fetch(`${config.BACKEND_URL}/api/checkPNR`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pnr: pnr })
            })
            if (res.status === 404) {
                setPnrError("PNR not found. Please enter correct PNR number.");
                setIsLoading(false)
                return
            }
            else {
                const ticket = await res.json();
                console.log(ticket)
                setStatus(ticket);
                return ticket;
            }
        }
    }

    type Extras = {
        boardingStnName: string
        destStnName: string
        src: string
        dest: string
        startTime: string
        distance: number
    };

    const [extraData, setExtraData] = useState<Extras>({
        boardingStnName: "",
        destStnName: "",
        src: "",
        dest: "",
        startTime: "",
        distance: 0,
    });

    useEffect(() => {
        if(status.trainNo === 0) return
        console.log("UseEffect is called...")
        async function getStnName(stationCode: string) {
            const res = await fetch(`${config.BACKEND_URL}/api/getStnName`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ stationCode }),
            })
            const data = await res.json()
            console.log("station name : ", data)
            return data;
        }

        async function getTrainDetails(trainNo: number) {
            const res = await fetch(`${config.BACKEND_URL}/api/getTrainInfoByNumber`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ trainNo: trainNo }),
            })
            const data = await res.json()
            console.log("train data : ", data)
            return data;
        }

        const fetchData = async () => {
            const boardingStnName = await getStnName(status.boardingPoint)
            const destStnName = await getStnName(status.destination)
            const trainInfo = await getTrainDetails(status.trainNo)
            let src = await trainInfo.stations.filter((station: { stationCode: string; }) => station.stationCode === status.boardingPoint)
            let startTime = await trainInfo.startTime
            let dest = await trainInfo.stations.filter((station: {stationCode: string;}) => station.stationCode === status.destination)
            let distance = await trainInfo.stations.filter((station: { stationCode: string; }) => station.stationCode === status.destination)[0].distance - trainInfo.stations.filter((station: { stationCode: string; }) => station.stationCode === status.boardingPoint)[0].distance
            await setExtraData({
                boardingStnName: boardingStnName[0].stationName,
                destStnName: destStnName[0].stationName,
                src: src[0].duration,
                dest: dest[0].duration,
                startTime: startTime,
                distance: distance
            })
            await console.log(extraData)
            await setIsLoading(false);
        }
        fetchData();

    }, [status])

    return (
        <div className='pnr-body'>
            {isLoading && <Loading />}
            <div className="pnr-status">
                <div className="pnr-form-container">
                    <p>PNR Status</p>
                    <form className='pnr-form' onSubmit={handleSubmit}>
                        <input
                            className='pnr-input'
                            placeholder='Enter 8 digit PNR Number'
                            type="number"
                            id="pnr"
                            value={pnr}
                            onChange={(e) => {
                                const limitedValue = e.target.value.substring(0, 8);
                                setPnr(parseInt(limitedValue))
                            }}
                            required
                            minLength={8}
                            maxLength={8}
                        />
                        <button className="pnr-submit-btn" type="submit">Check PNR Status</button>
                    </form>
                    <div className="pnr-error">
                        {pnrError}
                    </div>
                </div>
            </div>
            {
                status.trainNo !== 0 && <StatusCard status={status} extras = {extraData} />
            }
        </div>
    )
}

export default PNRStatus
