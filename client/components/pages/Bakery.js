import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as BakeryActions from '../../actions/BakeryActions'
import { debounce } from "../../util/util";

class Bakery extends Component {
    constructor(props) {
        super(props);
        this.currentSkip = 0;
        this.previousScrollPosition = 0;
        this.scrollPercentThreshhold = 0.95;
    }

    loginToVk = () => {
        window.location.href = '/auth/vk'
    };

    getBakery = () => {
        const {
            bakery: {
                count
            },
            BakeryActions: {
                getBakery
            }
        } = this.props;

        return getBakery(this.currentSkip).then(() => this.currentSkip += count.limit);
    };

    getMoreBakery = (newScrollPosition) => {
        const {
            bakery: {
                count
            },
            BakeryActions: {
                getMoreBakery
            }
        } = this.props;

        return getMoreBakery(this.currentSkip).then(() => {
            this.currentSkip += count.limit;
            this.previousScrollPosition = newScrollPosition;
        });
    };

    getCountAndLimit = () => {
        const { BakeryActions: { getCountAndLimit } } = this.props;
        return getCountAndLimit();
    };

    loadMoreBakeryOnScroll = debounce((e) => {
        const {
            bakery: {
                count
            }
        } = this.props;
        if (e.target.body.scrollTop > this.scrollPercentThreshhold * (e.target.body.scrollHeight - window.innerHeight)) {
            if (this.currentSkip < count.count && this.previousScrollPosition < e.target.body.scrollTop) {
                this.getMoreBakery(e.target.body.scrollTop);
            }
        }
    }, 100);

    elementInfiniteLoad = () => {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    };

    componentWillMount() {
        this.getCountAndLimit().then(() => this.getBakery());
    }

    componentDidMount() {
        window.addEventListener("scroll", this.loadMoreBakeryOnScroll);
    }

    render() {
        const { user, bakery: { data } } = this.props;

        return (
            <article id="sou-bakery">
                <div>Catalog {user.name}</div>
                <Link to="bakery/0">Go to bakery item #0 page</Link>
                <Link to="admin">Go to bakery ADMIN page</Link>
                <button onClick={this.loginToVk}>azaza vk login</button>
                {data.isFetching && data.items.length === 0 && this.elementInfiniteLoad()}
                <div id="scroll-container" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {data.items.map(function(bake){
                        return  <div className="bake" key={bake._id} style={{
                            'width': '300px',
                            'display': 'inline-block'
                        }}>
                            <img
                                src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`}
                                width="300px"
                                height={300 * 3/4 + "px"}
                                alt={bake._id} />
                        </div>;
                    })}
                </div>
                {this.props.children}
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user.payload,
        bakery: state.bakery
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
