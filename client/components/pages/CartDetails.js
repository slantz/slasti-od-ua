import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CartActions from '../../actions/CartActions'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import { Chip } from "material-ui";

class CartDetails extends Component {
    constructor(props) {
        super(props)
        this.resolvedCardStyles = {
            backgroundColor: 'green'
        };
        this.progressCardStyles = {
            backgroundColor: 'yellow'
        };
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

    getInquiry = () => {
        const { params } = this.props;
        const { CartActions: { getInquiry } } = this.props;
        return getInquiry(params.id).then(() => {
            this.clearOrderIdIfResolved();
        });
    };

    getCartElement = () => {
        const { cart } = this.props;

        if (cart.data.inquiry) {
            return (
                <Grid tagName="article" fluid={true}>
                    <Row middle="xs">
                        <Col xs={12} sm={8} className="i-text-uppercase">
                            <Card style={cart.data.inquiry.isResolved ? this.resolvedCardStyles : this.progressCardStyles}>
                                <CardHeader
                                    title={cart.data.inquiry.id}
                                    subtitle={cart.data.inquiry.isResolved ? 'Your Order is ready!' : 'Your order is being processed!'}
                                />
                                <CardTitle title={cart.data.inquiry.price} />
                                <CardText>
                                    <Grid tagName="article">
                                        <Row middle="xs">
                                            <Col xs={12}>
                                                <h4>Name</h4>
                                                <Chip>{cart.data.inquiry.name}</Chip>
                                            </Col>
                                            {cart.data.inquiry.email &&
                                                <Col xs={12}>
                                                    <h4>Email</h4>
                                                    <Chip>{cart.data.inquiry.email}</Chip>
                                                </Col>
                                            }
                                            {cart.data.inquiry.phone &&
                                                <Col xs={12}>
                                                    <h4>Phone</h4>
                                                    <Chip>{cart.data.inquiry.phone}</Chip>
                                                </Col>
                                            }
                                            {cart.data.inquiry.timeToCall &&
                                                <Col xs={12}>
                                                    <h4>Time to call</h4>
                                                    <Chip>{cart.data.inquiry.timeToCall}</Chip>
                                                </Col>
                                            }
                                            {cart.data.inquiry.comment &&
                                                <Col xs={12}>
                                                    <h4>Email</h4>
                                                    <p>{cart.data.inquiry.comment}</p>
                                                </Col>
                                            }
                                        </Row>
                                    </Grid>
                                </CardText>
                                <CardActions>
                                    <RaisedButton
                                        label="Refresh"
                                        secondary={true}
                                        onTouchTap={this.refreshInquiryStatus}/>
                                </CardActions>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            )
        } else if (cart.data.isFetching){
            return <div>Loading</div>;
        } else {
            return <div>No element found!</div>;
        }
    };

    componentWillMount() {
        this.getInquiry();
    }

    render() {
        return (
            <article id="sou-cart-details">
                {this.getCartElement()}
            </article>
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
