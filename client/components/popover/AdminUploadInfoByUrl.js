import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import localForage from '../../storage/localforage.config'

class AdminUploadInfoByUrl extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { admin: { bakeryFilenames } } = this.props;

        if (Array.isArray(bakeryFilenames) && bakeryFilenames.length == 0) {
            localForage.getItem('bulkUploadBakeryFilenames').then(value => {
                if (Array.isArray(value) && value.length > 0) {
                    // TODO check update of props
                    bakeryFilenames = value;
                }
            });
        }
        return (
            <article id="sou-catalog-bulk-images-uploaded">
                {bakeryFilenames.map(function(filename, filenameIndex){
                    return <div key={filenameIndex}>
                        {filename.imgUrl}
                    </div>;
                })}
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUploadInfoByUrl)
