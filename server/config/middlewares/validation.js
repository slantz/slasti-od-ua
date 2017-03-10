'use strict';

/*
 *  Generic DTO validator
 */

function badRequestError(res, message) {
    return res.status(400).json({ error: new Error(message).toString() });
}

exports.validateIngredient = function(req, res, next) {
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

    return next();
};

exports.validateBasis = function(req, res, next) {
    if (!req.body.basis || req.body.basis.length === 0) {
        return badRequestError(res, "No or empty basis collection");
    }

    if (!req.body.basis.every(function(ingredient){ return ingredient.type !== undefined; })) {
        return badRequestError(res, "Basis should have [type] property set");
    }

    if (!req.body.basis.every(function(ingredient){ return ingredient.composition !== undefined; })) {
        return badRequestError(res, "Basis should have [composition] property set");
    }

    return next();
};

exports.validateFilling = function(req, res, next) {
    if (!req.body.filling || req.body.filling.length === 0) {
        return badRequestError(res, "No or empty filling collection");
    }

    if (!req.body.filling.every(function(ingredient){ return ingredient.taste !== undefined; })) {
        return badRequestError(res, "Filling should have [taste] property set");
    }

    if (!req.body.filling.every(function(ingredient){ return ingredient.composition !== undefined; })) {
        return badRequestError(res, "Filling should have [composition] property set");
    }

    return next();
};
