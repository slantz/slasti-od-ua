'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Basis = mongoose.model('Basis');

/**
 * Get all
 */

exports.all = async(function* (req, res) {
    let basis = yield Basis.find({}, function(err, docs){
        if (err) {
            console.log('all | api/basis | Basis.find | ', err);
        } else {
            console.log('all of %d basis were successfully fetched.', docs.length);
        }
    });

    res.json({
        basis
    });
});

/**
 * Upload
 */

exports.post = async(function* (req, res) {
    let basis = [];

    yield Basis.insertMany(req.body.basis, function(err, docs){
        if (err) {
            console.log('POST | api/basis | Basis.insertMany | ', err);
        } else {
            console.log('%d basis were successfully stored.', docs.length);
            basis = docs;
        }
    });

    res.json({
        basis
    });
});
