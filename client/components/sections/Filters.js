import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as BakeryActions from '../../actions/BakeryActions'
import Select from "react-select";

class Filters extends Component {
    constructor(props) {
        super(props);
    }

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
                        name="select-admin-upload-bakery-ingredients"
                        multi={true}
                        valueKey="_id"
                        labelKey="type"
                        options={data.items.reduce((bakery, bake) => {
                            return bakery.concat(bake.ingredients);
                        }, [])}
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
