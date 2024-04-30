const router = require("express").Router();
const {
  getTrains,
  postTrain,
  getTrain,
  deleteTrain,
} = require("../controllers/train");


router.get("/", getTrains);
router.get("/:id", getTrain);

module.exports = router;
