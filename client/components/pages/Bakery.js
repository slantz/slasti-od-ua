import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as BakeryActions from '../../actions/BakeryActions'

class Bakery extends Component {
    constructor(props) {
        super(props)
    }

    doStuff = () => {
        const { BakeryActions: { doStuff } } = this.props;
        doStuff()
    };

    loginToVk = () => {
        window.location.href = '/auth/vk'
    };

    getBakery = () => {
        const { AdminActions: { getBakery } } = this.props;
        return getBakery();
    };

    componentWillMount() {
        this.getBakery();
    }

    render() {
        const { user } = this.props

        return (
            <article id="sou-bakery">
                <div>Catalog {user.name}</div>
                <button onClick={this.doStuff}>Do some stuff</button>
                <Link to="bakery/0">Go to bakery item #0 page</Link>
                <Link to="admin">Go to bakery ADMIN page</Link>
                <button onClick={this.loginToVk}>azaza vk login</button>
                {this.props.children}
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        BakeryActions: bindActionCreators(BakeryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bakery)
