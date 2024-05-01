const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema(
  {
    trainNo: { type: Number, unique: true, length: 5, required: true},
    trainName: { type: String, maxlength: 100, required: true },
    stations: [{
                serialNo: { type: Number, required: true },
                stationCode: { type: String, required: true },
                arrTime: { type: String, required: true},
                deptTime: { type: String }
              }],
    travelTime: { type: String, required: true},
    trainType: { type: String, required: true},
    seats: { type: 
            {
              ac2: {type: Number, default: 0 },
              ac3: {type: Number, default: 0 },
              sl: {type: Number, default: 0 },
            }, required: true,},
    daysOfOp: { type: [String], enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
  },
  { collection: "trains" }
);

const Trains = mongoose.model("Trains", TrainSchema)

module.exports = Trains


