var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    name: String,
    //overallRating: OverallRating;
    reviewer: String,
    reviewText: String,
    title: String,
    upVotes: String,
    downVotes: String
});

var ProductSchema = new mongoose.Schema({
  itemId:Number,
  name: String,
  price: Number,
  reviews:[ReviewSchema]

});

module.exports = mongoose.model('product', ProductSchema);