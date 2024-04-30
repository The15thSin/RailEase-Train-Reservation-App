const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  destination: {
    type: String,
    maxlength: 100,
  },
  startpoint: {
    type: String,
    maxlength: 100,
  },
  startDate: {
    type: Date,
  },
  reachDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
},
{collation: "trains"});

module.exports = mongoose.model("Train", trainSchema);
