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
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    originalName: {
        type: String,
        default: '',
    },
    imgUrl: {
        type: String,
        default: ''
    },
    numberOfPieces: {
        type: Number,
        default: 1
    },
    // shortcake
    basis: [{
        type: Schema.Types.ObjectId,
        ref: 'Basis'
    }],
    // cream
    filling: [{
        type: Schema.Types.ObjectId,
        ref: 'Filling'
    }],
    // glaze, cream, figures, sugar paste, icing
    decor: {
        type: Array,
        default: []
    }
});

mongoose.model('Bakery', BakerySchema);
