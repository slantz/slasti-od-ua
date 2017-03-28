import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as BakeryActions from '../../actions/BakeryActions'
import Select from "react-select";

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
        }, []);

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
                        _id: field,
                        type: field
                    })
                })
            } else {
                bakery.push({
                    _id: bake[fieldName],
                    type: bake[fieldName]
                })
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

    setCurrentIngredients = () => {
        return true;
    };

    render() {
        const { bakery: { data } } = this.props;

        return (
            <aside id="sou-bakery-filters">
                <h2>Wir sind die Filtern!</h2>
                <div>
                    <Select
                        name="select-filter-bakery-ingredients"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        options={this.getProperFields("ingredients")}
                        onChange={this.setCurrentIngredients}
                    />
                    <Select
                        name="select-filter-bakery-filling"
                        multi={true}
                        valueKey="_id"
                        labelKey="taste"
                        options={this.getProperFields("filling")}
                        onChange={this.setCurrentIngredients}
                    />
                    <Select
                        name="select-filter-bakery-basis"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        options={this.getProperFields("basis")}
                        onChange={this.setCurrentIngredients}
                    />
                    <Select
                        name="select-filter-bakery-category"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        options={this.getPlainProperFields("category")}
                        onChange={this.setCurrentIngredients}
                    />
                    <Select
                        name="select-filter-bakery-decor"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        options={this.getPlainProperFields("decor")}
                        onChange={this.setCurrentIngredients}
                    />
                    <Select
                        name="select-filter-bakery-number-of-pieces"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        options={this.getPlainProperFields("numberOfPieces")}
                        onChange={this.setCurrentIngredients}
                    />
                </div>
            </aside>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        bakery: state.bakery
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        BakeryActions: bindActionCreators(BakeryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
