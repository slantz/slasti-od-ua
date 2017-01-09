import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SimpleForm from './SimpleForm'
import * as AdminActions from '../../actions/AdminActions'
import 'isomorphic-fetch'

class AdminUpload extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        const { AdminActions: { doStuff } } = this.props;
            const API_ROOT = `http://slasti.od.ua${module.hot ? ':3001' : ''}`;

        // This makes every API response to return Promise object.
            const fullUrl = API_ROOT + '/api/admin/upload/images';

            let formData = new FormData();

            Object.keys(this.props.form.simple.values.files).forEach((key) => formData.append('images', this.props.form.simple.values.files[key], this.props.form.simple.values.files[key].name))

            fetch(fullUrl, {
                credentials: 'include',
                method: 'POST', body: formData
            })
                .then(response => response
                        .json()
                        .then(
                            json => ({ json, response })
                        )
                ).then(({ json, response }) => {
                    if (!response.ok) {
                        return Promise.reject(json)
                    }

                    return Object.assign(
                        {},
                        json
                    );
                });
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
