const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    stationCode: { type: String, required: true },
    stationName: { type: String, required: true },
},
{ collection: "station" });

const Station = mongoose.model("Station", stationSchema)

module.exports = Station