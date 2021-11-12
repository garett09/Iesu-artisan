/* eslint-disable no-unused-vars */
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const connectDB = require("./server/connection");
const path = require("path");
dotenv.config( { path : "config.env"} )
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const app = express();
const PORT = process.env.PORT || 5000;




app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//connection to mongodb
connectDB();

// displaying the webpages home routes
app.use("/",require("./server/router"))







app.listen(PORT, (req, res) => console.log("Running on port " + PORT));