const Ticket = require("../models/ticket.model");

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

// Delete ticket
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

module.exports={
    createTicket,
    getAllTickets,
    getTicketById,
    deleteTicketById
}