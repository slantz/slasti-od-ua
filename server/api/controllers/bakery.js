'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Bakery = mongoose.model('Bakery');

/**
 * Upload
 */

exports.all = async(function* (req, res) {
    let bakery = null;
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

    try {
        bakery = yield Bakery
            .find(searchOption, function(err, docs) {
                if (err) {
                    console.log('all | api/bakery | Bakery.find | ', err);
                }
                else {
                    if (docs.length === 0) {
                        res.status(401).json({ error: "Item was removed" });
                    }
                    console.log('all of %d bakeries were successfully fetched.', docs.length);
                }
            })
            .skip(queryOptions.skip)
            .limit(queryOptions.limit)
            .populate("ingredients filling basis event");
    } catch (e) {
        res.status(401).json({ error: new Error(e.message).toString() });
    }

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
                    doc.name = bakeryWithStuff[doc._id].name;
                    doc.description = bakeryWithStuff[doc._id].description;
                    doc.event = bakeryWithStuff[doc._id].event;
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

exports.count = async(function* (req, res){
    let bakeryCount = yield Bakery
        .find({}, function(err, docs) {
            if (err) {
                console.log('count | api/bakery/count | Bakery.find | ', err);
            }
            else {
                console.log('all of %d bakeries were successfully fetched.', docs.length);
            }
        })
        .count();

    res.json({
        bakeryCount: {
            count: bakeryCount,
            limit: 30
        }
    });
});

exports.remove = async(function* (req, res){
    let isRemoved = null;

    let removeFromDbPromise = new Promise(function(resolve, reject) {
        Bakery
            .findByIdAndRemove(req.params.id, function(err, doc) {
                if (err) {
                    console.log('all | api/inquiry | Inquiry.find | ', err);
                    reject(err);
                }
                else {
                    console.log('[%s] inquiry was successfully fetched.', doc.id);
                    resolve(doc);
                }
            });
    });

    let deleteImagePromise = new Promise(function(resolve, reject){
        removeFromDbPromise
            .then(function(doc){
                let resultHandler = function(err) {
                    if (err) {
                        console.log("unlink failed", err);
                        reject(err);
                    }
                    else {
                        console.log("file deleted");
                        resolve();
                    }
                };

                let filePath = __dirname.replace("/server/api/controllers", `/client/static/images/${doc.imgUrl}`);

                fs.unlink(filePath, resultHandler);
            })
            .catch(function(){
                reject();
            });
    });

    try {
        isRemoved = yield Promise.all([
            removeFromDbPromise,
            deleteImagePromise,
        ]);
    } catch(e) {
        res.status(400).json({ error: new Error(e.message).toString() });
    }

    res.json({
        isRemoved
    });
});
