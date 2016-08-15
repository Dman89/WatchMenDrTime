'use strict';
var express = require('express');
var User = require("../models/user");
var goalRouter = express.Router();
//ALL USERS ON CALL
goalRouter.get("/users", function(req, res) {
  var id = req.params.id;
  var user = req.body;
  User.find({}, function(err,users) {
    if (err) {
      console.error("Oh Shucks!");
      return res.status(500).json({"message": err.message})
    }
      res.json({"users": users});
  })
})
//Get Profile
goalRouter.get('/profile', function(req, res) {
  if (req.user == undefined) {
    res.status(401).json({message: "Please Log In"})
  } else {
    var id = req.user._id;
  User.findOne({_id: id}, function(err, user) {
    if (err) {
      console.log('Oh Shucks!');
      return res.status(500).json({message: err.message});
    }
    if (user == undefined) {
      res.status(404).json({"message": "Not a User"})
    } else {
    res.json({"user":user});
  }
  })
}
});
// POST SINGLE ITEM
goalRouter.post("/users/:id", function(req, res) {
  var id = req.params.id;
  var user = req.body;
  if (user && user._id !== id) {
    console.log("Please Login");
    return res.status(401).json({err: "Login"})
  }
  User.findByIdAndUpdate(id, user, {new: true}, function(err, user) {
    if (err) {
      return res.status(500).json({"err": err.message})
    }
    res.send({'user': user, 'message':'Updated'})
  })
})
//PUT SINGLE ITEM
goalRouter.put("/users", function(req, res) {
  var id = req.params.id;
  var user = req.body;
  User.findByIdAndUpdate(id, user, {new: true}, function(err, user) {
    if (err) {
        return res.status(500).json({"err": err.message, 'message':'Profile Failed Updated'});
    }
    res.send({'user': user, 'message':'Profile Updated'});
  })
})

module.exports = goalRouter;
