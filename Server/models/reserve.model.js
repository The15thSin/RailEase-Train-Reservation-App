const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "train",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
},
{collection: "reserves"});

module.exports = mongoose.model("Reserve", reserveSchema);
