/* eslint-disable no-unused-vars */
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


//creating a schema for the DB
const feedbackschema = {
    feedBack1: String,
    feedback2: String,
    feedback3: String,
};

//creating a model
const Feedback = mongoose.model("Feedback", feedbackschema);

// displaying the webpages home route
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/survey", (req, res) => {
    res.render("survey");
});
app.get("/verification", (req, res) => {
    res.render("verification");
});

//posting or saving the feedback to the DB
app.post("/survey", urlencodedParser, [
    check("likert", "Please select a value.").exists(),
    check("likert1", "Please select a value.").exists(),
    check("likert2", "Please select a value.").exists()], (req, res) => {
        mongoose.connect("mongodb+srv://admin:123@cluster0.utjgt.mongodb.net/feedback-responses",
            { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (!err) {
                    console.log("MongoDB connection succeeded.");
                } else {
                    console.log("Error in DB connection: " + err);
                }
            });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array();
            res.render("survey", { alert });
        }
        //obtaining details from the form
        const fb1 = req.body.likert;
        const fb2 = req.body.likert1;
        const fb3 = req.body.likert2;

        const item = new Feedback({
            feedBack1: fb1,
            feedback2: fb2,
            feedback3: fb3,
        });
        item.save();
        //redirecting to the homepage
        res.redirect("/verification");
    });

app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`);
});