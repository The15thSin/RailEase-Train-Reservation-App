const router = require("express").Router();
const { getAvail } = require("../controllers/seatsAvail.controllers");

router.use('/availability', getAvail)

module.exports = router