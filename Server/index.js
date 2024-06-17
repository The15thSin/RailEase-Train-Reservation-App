//packages and modules import
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const createRouter = require("./routes");
require('dotenv').config()

const app=express()
const PORT=process.env.PORT || 8080

//Middleware plugins
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//DB connection
mongoose.connect(process.env.MONGO_URI_S)
    .then(()=>{console.log("Connected to database...")})
    .catch(err => console.log("Error connecting database !!!", err))

//routes
const router = createRouter();
app.use("/api", router);
app.get("/", (req, res) => res.send("Welcome to the backend of Railway-Reservation-System"));

//server execution
app.listen(PORT, ()=>{
    console.log(`Server is started on http://localhost:${PORT}`)
})