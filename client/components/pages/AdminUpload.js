import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SimpleForm from './SimpleForm'
import * as AdminActions from '../../actions/AdminActions'

class AdminUpload extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        const { AdminActions: { doStuff } } = this.props;
        console.log('azaza')
        // doStuff()
    };

    render() {
        const { user } = this.props

        return (
            <SimpleForm onSubmit={this.handleSubmit} pristine={true} submitting={false} reset={() => console.log('reset')}/>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        form: state.form
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpload)
