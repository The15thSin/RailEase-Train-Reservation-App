import { useEffect, useState } from 'react';
import './TrainSearch.css'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import config from '../../config';

function TrainSearch() {

    const [srcStation, setSrcStation] = useState('');
    const [destStation, setDestStation] = useState('');
    const [doj, setDoj] = useState('');
    const [trainsFound, setTrainsFound] = useState(-1);

    const navigate = useNavigate();

    const today = new Date().toISOString().slice(0, 10);

    const [stationsList, setStationsList] = useState([]);
    async function getStations() {
        const res = await fetch(`${config.BACKEND_URL}/api/stations`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            const stationsData = await getStations();
            setStationsList(stationsData);
        };
        fetchData();
    }, []);

    const stations = stationsList.map((station: { stationCode: string, stationName: string }) => ({
        value: station.stationCode,
        label: `${station.stationName} - ${station.stationCode}`,
    }));

    async function getAvail(trains: string | any[]) {
        let seatAvl = [];
        for (let i = 0; i < trains.length; i++) {
            console.log(trains[i].trainNo, doj);
            const res = await fetch(`${config.BACKEND_URL}/api/availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainNo: trains[i].trainNo,
                    travelDate: doj
                })
            });
            const seat = await res.json();
            seatAvl.push(seat.seatInfo);
            console.log("Seat Response:", trains[i].trainNo, seat);
        }
        return seatAvl
    }

    async function findTrains(event: { preventDefault: () => void }) {
        event.preventDefault()

        const response = await fetch(`${config.BACKEND_URL}/api/trains`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                srcStation,
                destStation,
            })
        })

        // console.log(JSON.stringify({ srcStation, destStation }))

        const data = await response.json()

        let seatData = {};
        if (data.status === 'ok') {
            seatData = await getAvail(data.trains);
            await setTrainsFound(data.trains.length);
            await navigate('/dashboard/train-results', { state: { trains: data.trains, doj: doj, srcStation: srcStation, destStation: destStation, seatData: seatData } });
        } else {
            setTrainsFound(0);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.2 }}
            className='TrainSearch'>
            <div className='ts-head'>
                <h2>Search Trains</h2>
                <form className='ts-form' onSubmit={findTrains}>
                    <div className='ts-form-fields'>
                        <label className='ts-input-label' htmlFor="src">Enter Source Station : </label>
                        <Select
                            className='ts-select-stn ts-input'
                            id="src"
                            options={stations}
                            placeholder="Source"
                            onChange={(newValue) => {
                                if (newValue) { // Check if newValue is not null before accessing its properties
                                    setSrcStation(newValue.value);
                                    setTrainsFound(-1);
                                }
                            }}
                        />
                    </div>

                    <div className='ts-form-fields'>
                        <label className="ts-input-label" htmlFor="dest">Enter Destination Station : </label>
                        <Select
                            className='ts-select-stn ts-input'
                            id="dest"
                            options={stations}
                            placeholder="Destination"
                            onChange={(newValue) => {
                                if (newValue) { // Check if newValue is not null before accessing its properties
                                    setDestStation(newValue.value);
                                    setTrainsFound(-1);
                                }
                            }}
                        />
                    </div>

                    <div className='ts-form-fields'>
                        <label className="ts-input-label" htmlFor="date-of-journey">Date of Journey : </label>
                        <input
                            id="date-of-journey"
                            className='ts-input'
                            type="date"
                            value={doj}
                            onChange={(e) => {
                                setDoj(e.target.value);
                                setTrainsFound(-1);
                            }}
                            placeholder='Enter Date of Journey'
                            min={today}
                            required
                        />
                    </div>

                    <button className='ts-form-submit' type='submit'>
                        Search
                    </button>

                    {
                        trainsFound === 0 ?
                            <motion.div
                                initial={{ opacity: 0, y: "-100px", height: "0px" }}
                                animate={{ opacity: 1, y: "0", height: "auto" }}
                                >
                                <p className='No-trains-found'>No Trains Found</p>
                            </motion.div> :
                            <>
                            </>
                    }

                </form>
            </div>
        </motion.div>
    )
}

export default TrainSearch
