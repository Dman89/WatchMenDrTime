'use strict';
// If you're reading this, you're amazing!
// Keep up the focused work
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
// POST New ITEM
goalRouter.post("/users", function(req, res) {
  var user = req.body;
  User.findByIdAndUpdate(id, user, {new: true}, function(err, user) {
    if (err) {
      return res.status(500).json({"err": err.message})
    }
    res.send({'user': user, 'message':'Updated'})
  })
})
//PUT SINGLE ITEM (ADMIN)
goalRouter.put("/users/:id", function(req, res) {
  var id = req.params.id;
  var user = req.body;
  if (user._id == id) {
    console.log("Wrong ID");
    return res.status(401).json({err: "Wrong ID"})
  }
  User.findByIdAndUpdate(id, user, {new: true}, function(err, user) {
    if (err) {
        return res.status(500).json({"err": err.message, 'message':'Profile Failed Updated'});
    }
    res.send({'user': user, 'message':'Profile Updated'});
  })
})
//PUT SINGLE ITEM
goalRouter.put("/profile", function(req, res) {
  var id = req.body._id;
  var user = req.body;
  User.findByIdAndUpdate(id, user, {new: true}, function(err, user) {
    if (err) {
        return res.status(500).json({"err": err.message, 'message':'Profile Failed Updated'});
    }
    res.send({'user': user, 'message':'Profile Updated'});
  })
})
// Delete User
goalRouter.delete('/users/id/:id', function (req, res) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({message: err.message})
    } else {
      res.json({message: 'Deleted User'});
      console.log('Deleted User');
    }
  })
})

module.exports = goalRouter;
