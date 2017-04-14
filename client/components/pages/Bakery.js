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
        return (
            <Col xs={12} sm={3} className="i-text-uppercase" key={bake._id}>
                <Card>
                    <CardMedia overlay={<CardTitle title={bake.name} subtitle={bake.description} />}>
                        <img src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`} />
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
                        <Grid tagName="article">
                            <Row middle="xs">
                                <Col xs={12}>
                                    {bake.numberOfPieces} {bake.category}{bake.numberOfPieces > 1 ? "s" : null}
                                </Col>
                            </Row>
                        </Grid>
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="More Details"
                            secondary={true}
                            href={"/bakery/" + bake._id}/>
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
                    } else if (bake[filterKey] !== null && typeof bake[filterKey] === "object") {
                        innerResult = bake[filterKey].type === filter._id;
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
        const { user, bakery: { data, count } } = this.props;

        return (
            <section id="sou-bakery">
                {data.isFetching && data.items.length === 0 && this.elementInfiniteLoad()}
                {this.props.children === null && <div>
                    <Filters/>
                    <div>Total amount of bakery {count.count}</div>
                    <Grid tagName="article" fluid={true}>
                        <Row middle="xs">
                            {this.filterPrimaryBakeriesCollection()}
                        </Row>
                    </Grid>
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
