import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CartActions from '../../actions/CartActions'

import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import { RaisedButton } from "material-ui";
import { Link } from "react-router";
import { ru_RU } from "../../constants/Translations";

const styles = {
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
};

class Cart extends Component {
    constructor(props) {
        super(props)
    }

    setCartRedirectId = (event, value) => {
        const { CartActions: { setCartRedirectId } } = this.props;
        return setCartRedirectId(value);
    };

    getInquiryIdFromLocalStorage = () => {
        const { CartActions: { getInquiryIdFromLocalStorage } } = this.props;
        return getInquiryIdFromLocalStorage();
    };

    componentWillMount() {
        this.getInquiryIdFromLocalStorage();
    }

    render() {
        const { cart, children } = this.props;

        if (children === null) {
            return (
                <section id="sou-cart" className="sou-cart i-flex-page-vertical-header-footer">
                    <TextField
                        floatingLabelText={ru_RU['COMPONENT.PAGES.CART.ENTER_INQUIRY_ID']}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        defaultValue={cart.cartRedirectId}
                        onChange={this.setCartRedirectId}
                    />
                    <p>
                        <Link to={`/cart/${cart.cartRedirectId}`}>
                            <RaisedButton
                                label={ru_RU['COMPONENT.PAGES.CART.GO_TO_YOUR_INQUIRY']}
                                secondary={true}
                                disabled={!cart.cartRedirectId}
                                style={styles.button}/>
                        </Link>
                    </p>
                </section>
            )
        } else {
            return (
                <section id="sou-cart">
                    {children}
                </section>
            )
        }

    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        CartActions: bindActionCreators(CartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
