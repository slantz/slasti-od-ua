import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CartActions from '../../actions/CartActions'

class Cart extends Component {
    constructor(props) {
        super(props)
    }

    /*
        TODO:
        2. add page for entering id number
        3. show inquiry details on the cart page
     */

    doStuff = () => {
        const { CartActions: { doStuff } } = this.props;
        doStuff()
    }

    render() {
        const { user } = this.props

        return (
            <article id="sou-catalog">
                <div>Cart {user.name}</div>
                <button onClick={this.doStuff}>Do some stuff</button>
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user,
        about: state.about,
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
