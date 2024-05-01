import { useLocation } from 'react-router-dom';
import './TrainsList.css'

interface Train {
    _id: string;
    trainName: string;
    trainNo: number;
    daysOfOp: Array<string>;
}

function TrainsList() {
    const location = useLocation();
    const { trains, doj } = location.state;
    console.log(trains)

    const dateString = doj;
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[dayIndex];


    return (
        <div className='TrainsList-container'>
            <h2 className='tl-heading'>Train List</h2>
            <p className='tl-doj'>Date of Journey : {doj}</p>
            <p className='tl-day'>Day of Journey : {dayName}</p>
            <ul className='tl-trains-info'>
                {trains
                    .filter((train: Train) => train.daysOfOp.includes(dayName))
                    .map((train: Train) => (
                    <li className="tl-train" key={train._id}>
                        Train Name: {train.trainName}, Train No: {train.trainNo}
                    </li>
                ))}
            </ul>
            <h4>Trains running on other days</h4>
            <ul className='tl-other-trains-info'>
                {trains
                    .filter((train: Train) => !train.daysOfOp.includes(dayName))
                    .map((train: Train) => (
                    <li className="tl-other-train" key={train._id}>
                        Train Name: {train.trainName}, Train No: {train.trainNo}, Runs On: {train.daysOfOp.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainsList;
