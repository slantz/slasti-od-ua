import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as AdminActions from '../../actions/AdminActions'

class Admin extends Component {
    constructor(props) {
        super(props)
    }

    doStuff = () => {
        const { AdminActions: { doStuff } } = this.props;
        doStuff()
    }

    render() {
        const { user } = this.props

        return (
            <article id="sou-catalog">
                <div>Admin {user.name}</div>
                <button onClick={this.doStuff}>Do some stuff</button>
                <Link to="admin/0">Go to admin 0 page</Link>
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
        AdminActions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
