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

const InquirySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    timeToCall: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        default: ''
    },
    isResolved: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Inquiry', InquirySchema);
