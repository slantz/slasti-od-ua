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
    },
    // shortcake
    basis: {
        type: mongoose.Schema.ObjectId,
        ref: 'Basis'
    },
    // cream
    filling: {
        type: mongoose.Schema.ObjectId,
        ref: 'Filling'
    },
    // glaze, cream, figures, sugar paste, icing
    decor: {
        type: String,
        default: ''
    }
});

mongoose.model('Bakery', BakerySchema);
