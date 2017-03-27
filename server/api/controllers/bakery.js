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
    let queryOptions = {
        skip: 0,
        limit: 30,
    };

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

    if (req.query.skip) {
        queryOptions.skip = Number(req.query.skip);
    }

    if (req.query.noLimit) {
        queryOptions.limit = null;
    }

    let bakery = yield Bakery
        .find(searchOption, function(err, docs) {
            if (err) {
                console.log('all | api/bakery | Bakery.find | ', err);
            }
            else {
                console.log('all of %d bakeries were successfully fetched.', docs.length);
            }
        })
        .skip(queryOptions.skip)
        .limit(queryOptions.limit)
        .populate("ingredients filling basis");

    res.json({
        bakery
    });
});

exports.updateBulk = async(function* (req, res) {
    let { body : { bakeryWithStuff }} = req;


    let bakery = yield new Promise((resolve, reject) => {
        Bakery.find({ '_id': { $in: Object.keys(bakeryWithStuff) }}, function(err, docs){
            if (err) {
                console.log('updateBulk | api/bakery | Bakery.find | ', err);
                reject([]);
            } else {
                console.log('successfully fetched bakeries by ids [%s]', Object.keys(bakeryWithStuff));
                docs.forEach(async(function* (doc) {
                    doc.ingredients = doc.ingredients.concat(bakeryWithStuff[doc._id].ingredients);
                    doc.filling = bakeryWithStuff[doc._id].filling;
                    doc.basis = bakeryWithStuff[doc._id].basis;
                    doc.category = bakeryWithStuff[doc._id].category;
                    doc.weight = bakeryWithStuff[doc._id].weight;
                    doc.decor = bakeryWithStuff[doc._id].decor;
                    doc.numberOfPieces = bakeryWithStuff[doc._id].numberOfPieces;
                    yield doc.save((err) => {
                        console.log("doc [%s] wasn't saved due to the following error: [%s]", doc._id, err);
                    });
                }));

                resolve(docs);
            }
        });
    });

    res.json({
        bakery
    });
});
