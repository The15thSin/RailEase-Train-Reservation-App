const Stations = require("../models/station.model");

const getStations = async (req, res) => {
    try {
        const stations = await Stations.find().sort({ stationName: 1 });
        res.status(200).json(stations);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStnName = async (req, res) => {
    try {
        const stations = await Stations.find(
            { stationCode: req.body.stationCode },
        );
        res.status(200).json(stations);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    return res.status.json;
}

module.exports = { getStations, getStnName }