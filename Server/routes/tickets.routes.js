const router = require("express").Router();
const { createTicket, getTickets, getTicketsByEmail } = require("../controllers/tickets.controllers");

router.post('/tickets', createTicket)
router.post('/getTickets', getTickets)
router.post('/getTicketsByEmail', getTicketsByEmail)

module.exports = router