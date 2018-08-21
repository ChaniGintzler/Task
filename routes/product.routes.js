var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.model');
var request = require('request');

var walmartApiUrlBase = `http://api.walmartlabs.com/v1/reviews/`
var walApiUrl = `?apiKey=uzebyuj4t2dw73ku8hp5tq2j&lsPublisherId=%7BYour%20LinkShare%20Publisher%20Id%7D&format=json`;

router.get('/products', function (req, res, next) {
  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', function (req, res, next) {
  getRawApiResponse(walmartApiUrlBase + req.params.id + walApiUrl)
    .then(body => {
      var prod = JSON.parse(body);
      var p = { itemId: prod.itemId, name: prod.name, price: prod.salePrice, reviews: prod.reviews };
      Product.findOneAndUpdate({
        itemId: prod.itemId
      }, p, { upsert: true, 'new': true }
        , function (err, newP) {
          if (err) return next(err);
          res.json(newP);
        });
    });
});

function getRawApiResponse(uri) {
  return new Promise((resolve, reject) => {
    request.get({ uri }, (err, response, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

/* DELETE Product */
router.delete('/:id', function (req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
