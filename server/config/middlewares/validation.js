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
