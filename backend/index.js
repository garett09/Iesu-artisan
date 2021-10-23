const express = require ("express");
const {google} = require('googleapis');
const app = express();

app.get("/", async (req,res) => {
    
    const auth = new google.auth.GoogleAuth({
        keyFile: "backend/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
    //create client instance for auth
    const client = await auth.getClient();

    // instance of google sheets api

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1HrUAO8EfE4TanTL1vcaV-HCmaiKLvQZmE6yhDaQn8Rk"

    // get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,

        spreadsheetId,

    });

    res.send(metaData)
})

app.listen(1337, (req, res) => console.log("Running on port 1337"))