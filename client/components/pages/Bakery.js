import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CORE_CONSTANTS from '../../constants/Core'
import * as BakeryActions from '../../actions/BakeryActions'
import { debounce } from "../../util/util";
import Filters from "../sections/Filters";
import { Link } from "react-router";
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageTuneIcon from 'material-ui/svg-icons/image/tune';
import Loader from "../elements/Loader";
import { ru_RU } from "../../constants/Translations";

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

    getFilterItemsTitle = (filteredBakeryLength) => {
        const { bakery: { count } } = this.props;

        return (
            <h3 className="sou-bakery-items__title">{ru_RU['COMPONENT.PAGES.BAKERY.ITEMS_TITLE.TOTAL']} {filteredBakeryLength === count.count ? ru_RU['COMPONENT.PAGES.BAKERY.ITEMS_TITLE.FILTERED'] : ""} {ru_RU['COMPONENT.PAGES.BAKERY.ITEMS_TITLE.BAKERY']}: <span className="sou-text-primary">{filteredBakeryLength}</span></h3>
        );
    };

    getBakeryCollectionElement = (bake) => {
        return (
            <Col xs={12} sm={6} md={4} className="i-margin_block_vertical_bottom" key={bake._id}>
                <Card className="i-text-left">
                    <CardMedia
                        overlay={
                            <CardTitle
                                title={bake.category}
                                subtitle={`${bake.numberOfPieces} ${bake.category}${bake.numberOfPieces > 1 ? "ов" : ""}`} />}>
                        <img src={`${CORE_CONSTANTS.THUMBNAILS_ROOT}${bake.imgUrl}`} />
                    </CardMedia>
                    <CardTitle title={bake.name} subtitle={bake.description} />
                    <CardText>
                        <p>{ru_RU['COMPONENT.PAGES.BAKERY.EVENT_LABEL']}: {bake.event && bake.event.type}</p>
                    </CardText>
                    <CardActions className="sou-bakery-items__card__action">
                        <Row between="xs" middle="xs" className="i-margin_block_horizontal_right_0">
                            <Col xs={6}>
                                <Link to={"/bakery/" + bake._id}>
                                    <RaisedButton
                                        label={ru_RU['COMPONENT.PAGES.BAKERY.MORE_DETAILS']}
                                        secondary={true}
                                        alt={`${ru_RU['COMPONENT.PAGES.BAKERY.MORE_DETAILS_ABOUT']} ${bake.name}`}/>
                                </Link>
                            </Col>
                            <Col xs={6} className="i-text-right">
                                <div
                                    className="fb-like"
                                    data-href={window.location.origin + this.props.location.pathname + "/" + bake._id}
                                    data-layout="button_count"
                                    data-action="like"
                                    data-size="small"
                                    data-show-faces="true"
                                    data-share="true" />
                            </Col>
                        </Row>
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
                        if (bake[filterKey].type === ru_RU['COMPONENT.PAGES.BAKERY.TYPE.ANY']) {
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
        const { user, bakery: { data } } = this.props;

        let filteredBakery = this.filterPrimaryBakeriesCollection();

        return (
            <section id="sou-bakery">
                {data.isFetching && data.items.length === 0 && this.elementInfiniteLoad()}
                {this.props.children === null && <div>
                    <Filters />
                    <div id="sou-bakery-items" className="sou-bakery-items i-transit-all i-box-sizing">
                        {this.getFilterItemsTitle(filteredBakery.length)}
                        <Grid tagName="article" className="sou-bakery-items__list i-box-sizing" fluid={true}>
                            <Row top="xs">
                                {filteredBakery.items}
                            </Row>
                        </Grid>
                    </div>
                    <FloatingActionButton
                        secondary={true}
                        onTouchTap={this.toggleFilterVisibility}
                        style={{'position': 'fixed', 'bottom': '30px', 'right': '30px', 'zIndex': '1'}}>
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
