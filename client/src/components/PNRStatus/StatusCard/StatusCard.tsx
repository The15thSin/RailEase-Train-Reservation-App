import { motion } from 'framer-motion'
import './StatusCard.css'

function StatusCard({ status, extras }: any) {
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
    let src = calcTime(extras.startTime, extras.src)
    console.log(src)
    let dest = calcTime(extras.startTime, extras.dest)
    console.log(dest)

    const calcDate = (doj: Date, day: number) => {
        // console.log(doj)
        let newDate = new Date(doj.getTime() + day * 24 * 60 * 60 * 1000)
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate);
        const date = newDate.getDate().toString().padStart(2, '0');
        const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(newDate);
        let dateInfo = {
            weekDay: weekDay,
            date: date,
            month: month
        }
        return (dateInfo);
    }

    let srcDate = calcDate(new Date(status.travelDate), src.day)
    let destDate = calcDate(new Date(status.travelDate), dest.day)
    console.log(srcDate, destDate)


    return (
        <motion.div
            className='status-card'
            initial={{ opacity: 0, y: "-60%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-60%" }}
            transition={{ duration: 0.2 }}>
            <div className='sc-train'>
                <h3>{status.trainNo} - {status.trainName}</h3>
            </div>

            <div className="sc-schedule">
                <span className='sc-sch sc-sch-src'>
                    <h3>{src.time}</h3>
                    <p className='sc-sch-stn'>{extras.boardingStnName}</p>
                    <p>{srcDate.weekDay}, <strong>{srcDate.date} {srcDate.month}</strong></p>
                </span>
                <span className='sc-sch sc-sch-dist'>
                    <img width="40" height="40" src="https://img.icons8.com/pastel-glyph/64/555555/drag-left-arrow.png" alt="drag-right-left" />
                    <p>{extras.distance} km</p>
                    <img width="40" height="40" src="https://img.icons8.com/pastel-glyph/64/555555/drag-right-arrow.png" alt="drag-right-arrow" />
                </span>
                <span className='sc-sch sc-sch-dest'>
                    <h3>{dest.time}</h3>
                    <p className='sc-sch-stn'>{extras.destStnName}</p>
                    <p>{destDate.weekDay}, <strong>{destDate.date} {destDate.month}</strong></p>
                </span>
            </div>

            <div className='sc-pnr-no'>
                <div>
                    <img width="40" height="40" src="https://img.icons8.com/color/96/pnr-code.png" alt="pnr-code" />
                </div>
                <div>
                    <h4>PNR- {status.pnr}</h4>
                    <p>Class - <strong>{status.coach.toUpperCase()}</strong></p>
                </div>
            </div>

            <div className='sc-pass-det'>
                <table className='sc-pdet-table'>
                    <colgroup>
                        <col style={{ width: '40%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '40%' }} />
                    </colgroup>
                    <tbody>

                        <tr className='sct-head'>
                            <th>Passenger Details</th>
                            <th></th>
                            <th>Current Status</th>
                        </tr>
                        {
                            status.passengerDetails.map((passenger: any) => {
                                return (
                                    <tr className='sct-body'>
                                        <td>
                                            <div>
                                                <img width="16" height="16" src="https://img.icons8.com/fluency-systems-filled/48/ffa500/user.png" alt="user" />
                                                <p>
                                                    {passenger.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td className={status.ticketStatus === "Confirmed"? "sct-status-confirmed": "sct-status-cancelled"}>
                                            {status.ticketStatus}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

export default StatusCard
