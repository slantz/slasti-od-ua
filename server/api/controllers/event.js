'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Event = mongoose.model('Event');

/**
 * Get all
 */

exports.all = async(function* (req, res) {
    let events = yield Event.find({}, function(err, docs){
        if (err) {
            console.log('all | api/event | Event.find | ', err);
        } else {
            console.log('all of %d event were successfully fetched.', docs.length);
        }
    });

    res.json({
        events
    });
});

/**
 * Upload
 */

exports.post = async(function* (req, res) {
    let event = {};

    yield Event.create(req.body.event, function(err, doc){
        if (err) {
            console.log('POST | api/event | Event.create | ', err);
        } else {
            console.log('event was successfully stored.', doc);
            event = doc;
        }
    });

    res.json({
        event
    });
});
