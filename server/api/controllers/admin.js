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

exports.upload = async(function* (req, res) {
    let bakeryFilenames = req.files.map((file) => {
        return {
            imgUrl: file.filename
        }
    });

    yield Bakery.insertMany(bakeryFilenames, function(err, docs){
        if (err) {
            console.log('api/admin/upload/images | Bakery.insertMany | ', err);
        } else {
            console.log('%d bakeries were successfully stored.', docs.length);
        }
    });

    res.json({
        bakeryFilenames
    });
});
