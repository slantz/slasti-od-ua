import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as BakeryActions from '../../actions/BakeryActions'

class Bakery extends Component {
    constructor(props) {
        super(props)
    }

    loginToVk = () => {
        window.location.href = '/auth/vk'
    };

    getBakery = () => {
        const { BakeryActions: { getBakery } } = this.props;
        return getBakery();
    };

    elementInfiniteLoad = () => {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    };

    componentWillMount() {
        this.getBakery();
    }

    componentDidMount() {
        window.addEventListener("scroll", function(e) {
             console.log(e);
        });
    }

    render() {
        const { user, bakery } = this.props;

        return (
            <article id="sou-bakery">
                <div>Catalog {user.name}</div>
                <Link to="bakery/0">Go to bakery item #0 page</Link>
                <Link to="admin">Go to bakery ADMIN page</Link>
                <button onClick={this.loginToVk}>azaza vk login</button>
                {bakery.items.map(function(bake){
                    return  <div className="bake" key={bake._id}>
                                <div data-src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`}>{bake._id}</div>
                            </div>;
                })}
                {this.props.children}
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user.payload,
        bakery: state.bakery.data
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
