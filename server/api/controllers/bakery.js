'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Bakery = mongoose.model('Bakery');

/**
 * Upload
 */

exports.all = async(function* (req, res) {
    let bakery = yield Bakery.find({}, function(err, docs){
        if (err) {
            console.log('all | api/bakery | Bakery.find | ', err);
        } else {
            console.log('all of %d bakeries were successfully fetched.', docs.length);
        }
    });

    res.json({
        bakery
    });
});
