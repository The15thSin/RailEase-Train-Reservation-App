const TrainSchema = require("../models/train.model");
const tickets = require("../models/tickets.model")

const getTrains = async (req, res) => {
  console.log(req.method)
  console.log(req.body)
  const { srcStation, destStation } = req.body;
  console.log(srcStation)
  console.log(destStation)
  try {
    const trains = await TrainSchema.aggregate([
      {
        $match: {
          "stations.stationCode": { $in: [srcStation] },
        },
        $match: {
          "stations.stationCode": { $in: [destStation] },
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
          $expr: { $and: [{ $ne: ["$srcIndex", -1] }, { $ne: ["$destIndex", -1]  }, {$lt: ["$srcIndex", "$destIndex"]}] }
        }
      }
    ]);

    if (trains.length === 0) {
      res.status(200).json({ message: 'No trains found' });
    } else {
      res.json({ status: "ok", trains });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching trains" })
  }
  return res.status.json
}

const getTrainInfoByNumber = async (req, res) => {
  try {
    console.log(req.body.trainNo)
    const train = await TrainSchema.findOne({ trainNo: req.body.trainNo });
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  return res.status.json
}

module.exports = { getTrains, getTrainInfoByNumber };

