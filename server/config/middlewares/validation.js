'use strict';

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

function validateBakeryBulkUpdate(req, res) {
    if (!req.body.bakeryWithStuff || Object.keys(req.body.bakeryWithStuff).length === 0) {
        return badRequestError(res, "No or empty [bakeryWithStuff] body");
    }

    Object.keys(req.body.bakeryWithStuff).forEach((bakeryId) => {
        let bakery = req.body.bakeryWithStuff[bakeryId];

        if (!bakery.ingredients.every(function(ingredient){ return ingredient.composition !== undefined; })) {

        }
    });
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

exports.validateBakeryBulkUpdate = function(req, res, next) {
    validateBakeryBulkUpdate(req, res);
    return next();
};
