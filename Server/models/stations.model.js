const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    stationCode: { type: String, required: true },
    stationName: { type: String, required: true },
},
{ collection: "stations" });

const Stations = mongoose.model("Stations", stationSchema)

module.exports = Stations