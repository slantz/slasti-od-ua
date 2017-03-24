'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Filling = mongoose.model('Filling');

/**
 * Get all
 */

exports.all = async(function* (req, res) {
    let filling = yield Filling.find({}, function(err, docs){
        if (err) {
            console.log('all | api/filling | Filling.find | ', err);
        } else {
            console.log('all of %d fillings were successfully fetched.', docs.length);
        }
    });

    res.json({
        filling
    });
});

/**
 * Upload
 */

exports.post = async(function* (req, res) {
    let filling = [];

    yield Filling.insertMany(req.body.filling, function(err, docs){
        if (err) {
            console.log('POST | api/filling | Filling.insertMany | ', err);
        } else {
            console.log('%d fillings were successfully stored.', docs.length);
            filling = docs;
        }
    });

    res.json({
        filling
    });
});
