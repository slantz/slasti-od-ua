import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from "material-ui/TimePicker";
import { TextField } from "material-ui";
import { ru_RU } from "../../constants/Translations";
import { LOCALE } from "../../constants/Core";

// if (areIntlLocalesSupported(['ru-RU'])) {
//     DateTimeFormat = global.Intl.DateTimeFormat;
// } else {
//     const IntlPolyfill = intl;
//     DateTimeFormat = IntlPolyfill.DateTimeFormat;
//     require('intl/locale-data/jsonp/ru-RU');
// }

function stringValidator(value) {
    return !value || value.length === 0;
}

function numberValidator(value) {
    return !value || value === 0;
}

export const validateBasis = values => {
    const errors = {};

    if (stringValidator(values.type)) {
        errors.type = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_TYPE'];
    }

    if (stringValidator(values.composition)) {
        errors.composition = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_COMPOSITION'];
    }

    return errors;
};

export const validateFilling = values => {
    const errors = {};

    if (stringValidator(values.taste)) {
        errors.taste = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_TASTE'];
    }

    if (stringValidator(values.composition)) {
        errors.composition = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_COMPOSITION'];
    }

    return errors;
};

export const validateIngredients = values => {
    const errors = {};

    if (stringValidator(values.type)) {
        errors.type = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_TYPE'];
    }

    if (stringValidator(values.taste)) {
        errors.taste = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_TASTE'];
    }

    if (stringValidator(values.substance)) {
        errors.substance = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_SUBSTANCE'];
    }

    if (numberValidator(values.price)) {
        errors.price = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_PRICE'];
    }

    return errors;
};

export const validateCategoryWeightDecor = values => {
    const errors = {};

    if (stringValidator(values.category)) {
        errors.category = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_CATEGORY'];
    }

    if (numberValidator(values.weight)) {
        errors.weight = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_WEIGHT'];
    }

    if (numberValidator(values.numberOfPieces)) {
        errors.numberOfPieces = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_NUMBER_OF_PIECES'];
    }

    return errors;
};

export const validateInquiry = values => {
    const errors = {};

    if (stringValidator(values.name)) {
        errors.name = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_NAME'];
    }

    if (stringValidator(values.email) && stringValidator(values.phone)) {
        errors.email = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_AT_LEAST_EMAIL'];
        errors.phone = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.REQUIRED_AT_LEAST_PHONE'];
    }

    return errors;
};

export const warn = values => {
    const warnings = {};

    if (values.composition && values.composition.length < 2) {
        warnings.composition = ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.WARNING_COMPOSITION']
    }

    return warnings;
};

export const renderField = ({ input, label, placeholder, placeholderAccusative, type, meta: { touched, error, warning } }) => (
    <TextField hintText={placeholder} floatingLabelText={ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.ENTER_A'] + " " + placeholderAccusative} name={input.name} type={type} errorText={touched && (error ? error : warning)} fullWidth={true} {...input}/>
);

export const renderMultiLineField = ({ input, label, placeholder, placeholderAccusative, type, defaultValue, meta: { touched, error, warning } }) => (
    <TextField hintText={placeholder} floatingLabelText={ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.ENTER_A'] + " " + placeholderAccusative} name={input.name} type={type} errorText={touched && (error ? error : warning)} defaultValue={defaultValue} multiLine={true} fullWidth={true} />
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
            <DatePicker locale={LOCALE}
                        DateTimeFormat={global.Intl.DateTimeFormat}
                        hintText={label}
                        floatingLabelText={ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.PICK_A'] + ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.DATE_ACCUSATIVE']}
                        mode={mode}
                        onChange={onChangeDate}
                        okLabel={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.OK']}
                        cancelLabel={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.CANCEL']}
                        minDate={new Date()}
                        defaultDate={new Date()}
                        fullWidth={true}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
};

export const renderTimePickerField = ({ input, hintText, formatTime, onChangeTime, meta: { touched, error, warning } }) => {
    return <div>
        <div>
            <TimePicker
                hintText={hintText}
                floatingLabelText={ru_RU['COMPONENT.ELEMENT.INPUT_WITH_VALIDATION.PICK_A'] + hintText}
                format={formatTime}
                okLabel={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.OK']}
                cancelLabel={ru_RU['COMPONENT.POPOVER.ABOUT_INQUIRY_POST_FORM.CANCEL']}
                onChange={onChangeTime}
                fullWidth={true}
            />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>;
};
