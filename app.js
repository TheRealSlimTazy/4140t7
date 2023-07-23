const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoute = require("./api/routes/routes");
const mongoUrl = "mongodb+srv://root:root@tut7.bleep5c.mongodb.net/?retryWrites=true&w=majority";
const rootRoute = "/api";

mongoose.connect(mongoUrl, {useNewUrlParser: true})
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err)=> {
    console.log("Connection failed". err) 
})


app.use(express.json());

app.use(rootRoute,userRoute);

app.use("/", (req,res) => {
    return res.status(404).json({
        message: "Route not found",
        success: false
    })
})


module.exports = app;