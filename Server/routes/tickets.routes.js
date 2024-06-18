const router = require("express").Router();
// const { createTicket, getTickets, getTicketsByEmail } = require("../controllers/tickets.controllers");
const { createTicket, getTickets, getTicketsByEmail, getPNRStatus } = require("../controllers/tickets.controllers.js");


router.post('/tickets', createTicket)  // for creating ticket
router.post('/getTickets', getTickets)  // for printing ticket
router.post('/getTicketsByEmail', getTicketsByEmail)  //for getting ticket by email
router.post('/checkPNR', getPNRStatus)

module.exports = router