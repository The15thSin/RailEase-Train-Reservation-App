const Ticket = require("../models/tickets.model");

// Create a new ticket

function generateRandomNumberPnr() {
  // Ensure the number has leading zeros if needed
  const pad = (num, size) => String(num).padStart(size, '0');
  const randomNumber = Math.floor(Math.random() * 100000000); // Generate a random 9-digit number
  return pad(randomNumber, 8); // Pad to 8 digits if necessary
}

const createTicket = async (req, res) => {
  try {
    console.log("Ticket object:", req.body);
    const newTicket = await Ticket.create({
      pnr: generateRandomNumberPnr(),
      trainNo: req.body.trainNo,
      trainName: req.body.trainName,
      userID: req.body.userID,
      boardingPoint: req.body.srcStation,
      destination: req.body.destStation,
      travelDate: req.body.doj,
      coach: req.body.coach,
      passengerDetails: req.body.passengers,
      fare: req.body.fare,
    });
    console.log("New Ticket created", newTicket)
    res.status(200).json({ ticketInfo: { newTicket }, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// Get ticket by ID
const getTicketByPnr = async (req, res) => {
  try {
    const ticket = await Ticket.find({pnr: req.params.pnr});
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

const cancelTicketByPnr = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findOneAndDelete({pnr: req.params.pnr});
    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    // res.status(204).end();
    res.status(200).json({message: "ticket has been cancelled!"});
  } catch (error) {
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketByPnr,
  cancelTicketByPnr
}