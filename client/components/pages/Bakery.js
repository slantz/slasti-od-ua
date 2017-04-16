import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as BakeryActions from '../../actions/BakeryActions'
import { debounce } from "../../util/util";
import Filters from "../sections/Filters";
import { Link } from "react-router";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import { Chip } from "material-ui";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageTuneIcon from 'material-ui/svg-icons/image/tune';
import Loader from "../elements/Loader";

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

    toggleFilterVisibility = () => {
        const { BakeryActions: { toggleFilterVisibility } } = this.props;
        return toggleFilterVisibility();
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
        return (
            <Col xs={12} sm={6} md={4} className="i-text-uppercase" key={bake._id}>
                <Card>
                    <CardMedia
                        overlay={
                            <CardTitle
                                title={bake.category}
                                subtitle={`${bake.numberOfPieces} ${bake.category}${bake.numberOfPieces > 1 ? "s" : null}`} />}>
                        <img src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`} />
                    </CardMedia>
                    <CardTitle title={bake.name} subtitle={bake.description} />
                    <CardText>
                        <Grid tagName="article">
                            <Row middle="xs">
                                <Col xs={12}>
                                    <p>{bake.event && bake.event.type}</p>
                                </Col>
                            </Row>
                        </Grid>
                    </CardText>
                    <CardActions>
                        <Link to={"/bakery/" + bake._id}>
                            <RaisedButton
                                label="More Details"
                                secondary={true}
                                alt={`More Details about ${bake.name}`}/>
                        </Link>
                    </CardActions>
                </Card>
            </Col>
        );
    };

    filterPrimaryBake = (bake) => {
        const { filter: { filters } } = this.props;
        let result = null;

        let noFilters = Object.keys(filters).every((filterKey) => !filters[filterKey].length);

        if (noFilters) {
            return true;
        }

        return Object.keys(filters).some((filterKey) => {
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
                            } else if (bake[filterKey].some((bakeFilterKey) => typeof bakeFilterKey === "string")) {
                                innerResult = bake[filterKey].some((bakeFilterKey) => bakeFilterKey === filter._id);
                            }
                        }
                    } else if (bake[filterKey] && typeof bake[filterKey] === "object") {
                        if (bake[filterKey].type === 'ANY') {
                            innerResult = true;
                        } else {
                            innerResult = bake[filterKey].type === filter._id;
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

                if (result === true) {
                    return result;
                }

                return result;
            }
        });
    };

    filterPrimaryBakeriesCollection = () => {
        const { bakery: { currentSkip, count, data: { items } }, filter: { filters } } = this.props;

        let noFilters = Object.keys(filters).every((filterKey) => !filters[filterKey].length);

        let filteredItems = items
            .filter(this.filterPrimaryBake)
            .map((bake) => {
                return this.getBakeryCollectionElement(bake);
            })
            .slice(0, noFilters ? currentSkip : items.length);

        return {
            items: filteredItems,
            length: noFilters ? count.count : filteredItems.length
        };
    };

    elementInfiniteLoad = () => {
        return <Loader />;
    };

    componentWillMount() {
        this.getCountAndLimit().then(() => this.getBakery());
    }

    componentDidMount() {
        window.addEventListener("scroll", this.loadMoreBakeryOnScroll);
    }

    render() {
        const { user, bakery: { data, isFiltersVisible } } = this.props;

        let styles = {};

        if (isFiltersVisible) {
            styles = {'position': 'relative', 'marginTop': '0', 'marginLeft': '275px', 'zIndex': '0'};
        } else {
            styles = {'position': 'relative', 'marginTop': '0', 'marginLeft': '0', 'zIndex': '0'};
        }

        let filteredBakery = this.filterPrimaryBakeriesCollection();

        return (
            <section id="sou-bakery">
                {data.isFetching && data.items.length === 0 && this.elementInfiniteLoad()}
                {this.props.children === null && <div>
                    <Filters />
                    <div className="i-transit-all" style={styles}>
                        <div>Total amount of bakery {filteredBakery.length}</div>
                        <Grid tagName="article" fluid={true}>
                            <Row middle="xs">
                                {filteredBakery.items}
                            </Row>
                        </Grid>
                    </div>
                    <FloatingActionButton
                        secondary={true}
                        onTouchTap={this.toggleFilterVisibility}
                        style={{'position': 'fixed', 'bottom': '24px', 'right': '24px', 'zIndex': '1'}}>
                        <ImageTuneIcon />
                    </FloatingActionButton>
                    </div>
                }
                {!(data.isFetching && data.items.length === 0) && this.props.children}
            </section>
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
