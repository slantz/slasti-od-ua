'use strict';

const INQUIRY_STATUSES = require('../../api/constants/inquiry');

/*
 *  Generic DTO validator
 */

function badRequestError(res, message) {
    return res.status(400).json({ error: new Error(message).toString() });
}

function validateIngredient(req, res) {
    if (!req.body.ingredients || req.body.ingredients.length === 0) {
        return badRequestError(res, "No or empty ingredients collection");
    }

    if (!req.body.ingredients.every(function(ingredient){ return ingredient.type !== undefined; })) {
        return badRequestError(res, "Ingredient should have [type] property set");
    }

    if (!req.body.ingredients.every(function(ingredient){ return ingredient.taste !== undefined; })) {
        return badRequestError(res, "Ingredient should have [taste] property set");
    }

    if (!req.body.ingredients.every(function(ingredient){ return ingredient.substance !== undefined; })) {
        return badRequestError(res, "Ingredient should have [substance] property set");
    }
}

function validateBasis(req, res) {
    if (!req.body.basis || req.body.basis.length === 0) {
        return badRequestError(res, "No or empty basis collection");
    }

    if (!req.body.basis.every(function(ingredient){ return ingredient.type !== undefined; })) {
        return badRequestError(res, "Basis should have [type] property set");
    }

    if (!req.body.basis.every(function(ingredient){ return ingredient.composition !== undefined; })) {
        return badRequestError(res, "Basis should have [composition] property set");
    }
}

function validateFilling(req, res) {
    if (!req.body.filling || req.body.filling.length === 0) {
        return badRequestError(res, "No or empty filling collection");
    }

    if (!req.body.filling.every(function(ingredient){ return ingredient.taste !== undefined; })) {
        return badRequestError(res, "Filling should have [taste] property set");
    }

    if (!req.body.filling.every(function(ingredient){ return ingredient.composition !== undefined; })) {
        return badRequestError(res, "Filling should have [composition] property set");
    }
}

function validateEvent(req, res) {
    if (!req.body.event || Object.keys(req.body.event).length === 0) {
        return badRequestError(res, "No or empty event object");
    }

    if (!req.body.event.type) {
        return badRequestError(res, "Event should have [type] property set");
    }
}

function validateBakeryBulkUpdate(req, res) {
    if (!req.body.bakeryWithStuff || Object.keys(req.body.bakeryWithStuff).length === 0) {
        return badRequestError(res, "No or empty [bakeryWithStuff] body");
    }

    Object.keys(req.body.bakeryWithStuff).forEach((bakeryId) => {
        let bakery = req.body.bakeryWithStuff[bakeryId];

        if (!bakery.ingredients.every(function(ingredient){ return ingredient.length > 0; })) {
            return badRequestError(res, "Some [ingredient] ids are missing");
        }

        if (bakery.filling.length === 0) {
            return badRequestError(res, "[filling] is empty");
        }

        if (bakery.basis.length === 0) {
            return badRequestError(res, "[basis] is empty");
        }
    });
}

function validateInquiry(req, res) {
    if (!req.body.inquiry || Object.keys(req.body.inquiry).length === 0) {
        return badRequestError(res, "No or empty [inquiry] body");
    }
}

function validateInquiryPrice(req, res) {
    if (!req.body.inquiry || !req.body.inquiry.price) {
        return badRequestError(res, "No or empty [inquiry] [price] field");
    }
}

function validateInquiryIsResolved(req, res) {
    if (!req.body.inquiry || !req.body.inquiry.isResolved) {
        return badRequestError(res, "No or empty [inquiry] [isResolved] field");
    }

    if (!Object.keys(INQUIRY_STATUSES.STATUS).some((status) => INQUIRY_STATUSES.STATUS[status] === req.body.inquiry.isResolved)) {
        return badRequestError(res, "Unsupported [inquiry] [isResolved] field value");
    }
}

exports.validateIngredient = function(req, res, next) {
    validateIngredient(req, res);
    return next();
};

exports.validateBasis = function(req, res, next) {
    validateBasis(req, res);
    return next();
};

exports.validateFilling = function(req, res, next) {
    validateFilling(req, res);
    return next();
};

exports.validateEvent = function(req, res, next) {
    validateEvent(req, res);
    return next();
};

exports.validateBakeryBulkUpdate = function(req, res, next) {
    validateBakeryBulkUpdate(req, res);
    return next();
};

exports.validateInquiry = function(req, res, next) {
    validateInquiry(req, res);
    return next();
};

exports.validateInquiryPrice = function(req, res, next) {
    validateInquiryPrice(req, res);
    return next();
};

exports.validateInquiryIsResolved = function(req, res, next) {
    validateInquiryIsResolved(req, res);
    return next();
};
