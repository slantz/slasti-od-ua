import React from 'react'

function stringValidator(value) {
    return !value || value.length === 0;

}

export const validate = values => {
    const errors = {};

    if (stringValidator(values.type)) {
        errors.type = 'Required type';
    }

    if (stringValidator(values.composition)) {
        errors.composition = 'Required composition';
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
