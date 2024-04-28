const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes');

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/RailwayReservationDB')

app.use('/api', authRoutes);

app.listen(6969, ()=>{
    console.log("Server is started on port 6969......")
})