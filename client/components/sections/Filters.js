import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as FilterActions from '../../actions/FilterActions'
import Select from "react-select";
import { FlatButton, RaisedButton } from "material-ui";
import { ru_RU } from "../../constants/Translations";

class Filters extends Component {
    constructor(props) {
        super(props);
    }

    getProperFields = (fieldName) => {
        const { bakery: { data } } = this.props;

        if (data.items.length === 0) {
            return [];
        }

        let lalka =  data.items.reduce((bakery, bake) => {
            if (!bake[fieldName]) {
                return bakery;
            }
            return bakery.concat(bake[fieldName]);
        }, []);

        let davalka = lalka.reduce((allLalki, lal) => {
            if (allLalki.some((allLalk) => allLalk._id === lal._id)) {
                return allLalki;
            }
            allLalki.push(lal);
            return allLalki;
        }, []).map((item) => {
            return {
                _id: item.type ? item.type : item.taste,
                type: item.type ? item.type : item.taste
            }
        });

        return davalka;
    };

    getPlainProperFields = (fieldName) => {
        const { bakery: { data } } = this.props;

        if (data.items.length === 0) {
            return [];
        }

        let lalka = data.items.reduce((bakery, bake) => {
            if (!bake[fieldName] || bake[fieldName] === "") {
                return bakery;
            }

            if ((Array.isArray(bake[fieldName]) && bake[fieldName].length === 0) || (bake[fieldName].length === 1 && bake[fieldName][0] === "")) {
                return bakery;
            }

            if (Array.isArray(bake[fieldName])) {
                bake[fieldName].forEach((field) => {
                    bakery.push({
                        _id : field,
                        type : field
                    })
                })
            } else if (typeof bake[fieldName] === "object") {
                bakery.push({
                    _id: bake[fieldName].type,
                    type: bake[fieldName].type
                });
            } else {
                bakery.push({
                    _id: bake[fieldName],
                    type: bake[fieldName]
                });
            }

            return bakery;
        }, []);

        let davalka = lalka.reduce((allLalki, lal) => {
            if (allLalki.some((allLalk) => allLalk._id === lal._id)) {
                return allLalki;
            }
            allLalki.push(lal);
            return allLalki;
        }, []);

        return davalka;
    };

    setCurrentFilters = (type, values) => {
        const {
            FilterActions: {
                setCurrentFilters
            }
        } = this.props;
        return setCurrentFilters(type, values);
    };

    clearAllFilters = () => {
        const {
            FilterActions: {
                clearAllFilters
            }
        } = this.props;
        return clearAllFilters();
    };

    getFiltersClassName = (isFiltersVisible) => {
        let className = "sou-bakery-filters i-transit-all i-box-sizing";

        if (!isFiltersVisible) {
            className += " sou-bakery-filters_hidden";
        } else {
            window.scrollTo(0, 0);
        }

        return className;
    };

    render() {
        const { bakery, filter: { filters }} = this.props;

        return (
            <aside id="sou-bakery-filters"
                   className={this.getFiltersClassName(bakery.isFiltersVisible)}>
                <h3>{ru_RU['COMPONENT.SECTIONS.FILTERS.TITLE']}</h3>
                <div className="sou-bakery-filters__list">
                    <Select
                        name="select-filter-bakery-ingredients"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.ingredients}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.INGREDIENTS']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getProperFields("ingredients")}
                        onChange={(values) => this.setCurrentFilters("ingredients", values)}
                    />
                    <Select
                        name="select-filter-bakery-filling"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.filling}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.FILLING']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getProperFields("filling")}
                        onChange={(values) => this.setCurrentFilters("filling", values)}
                    />
                    <Select
                        name="select-filter-bakery-basis"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.basis}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.BASIS']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getProperFields("basis")}
                        onChange={(values) => this.setCurrentFilters("basis", values)}
                    />
                    <Select
                        name="select-filter-bakery-event"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.event}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.EVENT']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getPlainProperFields("event")}
                        onChange={(values) => this.setCurrentFilters("event", values)}
                    />
                    <Select
                        name="select-filter-bakery-category"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.category}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.CATEGORY']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getPlainProperFields("category")}
                        onChange={(values) => this.setCurrentFilters("category", values)}
                    />
                    <Select
                        name="select-filter-bakery-decor"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.decor}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.DECOR']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getPlainProperFields("decor")}
                        onChange={(values) => this.setCurrentFilters("decor", values)}
                    />
                    <Select
                        name="select-filter-bakery-number-of-pieces"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.numberOfPieces}
                        placeholder={ru_RU['COMPONENT.SECTIONS.FILTERS.PLACEHOLDER.NUMBER_OF_PIECES']}
                        noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                        options={this.getPlainProperFields("numberOfPieces")}
                        onChange={(values) => this.setCurrentFilters("numberOfPieces", values)}
                    />
                </div>
                <p className="sou-bakery-filters__button-holder i-text-right">
                    <FlatButton label={ru_RU['COMPONENT.SECTIONS.FILTERS.CLEAR_ALL_FILTERS']} primary={true} onTouchTap={this.clearAllFilters} />
                </p>
            </aside>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        bakery: state.bakery,
        filter: state.filter
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        FilterActions: bindActionCreators(FilterActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
