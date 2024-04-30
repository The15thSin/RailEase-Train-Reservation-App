const train = require("../models/trains");

/*
method: GET
route : api/train/
description: returns all the trains
*/
const getTrains = async (req, res) => {
  await train
    .find({})
    .sort({ startDate: -1 })
    .then((trains) => {
      return res.status(200).json({
        trains,
      });
    })
    .catch((err) => console.log(err));
};

/*
method: GET
route : api/train/:id
description: returns a single train based on id
*/
const getTrain = async (req, res) => {
  const { id } = req.params;

  //validation
  if (!id) return res.status(400).json({ msg: "Id not found" });

  const outTrain = await train.findOne({
    _id: id,
  });

  if (!outTrain) return res.json({ msg: "Train Does not exist" });

  res.json({
    id: outTrain._id,
    name: outTrain.name,
    users: outTrain.users,
    destination: outTrain.destination,
    startpoint: outTrain.startpoint,
    startDate: outTrain.startDate,
    reachDate: outTrain.reachDate,
    price: outTrain.price,
  });
};


module.exports = { getTrains, getTrain };
