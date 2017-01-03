/**
 * Created by alexkobylinskyi on 12/27/16.
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

const BakerySchema = new Schema({
    category: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: null
    },
    ingredients: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Ingredient'
    }],
    imgUrl: {
        type: String,
        default: ''
    },
    numberOfPieces: {
        type: Number,
        default: 1
    }
});

mongoose.model('Bakery', BakerySchema);
