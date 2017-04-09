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
 * Event Schema
 */

const EventSchema = new Schema({
    type: {
        type: String,
        default: 'ANY'
    }
});

mongoose.model('Event', EventSchema);
