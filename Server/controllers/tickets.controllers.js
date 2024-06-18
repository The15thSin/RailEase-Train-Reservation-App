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
    // const ticket = new Ticket();
    console.log("Ticket object:", req.body);
    const newTicket = await Ticket.create({
      pnr: generateRandomNumberPnr(),
      trainNo: req.body.trainNo,
      trainName: req.body.trainName,
      userEmail: req.body.userEmail,
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
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(
      {
        "pnr": req.body.pnr
      }
    );
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// Get ticket by Email(User)
const getTicketsByEmail = async (req, res) => {
  try {
    console.log(req.body.userEmail);
    const tickets = await Ticket.find({
      userEmail: req.body.userEmail
    });
    if (!tickets) {
      return res.status(404).json({ error: "No Tickets found" });
    }
    console.log("Tickets : ", tickets);
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching ticket by Email:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

// Cancel ticket
const deleteTicketById = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ticket by ID:", error);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};

const getPNRStatus = async (req, res) => {
  console.log("get pnr api hitted")
  try {
    const ticket = await Ticket.findOne({ pnr: req.body.pnr });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  return res.status.json
}

module.exports = {
  createTicket,
  getTickets,
  getTicketsByEmail,
  deleteTicketById,
  getPNRStatus
}
