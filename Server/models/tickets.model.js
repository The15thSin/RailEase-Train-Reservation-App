const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    pnr:{
      type: Number,
      required: true,
      unique:true
    },
    trainNo: {
      type: Number,
      ref: "Train",
      required: true,
    },
    trainName: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
    boardingPoint: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    coach: {
      type: String,
      enum: ["ac2", "ac3", "sl"],
      required: true,
    },
    passengerDetails: [
      {
        name: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        gender: {
          type: String,
          enum: ["Male", "Female", "Gay"],
          required: true,
        },
      },
    ],
    bookingDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    ticketStatus: {
      type: String,
      enum: ["Confirmed", "RAC", "Waiting"],
      required: true,
      default: "Confirmed",
    },
    fare: {
      type: Number,
      required: true,
    }
  },
  { collection: "tickets" }
);

module.exports = mongoose.model("Ticket", ticketSchema);
