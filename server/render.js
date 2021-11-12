const axios = require("axios")

exports.homeRoutes = (req,res) =>{
    res.render("index");
}
exports.survey = (req,res) =>{
    res.render("survey");
}
exports.verification = (req,res) =>{
    res.render("verification");
}
exports.viewing = (req,res) =>{ 
    axios.get("http://localhost:3000/api/user")
    .then(function(response){
        console.log(response)
         res.render("viewing",{user:response.data});
    })
    .catch(err =>{
        res.send(err) 
    })

}
