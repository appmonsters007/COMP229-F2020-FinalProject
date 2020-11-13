/*
File name: books.js
Date: November 12, 2020
Web site name: Tournament Site
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the match model
let match = require('../models/games');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all matches in the matches collection
  match.find( (err, games) => {
    if (err) {
      return console.error(err);
    }
    else 
    {
      res.render('games/index', {
        title: 'tournament',
        games: games
        
      });
    }
  });

});

//  GET the Match Details page in order to add a new Book
router.get('/details/add', (req, res, next) => {

  res.render('games/details' , {title: 'Add Match', match: ''})

});

// POST process the Match Details page and create a new Book - CREATE
router.post('/details/add', (req, res, next) => 
{
      let newMatch = match(
    {
        "name": req.body.name,
        "description": req.body.description,
        "owner": req.body.owner,
        "active": req.body.active,
        "date": req.body.date
    });

    match.create(newMatch, (err, match) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the match list
            res.redirect('/tournament');
        }
    });   
});

// GET the match Details page in order to edit an existing Book
router.get('/details/edit/:id', (req, res, next) => {
  let id = req.params.id

  match.findById(id, (err, editMatch) =>
  {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
        res.render('games/details', {title: 'Edit Match', match: editMatch})
    }
  })
  
});

// POST - process the information passed from the details form and update
router.post('/details/edit/:id', (req, res, next) => {

  let id = req.params.id

  let updateMatch = match({
    "_id": id,
    "name": req.body.name,
    "description": req.body.description,
    "owner": req.body.owner,
    "active": req.body.active,
    "date": req.body.date
  });

  match.updateOne({_id: id}, updateMatch, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/tournament');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

    match.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the match list
             res.redirect('/tournament');
        }
    });
});


module.exports = router;
