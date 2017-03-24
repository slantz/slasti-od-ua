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
