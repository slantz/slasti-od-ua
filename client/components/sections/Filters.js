import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as FilterActions from '../../actions/FilterActions'
import Select from "react-select";
import { RaisedButton } from "material-ui";

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

    render() {
        const { bakery, filter: { filters }} = this.props;

        let styles = {};

        if (bakery.isFiltersVisible) {
            styles = {'marginLeft': '0'};
        } else {
            styles = {'marginLeft': '-275px'};
        }

        return (
            <aside id="sou-bakery-filters"
                   className="i-transit-all"
                   style={styles}>
                <h2>Wir sind die Filtern!</h2>
                <RaisedButton label="Clear all filters" secondary={true} onTouchTap={this.clearAllFilters} />
                <div>
                    <Select
                        name="select-filter-bakery-ingredients"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.ingredients}
                        placeholder="ingredients"
                        options={this.getProperFields("ingredients")}
                        onChange={(values) => this.setCurrentFilters("ingredients", values)}
                    />
                    <Select
                        name="select-filter-bakery-filling"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.filling}
                        placeholder="filling"
                        options={this.getProperFields("filling")}
                        onChange={(values) => this.setCurrentFilters("filling", values)}
                    />
                    <Select
                        name="select-filter-bakery-basis"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.basis}
                        placeholder="basis"
                        options={this.getProperFields("basis")}
                        onChange={(values) => this.setCurrentFilters("basis", values)}
                    />
                    <Select
                        name="select-filter-bakery-event"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.event}
                        placeholder="event"
                        options={this.getPlainProperFields("event")}
                        onChange={(values) => this.setCurrentFilters("event", values)}
                    />
                    <Select
                        name="select-filter-bakery-category"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.category}
                        placeholder="category"
                        options={this.getPlainProperFields("category")}
                        onChange={(values) => this.setCurrentFilters("category", values)}
                    />
                    <Select
                        name="select-filter-bakery-decor"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.decor}
                        placeholder="decor"
                        options={this.getPlainProperFields("decor")}
                        onChange={(values) => this.setCurrentFilters("decor", values)}
                    />
                    <Select
                        name="select-filter-bakery-number-of-pieces"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        value={filters.numberOfPieces}
                        placeholder="numberOfPieces"
                        options={this.getPlainProperFields("numberOfPieces")}
                        onChange={(values) => this.setCurrentFilters("numberOfPieces", values)}
                    />
                </div>
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
