/**
 * Created by alexkobylinskyi on 1/3/17.
 */

'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * User Schema
 */

const FillingSchema = new Schema({
    taste: {
        type: String,
        default: ''
    },
    composition: {
        type: String,
        default: ''
    }
});

mongoose.model('Filling', FillingSchema);
