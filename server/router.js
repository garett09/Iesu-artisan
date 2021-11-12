var express = require("express");
var route = express.Router()

var services = require("../server/render");
var controller = require("../server/controller")

  route.get("/",services.homeRoutes);

  route.get("/survey", services.survey);
  
  route.get("/verification", services.verification);

  route.get("/viewing", services.viewing);

  //API
  route.post("/api/user", controller.create);
  route.get("/api/user",controller.find)
 

  module.exports = route