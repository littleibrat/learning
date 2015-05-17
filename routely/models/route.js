var mongoose = require('mongoose');

var RouteSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  priv: Boolean,
  plannedDate: Date,
  initial_address: { name: String, lat: Number, lng: Number },
  destination: { name: String, lat: Number, lng: Number },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Route', RouteSchema);