const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const Event = require("../models/Event");
const { check, validationResult } = require('express-validator');
const moment = require('moment')
moment().format()

// middleware to check if user is login in  
isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login')
}

// create new events
router.get('/create', isAuthenticated ,(req, res) => {

  res.render('event/create', {
    errors: req.flash('errors')
  })
})

// route to home events
router.get("/:pageNo?", (req, res) => {
  let pageNo = 1
  if (req.params.pageNo) {
    pageNo = parseInt(req.params.pageNo)
  }
  if (req.params.pageNo == 0) pageNo = 1
  let q = {
    skip: 5 * (pageNo -1),
    limit: 5
  }
  // find total documents
  let totalDocs = 0
  Event.countDocuments({}, (err, total)=> {

  }).then( (response) => {
    totalDocs = parseInt(response)
    Event.find({}, {}, q, (err, events) => {
      let chunk = [];
      events.forEach ( event => {
        chunk.push(event);
      })
      // res.json(chunk)
      res.render("event/index", { 
        chunk, 
        message: req.flash('info'),
        total: parseInt(totalDocs),
        pageNo
      });
    });

  })
});

// save event to database
router.post('/create',  [

  check('title').isLength({min: 5}).withMessage('cases is short '),
  check('description').isLength({min: 5}).withMessage('cases is short '),
  check('location').isLength({min: 5}).withMessage('cases is short '),
  check('date').isLength({min: 5}).withMessage('cases is short ')
], (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {

    req.flash('errors', errors.array())
    res.redirect('/events/create')
  } else {

    let newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      user_id: req.user.id,
      created_at: Date.now()
    })
  
    newEvent.save( err => {

      if(!err) {

        console.log('added event');
        req.flash('info', 'The event was created successfully')
        res.redirect('/events')
      } else console.log(err)
    })
  }
 
})

// show single event
router.get("/show/:id", (req, res) => {
  Event.findOne({_id: req.params.id}, (err, event) => {
    if(!err) {
      res.render("event/show", {event})
    }
  })
});

// Edit route 
router.get('/edit/:id', isAuthenticated ,(req, res) => {
  Event.findOne({_id: req.params.id}, (err, event) => {
    if(!err) {

      res.render("event/edit", {
        event: event,
        eventDate: moment(event.date).format('YYY-MM-DD'),
        errors: req.flash('errors'),
        message: req.flash('info')
      })
    } else console.log(err);
  })
})

// update  the form
router.post('/update', [
  check('title').isLength({min: 5}).withMessage('cases is short '),
  check('description').isLength({min: 5}).withMessage('cases is short '),
  check('location').isLength({min: 5}).withMessage('cases is short '),
  check('date').isLength({min: 5}).withMessage('cases is short ')

], isAuthenticated ,(req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array())
    res.redirect('/events/edit/' + req.body.id)

  } else {
    let newFields = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date
    }

    let query = { _id: req.body.id}
    Event.updateOne(query, newFields, (err) => {

      if (!err) {
        req.flash('info', 'the info was updated successfully'),
        res.redirect('/events/edit/' + req.body.id)
      } else console.log(err)

    })
  }

})

// delete event 
router.delete('/delete/:id', isAuthenticated ,(req, res) => {
  let query = {_id: req.params.id}
  Event.deleteOne(query, err => {
    if(!err){
      res.status(200).json("deleted")
    } else {
      res.status(400).json('there was error event was deleted')
    }
  })
})

module.exports = router;
