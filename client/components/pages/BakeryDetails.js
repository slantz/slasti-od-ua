import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as BakeryActions from '../../actions/BakeryActions'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import { Chip } from "material-ui";

class BakeryDetails extends Component {
    constructor(props) {
        super(props)
    }

    getBakeryElement = () => {
        const { bakery : { data }, params, user } = this.props;

        let bake = data.items.filter((bake) => bake._id === params.id);

        if (bake.length > 0) {
            bake = bake[0];
            return (
                <Grid tagName="article" fluid={true}>
                    <Row middle="xs">
                        <Col xs={12} sm={8} className="i-text-uppercase">
                            <Card>
                                <CardHeader
                                    title="URL Avatar"
                                    subtitle="Subtitle"
                                    children={<span>
                                        <span>
                                            {bake.numberOfPieces} {bake.category}{bake.numberOfPieces > 1 ? "s" : null}
                                        </span>
                                    </span>}
                                />
                                <CardMedia overlay={<CardTitle title={bake.name} subtitle={bake.description} />}>
                                    <img src={`http://slasti.od.ua:3001/client/static/images/${bake.imgUrl}`} />
                                </CardMedia>
                                <CardTitle title="Card title" subtitle="Card subtitle" />
                                <CardText>
                                    <Grid tagName="article">
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
                                    </Grid>
                                </CardText>
                                <CardActions>
                                    <RaisedButton label="Action1" primary={true} />
                                    <RaisedButton label="Action2" primary={true} />
                                    {user.admin && <RaisedButton
                                        label="Update"
                                        secondary={true}
                                        href={"/admin/update/" + bake._id}/>}
                                </CardActions>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            )
        } else {
            return <div>No element found!</div>
        }
    };

    render() {
        return (
            <section id="sou-bakery-detail">
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
