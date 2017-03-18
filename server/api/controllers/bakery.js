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

    let bakery = yield Bakery.find(searchOption, function(err, docs){
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

exports.updateBulk = async(function* (req, res) {
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

    let bakery = yield Bakery.find(searchOption, function(err, docs){
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
