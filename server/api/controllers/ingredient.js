'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Ingredient = mongoose.model('Ingredient');

/**
 * Get all
 */

exports.all = async(function* (req, res) {
    let ingredients = yield Ingredient.find({}, function(err, docs){
        if (err) {
            console.log('all | api/ingredients | Ingredient.find | ', err);
        } else {
            console.log('all of %d ingredients were successfully fetched.', docs.length);
        }
    });

    res.json({
        ingredients
    });
});

/**
 * Upload
 */

exports.post = async(function* (req, res) {
    let ingredients = [];

    yield Ingredient.insertMany(req.body.ingredients, function(err, docs){
        if (err) {
            console.log('POST | api/ingredients | Ingredient.insertMany | ', err);
        } else {
            console.log('%d ingredients were successfully stored.', docs.length);
            ingredients = docs;
        }
    });

    res.json({
        ingredients
    });
});
