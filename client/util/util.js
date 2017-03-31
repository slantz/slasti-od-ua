/**
 * This function gets first value to be saved as new ingredient, filling or basis,
 * the collection of elements exists as this function gets called only on new form prepopulation
 * with default values, form is shown iff these values exist
 *
 * @param currentElements collection of new non-saved elements
 * @param comparedProperty property to compare with _id
 */
export function getFirstInitialValue(currentElements, comparedProperty) {
    return currentElements.filter((basis) => basis._id === basis[comparedProperty])[0];
}

export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
