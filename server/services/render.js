const axios = require("axios")
const PORT = process.env.PORT || 3000

exports.homeRoutes = (req, res) => {
    res.render("index");
}
exports.survey = (req, res) => {
    res.render("survey");
}
exports.verification = (req, res) => {
    res.render("verification");
}
exports.viewing = (req, res) => {
    axios.get("http://localhost:" + PORT + "/api/user")
        .then(function (response) {
            console.log(response)
            res.render("viewing", { user: response.data });
        })
        .catch(err => {
            res.send(err)
        })

}
