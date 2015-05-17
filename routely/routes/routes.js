var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Route = require('../models/route.js');

/* GET /todos listing. */
router.get('/routes', function(req, res, next) {
  Route.find(function (err, routes) {
    if (err) return next(err);
    res.json(routes);
  });
});

/* POST /todos */
router.post('/routes', function(req, res, next) {
  Route.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/routes/:id', function(req, res, next) {
  Route.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/routes/:id', function(req, res, next) {
  Route.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/routes/:id', function(req, res, next) {
  Route.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;