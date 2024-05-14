const Stations = require("../models/stations.model");

const getStations = async (req, res) => {
    try {
        const stations = await Stations.find().sort({ stationName: 1 });
        res.status(200).json(stations);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStations }