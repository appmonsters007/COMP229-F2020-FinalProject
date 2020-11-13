/*
File name: index.js
Date: November 12, 2020
Web site name: Tournament Site
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let Game = require('../models/games');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    games: ''
   });
});

module.exports = router;
