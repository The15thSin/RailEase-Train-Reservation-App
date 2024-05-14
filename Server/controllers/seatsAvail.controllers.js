const ticketSchema = require('../models/tickets.model')

const getAvail = async (req, res) => {
    console.log("Temp controller was hitted")
    try {
        console.log("Ticket object:", req.body);
        const tickets = await ticketSchema.aggregate([
            {
                $match: {
                    trainNo: req.body.trainNo,
                    travelDate: new Date(req.body.travelDate),
                }
            }
        ]);
        console.log(tickets)
        let ac2_booked = 0;
        let ac3_booked = 0;
        let sl_booked = 0;
        for (let i = 0; i < tickets.length; i++) {
            if (tickets[i].coach === "ac2") {
                ac2_booked += tickets[i].passengerDetails.length;
            }
            if (tickets[i].coach === "ac3") {
                ac3_booked += tickets[i].passengerDetails.length;
            }
            if (tickets[i].coach === "sl") {
                sl_booked += tickets[i].passengerDetails.length;
            }
        }
        console.log(ac2_booked, ac3_booked, sl_booked)
        const seatInfo={ 
            "trainNo": req.body.trainNo, 
            "seats":{
                "sl": sl_booked, 
                "ac3": ac3_booked, 
                "ac2": ac2_booked 
            }
        }
        res.json({ status: "ok", seatInfo });
        console.log(seatInfo)
    } catch (err) {
        res.status(500).json(err);
    }
    return res.status.json;
}

module.exports = { getAvail }