import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as BakeryActions from '../../actions/BakeryActions'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import { Chip, Paper } from "material-ui";
import NoElement from "../elements/NoElement";
import { Link } from "react-router";
import * as CORE_CONSTANTS from "../../constants/Core";
import { ru_RU } from "../../constants/Translations";

class BakeryDetails extends Component {
    constructor(props) {
        super(props)
    }

    goToOrderPageWithSomeDetails = (bake) => {
        const { BakeryActions: { goToOrderPageWithSomeDetails, setBakeryFromBakeDetails }} = this.props;
        setBakeryFromBakeDetails(bake);
        goToOrderPageWithSomeDetails();
    };

    getBakeryElement = () => {
        const { bakery : { data }, params, user } = this.props;

        let bake = data.items.filter((bake) => bake._id === params.id);

        if (bake.length > 0) {
            bake = bake[0];
            return (
                <Grid tagName="article" fluid={true}>
                    <Row center="xs">
                        <Col xs={12} sm={8} className="sou-cart-details__column">
                            <Paper zDepth={3} rounded={false}>
                                <Card className="i-text-left c-color-background-primary-color-text-background" style={{'boxShadow': 'none', 'borderRadius': '0'}}>
                                    <CardHeader
                                        title={bake.category}
                                        children={<span>
                                            <span>
                                                {bake.numberOfPieces} {bake.category}{bake.numberOfPieces > 1 ? "ов" : null}
                                            </span>
                                        </span>}
                                    />
                                    <CardMedia
                                        overlay={
                                            <CardTitle
                                                title={bake.name}
                                                subtitle={bake.description} />
                                        }>
                                        <img src={`${CORE_CONSTANTS.IMAGES_ROOT}${bake.imgUrl}`} />
                                    </CardMedia>
                                    <CardTitle title={bake.category} subtitle={bake.event ? bake.event.type : ''} />
                                    <CardText>
                                        <Row middle="xs">
                                            <Col xs={12}>
                                                <h4>{ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.INGREDIENTS']}</h4>
                                                {bake.ingredients && bake.ingredients.map((ingredient) => {
                                                    return <Chip key={ingredient._id}>{ingredient.type} / {ingredient.taste}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>{ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.FILLING']}</h4>
                                                {bake.filling && bake.filling.map((filling) => {
                                                    return <Chip key={filling._id}>{filling.taste}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>{ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.BASIS']}</h4>
                                                {bake.basis && bake.basis.map((basis) => {
                                                    return <Chip key={basis._id}>{basis.type}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>{ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.DECOR']}</h4>
                                                {bake.decor && bake.decor.map((decor, index) => {
                                                    return <Chip key={index}>{decor}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>{ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.EVENT']}</h4>
                                                <Chip>{bake.event && bake.event.type}</Chip>
                                            </Col>
                                        </Row>
                                    </CardText>
                                    <CardActions>
                                        <Row between="xs" middle="xs" className="i-margin_block_horizontal_right_0">
                                            <Col xs={12}>
                                                <RaisedButton label={ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.GO_TO_ORDER_PAGE']} primary={true} onTouchTap={() => this.goToOrderPageWithSomeDetails(bake)} />
                                                {user.admin && (
                                                    <Link to={"/admin/update/" + bake._id}>
                                                        <RaisedButton
                                                            label={ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.UPDATE']}
                                                            secondary={true}/>
                                                    </Link>
                                                )}
                                                {user.admin && (
                                                    <Link className="i-right i-margin_block_horizontal_right_0" to={"/admin/delete/" + bake._id}>
                                                        <RaisedButton
                                                            label={ru_RU['COMPONENT.PAGES.BAKERY_DETAILS.DELETE']}
                                                            backgroundColor={CORE_CONSTANTS.COLORS.alert}
                                                            buttonStyle={{'color': CORE_CONSTANTS.COLORS.alternateTextColor}}/>
                                                    </Link>
                                                )}
                                            </Col>
                                            <Col xs={12} className="i-text-right">
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
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
            )
        } else {
            return <NoElement/>;
        }
    };

    render() {
        return (
            <section id="sou-bakery-details" className="sou-bakery-details">
                {this.getBakeryElement()}
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(BakeryDetails)
