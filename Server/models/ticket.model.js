const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    pnr:{
      type: Number,
      required: true,
      unique:true
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
    seatClass: {
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
          enum: ["Male", "Female", "Other"],
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
  },
  { collection: "tickets" }
);

module.exports = mongoose.model("Ticket", ticketSchema);
