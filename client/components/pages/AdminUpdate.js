import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'

class AdminUpdate extends Component {
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
                <div>Admin Update {user.name}</div>
                <button onClick={this.doStuff}>Do some stuff</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdate)
