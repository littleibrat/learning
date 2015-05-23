var mongoose = require('mongoose');

var RouteSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  transtype: String,
  priv: Boolean,
  plannedDate: Date,
  upvotes: { type: Number, default: 0 },
  initial_address: { name: String, lat: Number, lng: Number },
  destination: { name: String, lat: Number, lng: Number },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  user_id: Number
});

module.exports = mongoose.model('Route', RouteSchema);