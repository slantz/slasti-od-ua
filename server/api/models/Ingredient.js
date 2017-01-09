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

const IngredientSchema = new Schema({
    type: {
        type: String,
        default: ''
    },
    taste: {
        type: String,
        default: ''
    },
    substance: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: null
    }
});

mongoose.model('Ingredient', IngredientSchema);
