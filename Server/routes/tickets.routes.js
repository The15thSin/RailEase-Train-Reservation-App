const router = require("express").Router();
const { createTicket, getTickets } = require("../controllers/tickets.controllers");

router.post('/tickets', createTicket)
router.post('/getTickets', getTickets)

module.exports = router