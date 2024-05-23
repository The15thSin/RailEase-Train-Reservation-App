const router = require("express").Router();
const { getTrains, getTrainInfoByNumber } = require("../controllers/train.controller");

router.post('/trains', getTrains)
router.post('/getTrainInfoByNumber', getTrainInfoByNumber)

module.exports = router;
