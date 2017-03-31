import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as BakeryActions from '../../actions/BakeryActions'
import { debounce } from "../../util/util";
import Filters from "../sections/Filters";

class Bakery extends Component {
    constructor(props) {
        super(props);
        this.previousScrollPosition = 0;
        this.scrollPercentThreshhold = 0.95;
    }

    getBakery = () => {
        const {
            bakery: {
                count
            },
            BakeryActions: {
                getBakery,
                setCurrentSkip
            }
        } = this.props;

        setCurrentSkip(count.limit);
        return getBakery();
    };

    showMoreBakery = (newScrollPosition) => {
        const {
            bakery: {
                count,
                currentSkip
            }
        } = this.props;
        let newCurrentSkip = currentSkip + count.limit;

        this.previousScrollPosition = newScrollPosition;
        if (newCurrentSkip > count.count) {
            newCurrentSkip = count.count;
        }
        this.setCurrentSkip(newCurrentSkip);
    };

    getCountAndLimit = () => {
        const { BakeryActions: { getCountAndLimit } } = this.props;
        return getCountAndLimit();
    };

    setCurrentSkip = (currentSkip) => {
        const { BakeryActions: { setCurrentSkip } } = this.props;
        return setCurrentSkip(currentSkip);
    };

    loadMoreBakeryOnScroll = debounce((e) => {
        const {
            bakery: {
                count,
                currentSkip
            }
        } = this.props;
        if (e.target.body.scrollTop > this.scrollPercentThreshhold * (e.target.body.scrollHeight - window.innerHeight)) {
            if (currentSkip < count.count && this.previousScrollPosition < e.target.body.scrollTop) {
                this.showMoreBakery(e.target.body.scrollTop);
            }
        }
    }, 100);

    getBakeryCollectionElement = (bake) => {
        return <div className="bake" key={bake._id} style={{
            'width': '300px',
            'display': 'inline-block'
        }}>
            <img
                src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`}
                width="300px"
                height={300 * 3/4 + "px"}
                alt={bake._id} />
        </div>;
    };

    filterPrimaryBake = (bake) => {
        const { filter: { filters } } = this.props;
        let result = null;

        let noFilters = Object.keys(filters).every((filterKey) => !filters[filterKey].length);

        if (noFilters) {
            return true;
        }

        Object.keys(filters).forEach((filterKey) => {
            if (filters[filterKey].length > 0) {
                result = filters[filterKey].some((filter) => {
                    let innerResult = false;
                    if (Array.isArray(bake[filterKey])) {
                        if (bake[filterKey].length > 0) {
                            if (bake[filterKey].some((bakeFilterKey) => typeof bakeFilterKey === "object")) {
                                innerResult = bake[filterKey].some((bakeFilterKey) => {
                                    if (bakeFilterKey.type) {
                                        return bakeFilterKey.type === filter._id;
                                    }
                                    if (bakeFilterKey.taste) {
                                        return bakeFilterKey.taste === filter._id;
                                    }
                                });
                            }
                            if (bake[filterKey].some((bakeFilterKey) => typeof bakeFilterKey === "string")) {
                                innerResult = bake[filterKey].some((bakeFilterKey) => bakeFilterKey === filter._id);
                            }
                        }
                    } else {
                        switch (typeof bake[filterKey]) {
                            case "string":
                                innerResult = bake[filterKey] === filter._id;
                                break;
                            case "number":
                                innerResult = bake[filterKey] === filter._id;
                                break;
                        }
                    }
                    return innerResult;
                });
            }
        });

        return result;
    };

    filterPrimaryBakeriesCollection = () => {
        const { bakery: { currentSkip, data: { items } }, filter: { filters } } = this.props;

        let noFilters = Object.keys(filters).every((filterKey) => !filters[filterKey].length);

        return items
            .filter(this.filterPrimaryBake)
            .map((bake) => {
                return this.getBakeryCollectionElement(bake);
            })
            .slice(0, noFilters ? currentSkip : items.length);
    };

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
                <Filters/>
                {data.isFetching && data.items.length === 0 && this.elementInfiniteLoad()}
                <div id="scroll-container" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {this.filterPrimaryBakeriesCollection()}
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
        bakery: state.bakery,
        filter: state.filter
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
