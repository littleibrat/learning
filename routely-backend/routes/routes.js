var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Route = require('../models/route.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Route.find(function (err, routes) {
    if (err) return next(err);
    res.json(routes);
  });
});

/* UPDATE /todos/:id */
router.post('/:id/:action', function(req, res, next) {
 //console.log("this body: ", req.body, "this id: ", req.params.id);
  Route.findByIdAndUpdate(req.params.id, req.body, function (err, route) {
   // console.log(err);
    if (err) return next(err);
    res.json(route);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Route.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Route.findById(req.params.id, function (err, routes) {
    if (err) return next(err);
    res.json(routes);
  });
});



/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Route.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* register upvotes */
router.post('/:id/:action', function(req, res, next) {
    Route.findById(req.params.id, function(err, route){
        if (err) return next(err);
        currentupvotes = route.upvotes;
        currentupvotes += 1;
        //console.log('upvotes: ' + currentupvotes);
        Route.findByIdAndUpdate(req.params.id, {$set: {upvotes: currentupvotes}}, function (err, post) {
         if (err) return next(err);
         res.json(post);
    });
    });
    //


});

module.exports = router;