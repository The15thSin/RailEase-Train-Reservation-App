import { useEffect, useState } from 'react';
import './TrainInfo.css'
import config from '../../config.ts'
import Loader from '../Loading/Loading.tsx';

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

function TrainInfo(props: { trainNo: any }) {
    const [isLoading, setIsLoading] = useState(true);
    async function getTrainData() {
        const res = await fetch(`${config.BACKEND_URL}/api/getTrainInfoByNumber`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trainNo: props.trainNo
            }),
        })
        const data = await res.json()
        return data;
    }

    const [trainInfo, setTrainInfo] = useState<Train>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrainData();
            setTrainInfo(data);
        };
        fetchData();
    }, [props.trainNo])

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
        if (data && data.length > 0) {
            const stnName = await data[0].stationName;
            return stnName;
        }
    }

    const [srcStnName, setSrcStnName] = useState<string | null>(null);
    const [destStnName, setDestStnName] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStnName(trainInfo?.stations[0].stationCode || 'default');
            const data2 = await getStnName(trainInfo?.stations[trainInfo?.stations.length - 1].stationCode || 'default');
            setSrcStnName(data);
            setDestStnName(data2);
            await setIsLoading(false)
        };
        fetchData();
    }, [trainInfo])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrainData();
            const stationsWithNames = await Promise.all(data.stations.map(async (station: { stationCode: string; }) => {
                const name = await getStnName(station.stationCode);
                return { ...station, stationName: name };
            }));
            setTrainInfo({ ...data, stations: stationsWithNames });
        };
        fetchData();
    }, [props.trainNo])

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

    return (
        <div className="TrainInfo">
            {isLoading && <Loader />}
            <table className='ti-upper-table'>
                <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>Train Number</th>
                        <th>Train Name</th>
                        <th>Source Station</th>
                        <th>Destination Station</th>
                        <th>Runs On</th>
                    </tr>
                    <tr>
                        <td>{trainInfo?.trainNo}</td>
                        <td>{trainInfo?.trainName} {trainInfo?.trainType}</td>
                        <td>{srcStnName} - {trainInfo?.stations[0].stationCode}</td>
                        <td>{destStnName} - {trainInfo?.stations[trainInfo?.stations.length - 1].stationCode}</td>
                        <td>{trainInfo?.daysOfOp.join(", ")}</td>
                    </tr>
                </tbody>
            </table>
            <table className='ti-lower-station-table'>
                <colgroup>
                    <col style={{width: "5%"}}/>
                    <col style={{width: "10%"}}/>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "12%"}}/>
                    <col style={{width: "12%"}}/>
                    <col style={{width: "5%"}}/>
                    <col style={{width: "5%"}}/>
                    <col style={{width: "5%"}}/>
                </colgroup>
                <tbody>
                    <tr>
                        <th>S. No.</th>
                        <th>Station Code</th>
                        <th>Station Name</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Halt (in Minutes)</th>
                        <th>Distance</th>
                        <th>Day</th>
                    </tr>
                    {
                        trainInfo?.stations.map((station, index) => {
                            return (
                                <tr className='ti-lower-station-table-row'
                                    key={index}>
                                    <td>{index + 1}</td>
                                    <td>{station.stationCode}</td>
                                    <td>{station.stationName}</td>
                                    <td>
                                        {
                                            (index === 0)?<>--</>:
                                            calcTime(trainInfo?.startTime, station.duration).time
                                        }
                                    </td>
                                    <td>
                                        {
                                            (index === trainInfo.stations.length - 1)?<>--</>:
                                            calcTime(trainInfo.startTime,station.duration + station.halt).time
                                        }
                                    </td>
                                    <td>{(station.halt)?<>{station.halt} mins</> :<>--</>}</td>
                                    <td>{station.distance}</td>
                                    <td>{calcTime(trainInfo.startTime, station.duration + station.halt).day+1}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TrainInfo
