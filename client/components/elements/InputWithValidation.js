import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from "material-ui/TimePicker";
import { TextField } from "material-ui";

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

export const validateInquiry = values => {
    const errors = {};

    if (stringValidator(values.name)) {
        errors.name = 'Required name';
    }

    if (stringValidator(values.email) && stringValidator(values.phone)) {
        errors.email = 'Required at least email';
        errors.phone = 'Required at least phone';
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
    <TextField hintText={placeholder} floatingLabelText={"Enter a " + placeholder} name={input.name} type={type} errorText={touched && (error ? error : warning)} fullWidth={true} {...input}/>
);

export const renderMultiLineField = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
    <TextField hintText={placeholder} floatingLabelText={"Enter a " + placeholder} name={input.name} type={type} errorText={touched && (error ? error : warning)} multiLine={true} fullWidth={true} {...input}/>
);

export const renderFileField = ({ input, label, placeholder, type, accept, meta: { touched, error, warning } }) => {
    if (input.value) {
        delete input.value;
    }
    return <div>
            <label htmlFor={input.name}>{label}</label>
            <div>
                <input {...input} placeholder={placeholder} type={type} accept={accept} multiple="true"/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
};

export const renderDatePickerField = ({ input, label, mode, onChangeDate, meta: { touched, error, warning } }) => {
    return <div>
            <DatePicker hintText={label} floatingLabelText={"Pick a " + label} mode={mode} onChange={onChangeDate} minDate={new Date()} defaultDate={new Date()} fullWidth={true}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
};

export const renderTimePickerField = ({ input, hintText, formatTime, okLabel, cancelLabel, onChangeTime, meta: { touched, error, warning } }) => {
    return <div>
        <div>
            <TimePicker
                hintText={hintText}
                floatingLabelText={"Pick a " + hintText}
                format={formatTime}
                okLabel={okLabel}
                cancelLabel={cancelLabel}
                onChange={onChangeTime}
                fullWidth={true}
            />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>;
};
