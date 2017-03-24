import React from 'react'

function stringValidator(value) {
    return !value || value.length === 0;
}

function numberValidator(value) {
    return !value || value === 0;
}

export const validateBasis = values => {
    const errors = {};

    if (stringValidator(values.type)) {
        errors.type = 'Required type';
    }

    if (stringValidator(values.composition)) {
        errors.composition = 'Required composition';
    }

    return errors;
};

export const validateFilling = values => {
    const errors = {};

    if (stringValidator(values.taste)) {
        errors.taste = 'Required taste';
    }

    if (stringValidator(values.composition)) {
        errors.composition = 'Required composition';
    }

    return errors;
};

export const validateIngredients = values => {
    const errors = {};

    if (stringValidator(values.type)) {
        errors.type = 'Required type';
    }

    if (stringValidator(values.taste)) {
        errors.taste = 'Required taste';
    }

    if (stringValidator(values.substance)) {
        errors.substance = 'Required substance';
    }

    if (numberValidator(values.price)) {
        errors.price = 'Required price';
    }

    return errors;
};

export const validateCategoryWeightDecor = values => {
    const errors = {};

    if (stringValidator(values.category)) {
        errors.category = 'Required category';
    }

    if (numberValidator(values.weight)) {
        errors.weight = 'Required weight';
    }

    if (numberValidator(values.numberOfPieces)) {
        errors.numberOfPieces = 'Required Number Of Pieces';
    }

    return errors;
};

export const warn = values => {
    const warnings = {};

    if (values.composition && values.composition.length < 2) {
        warnings.composition = 'Looks like composition is too short, unclear...'
    }

    return warnings;
};

export const renderField = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
    <div>
        <label htmlFor={input.name}>{label}</label>
        <div>
            <input {...input} placeholder={placeholder} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);
