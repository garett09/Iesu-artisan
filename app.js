const express = require("express");
const { google } = require('googleapis');
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
/*
app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: true}));

app.get("/", (req,res) => {
    res.render("index")
}
*/
app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.get("/survey", (req, res) => {
    res.render("survey.ejs")
});

app.get("/verification", (req, res) => {
    res.render("verification.ejs")
});
app.post("/survey", async (req, res) => {
    const { likert, likert1, likert2 } = req.body;

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    //create client instance for auth
    const client = await auth.getClient();

    // instance of google sheets api

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1HrUAO8EfE4TanTL1vcaV-HCmaiKLvQZmE6yhDaQn8Rk"

    // get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    // Read rows from spreadsheet

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:C"
    });;

    // Write row(s) to spreadsheet

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[likert, likert1, likert2]],
        },
    });

    res.send(res.render("verification"))
})

app.listen(1337, (req, res) => console.log("Running on port 1337"))