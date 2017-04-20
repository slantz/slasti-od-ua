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
                                        subtitle="Subtitle"
                                        children={<span>
                                            <span>
                                                {bake.numberOfPieces} {bake.category}{bake.numberOfPieces > 1 ? "s" : null}
                                            </span>
                                        </span>}
                                    />
                                    <CardMedia
                                        overlay={
                                            <CardTitle
                                                title={bake.name}
                                                subtitle={bake.description} />
                                        }>
                                        <img src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`} />
                                    </CardMedia>
                                    <CardTitle title={bake.category} subtitle={bake.event ? bake.event.type : ''} />
                                    <CardText>
                                        <Row middle="xs">
                                            <Col xs={12}>
                                                <h4>Ingredients</h4>
                                                {bake.ingredients.map((ingredient) => {
                                                    return <Chip key={ingredient._id}>{ingredient.type} / {ingredient.taste} / {ingredient.substance}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>Filling</h4>
                                                {bake.filling.map((filling) => {
                                                    return <Chip key={filling._id}>{filling.taste} / {filling.composition}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>Basis</h4>
                                                {bake.basis.map((basis) => {
                                                    return <Chip key={basis._id}>{basis.type} / {basis.composition}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>Decor</h4>
                                                {bake.decor.map((decor, index) => {
                                                    return <Chip key={index}>{decor}</Chip>;
                                                })}
                                            </Col>
                                            <Col xs={12}>
                                                <h4>Event</h4>
                                                <Chip>{bake.event && bake.event.type}</Chip>
                                            </Col>
                                        </Row>
                                    </CardText>
                                    <CardActions>
                                        <RaisedButton label="Go to order page" primary={true} onTouchTap={() => this.goToOrderPageWithSomeDetails(bake)} />
                                        {user.admin && (
                                            <Link to={"/admin/update/" + bake._id}>
                                                <RaisedButton
                                                    label="Update"
                                                    secondary={true}/>
                                            </Link>
                                        )}
                                        {user.admin && (
                                            <Link className="i-right i-margin_block_horizontal_right_0" to={"/admin/delete/" + bake._id}>
                                                <RaisedButton
                                                    label="Delete"
                                                    backgroundColor={CORE_CONSTANTS.COLORS.alert}
                                                    buttonStyle={{'color': CORE_CONSTANTS.COLORS.alternateTextColor}}/>
                                            </Link>
                                        )}
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
