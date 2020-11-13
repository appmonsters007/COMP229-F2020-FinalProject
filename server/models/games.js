/*
File name: games.js
Date: November 12, 2020
Web site name: Tournament Site
*/
let mongoose = require('mongoose');

// create a model class
let Game = mongoose.Schema({
    name: String,
    description: String,
    owner: String,
    active: String,
    date: String
},
{
  collection: "games"
});

module.exports = mongoose.model('Game', Game);
