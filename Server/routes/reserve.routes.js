const express = require("express");
const router = express.Router();
const Train = require("../models/train.model");

router.post("/reserve", async (req, res) => {
  const {
    trainNo,
    departureStation,
    destinationStation,
    travelDate,
    seatClass,
    passengerDetails,
  } = req.body;

  try {
    // Find the train in MongoDB
    const train = await Train.findOne({ trainNo });

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Validate travel date
    const travelDay = new Date(travelDate).toLocaleString("en-GB", {
      weekday: "short",
    });
    if (!train.daysOfOp.includes(travelDay)) {
      return res
        .status(400)
        .json({ message: "Train does not operate on the selected day" });
    }

    // Check seat availability
    if (train.seats[seatClass] <= 0) {
      return res
        .status(400)
        .json({ message: "No seats available in the selected class" });
    }

    // Deduct a seat
    train.seats[seatClass]--;

    // Save the updated train data to MongoDB
    await train.save();

    // Confirm booking
    const bookingConfirmation = {
      bookingID: Math.floor(Math.random() * 1000000), // Random booking ID
      trainName: train.trainName,
      departureStation,
      destinationStation,
      travelDate,
      seatClass,
      passengerDetails,
      message: "Booking confirmed!",
    };

    res.status(200).json(bookingConfirmation);
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
