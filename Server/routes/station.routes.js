const router = require("express").Router();
const { getStations, getStnName } = require("../controllers/station.controllers");

router.get('/stations', getStations)
router.use('/getStnName', getStnName)

module.exports = router