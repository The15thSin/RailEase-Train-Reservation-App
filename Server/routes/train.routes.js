const router = require("express").Router();
const { getTrains } = require("../controllers/train.controller");

router.post('/trains', getTrains)

module.exports = router;
