const express = require("express");
// const {isAuthenticated} = require("../middlewares/auth.middleware");
const authRoutes = require('../routes/auth.routes')
const trainRoutes = require('../routes/train.routes')
const reserveRoutes = require('../routes/reserve.routes')
const ticketRoutes = require('../routes/tickets.routes')
const seatsAvail = require('../routes/seatsAvail.routes')
const stationsRoutes = require('../routes/station.routes')

const createRouter = () => {
  const router = express.Router();

  // Public routes
  router.use("/", authRoutes);
  router.use("/", trainRoutes);
  router.use("/", reserveRoutes);
  router.use("/", ticketRoutes);
  router.use("/", seatsAvail);
  router.use("/", stationsRoutes);

  return router;
};

module.exports = createRouter;
