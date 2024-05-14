const router = require("express").Router();
const { getStations } = require("../controllers/stations.controllers");

router.get('/stations', getStations)

module.exports = router