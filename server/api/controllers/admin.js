'use strict';

/**
 * Module dependencies.
 */

const CORE_CONSTANTS = require('../constants/core');

const mongoose = require('mongoose');
const fs = require('fs');
const { wrap: async } = require('co');
const gm = require('gm').subClass({imageMagick: true});
const Bakery = mongoose.model('Bakery');

/**
 * Upload
 */

exports.upload = async(function* (req, res) {
    let bakeryFilenames = req.files.map((file) => {
        return {
            imgUrl: file.filename,
            originalName: file.originalname
        }
    });
    let bakery = [];

    yield Bakery.insertMany(bakeryFilenames, function(err, docs){
        if (err) {
            console.log('api/admin/upload/images | Bakery.insertMany | ', err);
        } else {
            console.log('%d bakeries were successfully stored.', docs.length);
            bakery = docs;
        }
    });

    res.json({
        bakery
    });
});

/**
 * Generate image thumbnails
 */

exports.thumbnails = async(function* (req, res, next) {
    let filePaths = req.files.map((file) => {
        return {
            originalPath: "./" + file.path,
            thumbnailPath: file.path.replace(CORE_CONSTANTS.IMAGES_PATH, "./" + CORE_CONSTANTS.THUMBNAILS_PATH)
        }
    });

    try {
        yield new Promise((resolve, reject) => {
            filePaths.forEach(async(function* (file) {
                yield gm(file.originalPath).thumb(250, 250 * 3/4, file.thumbnailPath, 80, (err) => {
                    if (err) reject(new Error(err));
                });
            }));

            resolve();
        });
    } catch(e) {
        res.status(400).json({ error: new Error("Thumbnail creation failed: [" + e.message + "]").toString() });
    }

    next();
});

exports.generateThumbnails = async(function* (req, res, next) {
    let processedFiles = yield new Promise((resolve, reject) => {
        fs.readdir(CORE_CONSTANTS.ROOT_PATH + CORE_CONSTANTS.IMAGES_PATH, function(err, files) {
            files.forEach(async(function* (file) {
                let imagePath = CORE_CONSTANTS.ROOT_PATH + CORE_CONSTANTS.IMAGES_PATH + CORE_CONSTANTS.RELATIVE_PATH + file;
                let thumbnailPath = CORE_CONSTANTS.ROOT_PATH + CORE_CONSTANTS.THUMBNAILS_PATH + CORE_CONSTANTS.RELATIVE_PATH + file;

                try {
                    yield new Promise((generationResolve, generationReject) => {
                        gm(imagePath).thumb(CORE_CONSTANTS.THUMBNAIL.WIDTH,
                                            CORE_CONSTANTS.THUMBNAIL.WIDTH * CORE_CONSTANTS.THUMBNAIL.RATIO,
                                            thumbnailPath,
                                            CORE_CONSTANTS.THUMBNAIL.QUALITY,
                                            (err) => {
                                                if (err) {
                                                    generationReject(err);
                                                } else {
                                                    generationResolve();
                                                }
                                            })
                    });
                } catch(e) {
                    res.status(400).json({ error: new Error("Thumbnail creation failed: [" + e.message + "]").toString() });
                }
            }));

            resolve(files);
        });
    });

    res.json({
        status: 'All thumbnails are successfully generated',
        processedFiles
    });
});
