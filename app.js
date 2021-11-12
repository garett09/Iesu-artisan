/* eslint-disable no-unused-vars */
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config( { path : "config.env"} )
const PORT = process.env.PORT || 8080

app.use(morgan("tiny"))
//connection to mongodb
connectDB();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// displaying the webpages home routes
app.use("/",require("./server/routes/router"))


app.listen(PORT, (req, res) => console.log("Running on port " + PORT));