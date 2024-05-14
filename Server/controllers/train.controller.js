const TrainSchema = require("../models/train.model");
const tickets = require("../models/tickets.model")

const getTrains = async (req, res) => {
  console.log(req.method)
  console.log(req.body)
  const { srcStation, destStation } = req.body;
  try {
    // Query logic to find trains
    const trains = await TrainSchema.aggregate([
      {
        $match: {
          "stations.stationCode": srcStation,
          "stations.stationCode": destStation
        },
      },
      {
        $addFields: {
          srcIndex: { $indexOfArray: ["$stations.stationCode", srcStation] },
          destIndex: { $indexOfArray: ["$stations.stationCode", destStation] }
        }
      },
      {
        $match: {
          $expr: { $lt: ["$srcIndex", "$destIndex"] }
        }
      }
    ]);

    if (trains.length === 0) {
      res.status(500).json({ message: 'No trains found' });
    } else {
      res.json({ status: "ok", trains });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching trains" })
  }
  // return (res.json({status: 'ok'}))
  return res.status.json
}

module.exports = { getTrains };

