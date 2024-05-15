import { useEffect, useState } from 'react';
import './TrainSearch.css'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function TrainSearch() {

    const [srcStation, setSrcStation] = useState('');
    const [destStation, setDestStation] = useState('');
    const [doj, setDoj] = useState('');
    const [trains, setTrains] = useState([]);

    const navigate = useNavigate();

    const today = new Date().toISOString().slice(0, 10);

    // const stations = [
    //     { value: 'DEL', label: 'DEL', },
    //     { value: 'KAN', label: 'KAN', },
    //     { value: 'HWH', label: 'HWH', },
    //     { value: 'd', label: 'd', },
    //     { value: 'e', label: 'e', },
    //     { value: 'f', label: 'f', },
    //     { value: 'g', label: 'g', },
    //     { value: 'h', label: 'h', }
    // ]

    const [stationsList, setStationsList] = useState([]);
    async function getStations() {
        const res = await fetch('http://localhost:6969/api/stations');
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

    const stations = stationsList.map((station: {stationCode: string, stationName: string}) => ({
        value: station.stationCode,
        label: `${station.stationName} - ${station.stationCode}`,
      }));
    // console.log(stations)


    async function getAvail(trains: string | any[]) {
        let seatAvl = [];
        for (let i = 0; i < trains.length; i++) {
            console.log(trains[i].trainNo, doj);
            const res = await fetch('http://localhost:6969/api/availability', {
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
        const seatData = seatAvl;
        return seatData;
    }

    async function findTrains(event: { preventDefault: () => void }) {
        event.preventDefault()

        const response = await fetch('http://localhost:6969/api/trains', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                srcStation,
                destStation,
            })
        })

        console.log(JSON.stringify({ srcStation, destStation }))

        const data = await response.json()

        const seatData = await getAvail(data.trains);

        if (data.status === 'ok') {
            await setTrains(data.trains);
            // console.log(trains)
            await navigate('/dashboard/train-results', { state: { trains: data.trains, doj: doj, srcStation: srcStation, destStation: destStation, seatData: seatData } });
        } else {
            alert('No trains found')
            setTrains([]);
        }
    }

    return (
        <div className='TrainSearch'>
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
                                }
                            }}
                        />
                    </div>

                    <div className='ts-form-fields'>
                        <label className="ts-input-label" htmlFor="dest">Enter Source Station : </label>
                        <Select
                            className='ts-select-stn ts-input'
                            id="dest"
                            options={stations}
                            placeholder="Destination"
                            onChange={(newValue) => {
                                if (newValue) { // Check if newValue is not null before accessing its properties
                                    setDestStation(newValue.value);
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
                                setDoj(e.target.value)
                            }}
                            placeholder='Enter Date of Journey'
                            min={today}
                            required
                        />
                    </div>

                    <button className='ts-form-submit' type='submit'>
                        Search
                    </button>

                </form>
            </div>
        </div>
    )
}

export default TrainSearch
