'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Inquiry = mongoose.model('Inquiry');

/**
 * Get all
 */

exports.all = async(function* (req, res) {
    let searchOption = {};

    if (req.query.id) {
        if (Array.isArray(req.query.id)) {
            searchOption['_id'] = {
                $in: []
            };
            req.query.id.reduce(function(search, id){
                search.$in.push(mongoose.Types.ObjectId(id));
                return search;
            }, searchOption['_id']);
        } else {
            searchOption['_id'] = req.query.id;
        }
    }

    let inquiry = yield Inquiry
        .find(searchOption, function(err, docs) {
            if (err) {
                console.log('all | api/inquiry | Bakery.find | ', err);
            }
            else {
                console.log('all of %d inquiries were successfully fetched.', docs.length);
            }
        });

    res.json({
        inquiry
    });
});

/**
 * Upload
 */

exports.post = async(function* (req, res) {
    let inquiry = [];

    yield Inquiry.insertMany(req.body.inquiry, function(err, docs){
        if (err) {
            console.log('POST | api/inquiry | Filling.insertMany | ', err);
        } else {
            console.log('%d inquiries were successfully stored.', docs.length);
            inquiry = docs;
        }
    });

    res.json({
        inquiry
    });
});
