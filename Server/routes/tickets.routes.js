const router = require("express").Router();
const { createTicket, getTickets, cancelTicketByPnr, getTicketByPnr } = require("../controllers/tickets.controllers");

router.post('/ticket',createTicket)
router.get('/getTickets', getTickets)
router.get('/getTickets/:pnr', getTicketByPnr)
router.delete('/cancelTicket/:pnr', cancelTicketByPnr)

module.exports = router