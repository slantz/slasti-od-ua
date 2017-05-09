/**
 * Module dependencies.
 */
'use strict';

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const shortid = require('shortid');
const Inquiry = mongoose.model('Inquiry');
const sendInquiryNotification = require("../../mail/nodemailer").sendInquiryNotification;

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
                console.log('all | api/inquiry | Inquiry.find | ', err);
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

    req.body.inquiry.id = shortid.generate();

    yield Inquiry.insertMany(req.body.inquiry, function(err, docs){
        if (err) {
            console.log('POST | api/inquiry | Inquiry.insertMany | ', err);
        } else {
            console.log('%d inquiries were successfully stored.', docs.length);

            inquiry = [].concat(docs);

            sendInquiryNotification({
                name: docs[0].name,
                email: docs[0].email,
                phone: docs[0].phone,
                date: docs[0].timeToCall.toDateString(),
                time: docs[0].timeToCall.getHours() > 0 ? `${docs[0].timeToCall.getHours()}:${docs[0].timeToCall.getMinutes()}`: "",
                comment: docs[0].comment,
            });
        }
    });

    res.json({
        inquiry
    });
});

exports.resolve = async(function* (req, res) {
    let { body : { inquiry }} = req;

    let updatedInquiry = yield new Promise(function(resolve, reject){
        Inquiry.findOneAndUpdate({ id: req.params.id }, { isResolved: inquiry.isResolved }, {new: true}, function(err, doc) {
            if (err) {
                console.log('PUT | api/inquiry | Inquiry.findOneAndUpdate | ', err);
                reject();
            } else {
                if (doc === null) {
                    res.status(401).json({ error: "No item was found, please check the [id] field." });
                    reject();
                } else {
                    console.log('[%s] inquiry was successfully updated.', doc._id);
                    resolve(doc);
                }
            }
        });
    });

    res.json({
        inquiry: updatedInquiry
    });
});

exports.byId = async(function* (req, res) {
    let inquiry = yield Inquiry
        .findOne({ 'id': req.params.id }, function(err, doc) {
            if (err) {
                console.log('all | api/inquiry | Inquiry.find | ', err);
            }
            else {
                console.log('[%s] inquiry was successfully fetched.', doc.id);
            }
        });

    res.json({
        inquiry
    });
});

exports.updatePrice = async(function* (req, res) {
    let { body : { inquiry }} = req;


    let updatedInquiry = yield new Promise(function(resolve, reject){
        Inquiry.findOneAndUpdate({ id: req.params.id }, { price: inquiry.price }, { new: true }, function(err, doc) {
            if (err) {
                console.log('PUT | api/inquiry/:id/price | Inquiry.findOneAndUpdate | ', err);
                reject();
            } else {
                console.log('[%s] inquiry was successfully updated.', doc.id);
                resolve(doc);
            }
        });
    });

    res.json({
        inquiry: updatedInquiry
    });
});
