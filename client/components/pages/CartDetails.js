import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CartActions from '../../actions/CartActions'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import { Chip, Paper } from "material-ui";
import Loader from "../elements/Loader";
import * as CORE_CONSTANTS from '../../constants/Core'
import NoElement from "../elements/NoElement";
import { ru_RU } from "../../constants/Translations";

class CartDetails extends Component {
    constructor(props) {
        super(props);
    }

    refreshInquiryStatus = () => {
        this.getInquiry();
    };

    clearOrderIdIfResolved = () => {
        const { cart, CartActions: { removeInquiryIdFromLocalStorage } } = this.props;

        if (cart.data.inquiry && cart.data.inquiry.isResolved) {
            return removeInquiryIdFromLocalStorage();
        }
    };

    convertToReadableDate = (rawDate) => {
        let date = new Date(rawDate);

        return `${CORE_CONSTANTS.DATES.DAYS[date.getUTCDay()]}, ${CORE_CONSTANTS.DATES.MONTHS[date.getMonth()]} ${date.getDate()} ${date.getUTCFullYear()}`;
    };

    getInquiry = () => {
        const { params } = this.props;
        const { CartActions: { getInquiry } } = this.props;
        return getInquiry(params.id).then(() => {
            this.clearOrderIdIfResolved();
        });
    };

    getPriceMessage = (price) => {
        if (price === 0) {
            return ru_RU['COMPONENT.PAGES.CART_DETAILS.PLEASE_CONTACT_US_TO_ARRANGE_A_PRICE'];
        }

        return `${ru_RU['COMPONENT.PAGES.CART_DETAILS.YOU_VE_ARRANGED_A']} ${price} ${ru_RU['COMPONENT.PAGES.CART_DETAILS.PRICE']}`;
    };

    getCartElement = () => {
        const { cart } = this.props;

        if (cart.data.inquiry) {
            return (
                <Grid tagName="article" fluid={true}>
                    <Row center="xs">
                        <Col xs={12} sm={8} className="sou-cart-details__column">
                            <Paper zDepth={3} rounded={false}>
                                <Card className="i-text-left c-color-background-primary-color-text-background" style={{'boxShadow': 'none', 'borderRadius': '0'}}>
                                    <CardHeader
                                        className={cart.data.inquiry.isResolved ? "c-color-background-triad-dark-green-from-primary" : "c-color-background-triad-yellow-from-primary"}
                                        title={cart.data.inquiry.id}
                                        titleColor={cart.data.inquiry.isResolved && CORE_CONSTANTS.COLORS.alternateTextColor}
                                        subtitleColor={cart.data.inquiry.isResolved && CORE_CONSTANTS.COLORS.alternateTextColor}
                                        subtitle={cart.data.inquiry.isResolved ? ru_RU['COMPONENT.PAGES.CART_DETAILS.ORDER_IS_READY'] : ru_RU['COMPONENT.PAGES.CART_DETAILS.ORDER_IS_PROCESSED']}
                                    />
                                    <CardTitle title={this.getPriceMessage(cart.data.inquiry.price)} />
                                    <CardText>
                                        <Row middle="xs">
                                            <Col xs={12} sm={6}>
                                                <h4>{ru_RU['COMPONENT.PAGES.CART_DETAILS.NAME']}</h4>
                                                <Chip backgroundColor={CORE_CONSTANTS.COLORS.accent2Color}>{cart.data.inquiry.name}</Chip>
                                            </Col>
                                            {cart.data.inquiry.email &&
                                                <Col xs={12} sm={6}>
                                                    <h4>{ru_RU['COMPONENT.PAGES.CART_DETAILS.EMAIL']}</h4>
                                                    <Chip backgroundColor={CORE_CONSTANTS.COLORS.accent2Color}>{cart.data.inquiry.email}</Chip>
                                                </Col>
                                            }
                                            {cart.data.inquiry.phone &&
                                                <Col xs={12} sm={6}>
                                                    <h4>{ru_RU['COMPONENT.PAGES.CART_DETAILS.PHONE']}</h4>
                                                    <Chip backgroundColor={CORE_CONSTANTS.COLORS.accent2Color}>{cart.data.inquiry.phone}</Chip>
                                                </Col>
                                            }
                                            {cart.data.inquiry.timeToCall &&
                                                <Col xs={12} sm={6}>
                                                    <h4>{ru_RU['COMPONENT.PAGES.CART_DETAILS.PICKED_DATE_TO_CALL']}</h4>
                                                    <Chip backgroundColor={CORE_CONSTANTS.COLORS.accent2Color}>{this.convertToReadableDate(cart.data.inquiry.timeToCall)}</Chip>
                                                </Col>
                                            }
                                            {cart.data.inquiry.comment &&
                                                <Col xs={12}>
                                                    <h4>{ru_RU['COMPONENT.PAGES.CART_DETAILS.COMMENT']}</h4>
                                                    <p className="i-break-word">{cart.data.inquiry.comment}</p>
                                                </Col>
                                            }
                                        </Row>
                                    </CardText>
                                    <CardActions style={{'paddingBottom': CORE_CONSTANTS.SIZES.SMALL_PADDING}}>
                                        <Row style={{'margin': '0'}}>
                                            <Col xs={12}>
                                                <RaisedButton
                                                    label={ru_RU['COMPONENT.PAGES.CART_DETAILS.REFRESH']}
                                                    primary={true}
                                                    onTouchTap={this.refreshInquiryStatus}
                                                    fullWidth={true} />
                                            </Col>
                                        </Row>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
            )
        } else if (cart.data.isFetching){
            return <Loader />;
        } else {
            return <NoElement/>;
        }
    };

    componentWillMount() {
        this.getInquiry();
    }

    render() {
        return (
            <section id="sou-cart-details" className="sou-cart-details">
                {this.getCartElement()}
            </section>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.core.user,
        cart: state.cart
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        CartActions: bindActionCreators(CartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails)
