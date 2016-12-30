import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as CatalogActions from '../../actions/CatalogActions'

class Catalog extends Component {
    constructor(props) {
        super(props)
    }

    doStuff = () => {
        const { CatalogActions: { doStuff } } = this.props;
        doStuff()
    }

    loginToVk = () => {
        window.location.href = '/auth/vk'
    }

    render() {
        const { user } = this.props

        return (
            <article id="sou-catalog">
                <div>Catalog {user.name}</div>
                <button onClick={this.doStuff}>Do some stuff</button>
                <Link to="catalog/0">Go to catalog item #0 page</Link>
                <button onClick={this.loginToVk}>azaza vk login</button>
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
        CatalogActions: bindActionCreators(CatalogActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
