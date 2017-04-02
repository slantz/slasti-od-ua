import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index';
import Select from 'react-select';
import AdminCreateIngredientsForm from '../popover/AdminCreateIngredientsForm';
import AdminCreateFillingForm from '../popover/AdminCreateFillingForm';
import AdminCreateBasisForm from '../popover/AdminCreateBasisForm';
import AdminCreateCategoryWeightDecorForm from "../popover/AdminCreateCategoryWeightDecorForm";

class AdminUpdate extends Component {
    constructor(props) {
        super(props);
        this.isPrepopulatedOnInitialLoad = false;
    }

    showIngredientsNewForm = () => {
        const { AdminActions: { showIngredientsNewForm } } = this.props;
        showIngredientsNewForm();
    };

    showFillingNewForm = () => {
        const { AdminActions: { showFillingNewForm } } = this.props;
        showFillingNewForm();
    };

    showBasisNewForm = () => {
        const { AdminActions: { showBasisNewForm } } = this.props;
        showBasisNewForm();
    };

    setCurrentIngredients = (value) => {
        const { AdminActions: { setCurrentIngredients } } = this.props;
        return setCurrentIngredients(value);
    };

    setCurrentFilling = (value) => {
        const { AdminActions: { setCurrentFilling } } = this.props;
        return setCurrentFilling(value);
    };

    setCurrentBasis = (value) => {
        const { AdminActions: { setCurrentBasis } } = this.props;
        return setCurrentBasis(value);
    };

    setCurrentDecor = (decor) => {
        const { AdminActions: { setNewDecor } } = this.props;
        return setNewDecor(decor);
    };

    setCurrentIngredientForCreationForm = (ingredient) => {
        const { AdminActions: { createNewIngredient } } = this.props;
        createNewIngredient({
            ingredients: [{
                type: ingredient.type,
                taste: ingredient.taste,
                substance: ingredient.substance,
                price: ingredient.price
            }]
        }).then(() => this.submitAndGoToNextImage());
    };

    setCurrentFillingForCreationForm = (filling) => {
        const { AdminActions: { createNewFilling } } = this.props;
        createNewFilling({
            filling: [{
                taste: filling.taste,
                composition: filling.composition
            }]
        }).then(() => this.submitAndGoToNextImage());
    };

    setCurrentBasisForCreationForm = (basis) => {
        const { AdminActions: { createNewBasis } } = this.props;
        createNewBasis({
            basis: [{
                type: basis.type,
                composition: basis.composition
            }]
        }).then(() => this.submitAndGoToNextImage());
    };

    elementInfiniteLoad = () => {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    };

    getBakeryById = () => {
        const {
            params,
            AdminActions: {
                getBakeryById
            }
        } = this.props;

        return getBakeryById(params.id);
    };

    getIngredients = () => {
        const { AdminActions: { getIngredients } } = this.props;
        return getIngredients();
    };

    getFilling = () => {
        const { AdminActions: { getFilling } } = this.props;
        return getFilling();
    };

    getBasis = () => {
        const { AdminActions: { getBasis } } = this.props;
        return getBasis();
    };

    getBakeryElement = () => {
        const {
            admin: {
                ingredients: {
                    ingredients,
                    currentIngredients
                },
                filling: {
                    filling,
                    currentFilling
                },
                basis: {
                    basis,
                    currentBasis
                },
                currentDecor,
                bakeryItem,
                ingredients_showCreateNewForm,
                filling_showCreateNewForm,
                basis_showCreateNewForm
            }
        } = this.props;

        if (bakeryItem.item) {
            if (!this.isPrepopulatedOnInitialLoad) {
                if (currentBasis && currentFilling && currentIngredients && currentDecor) {
                    if (currentBasis.length === 0) {
                        this.setCurrentBasis(bakeryItem.item.basis);
                        return this.elementInfiniteLoad();
                    }

                    if (currentFilling.length === 0) {
                        this.setCurrentFilling(bakeryItem.item.filling);
                        return this.elementInfiniteLoad();
                    }

                    if (currentIngredients.length === 0) {
                        this.setCurrentIngredients(bakeryItem.item.ingredients);
                        return this.elementInfiniteLoad();
                    }

                    if (currentDecor.length === 0) {
                        this.setCurrentDecor(bakeryItem.item.decor.map((dec) => {
                            return {
                                label: dec,
                                value: dec
                            };
                        }));
                        return this.elementInfiniteLoad();
                    }

                    this.isPrepopulatedOnInitialLoad = true;
                }
            }

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
                                            {bakeryItem.item.numberOfPieces} {bakeryItem.item.category}{bakeryItem.item.numberOfPieces > 1 ? "s" : null}
                                        </span>
                                    </span>}
                                />
                                <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
                                    <img src={`http://slasti.od.ua:3001/client/static/images/${bakeryItem.item.imgUrl}`} />
                                </CardMedia>
                                <CardTitle title="Card title" subtitle="Card subtitle" />
                                <CardText>
                                    <Grid tagName="article">
                                        <Row middle="xs">
                                            <Col xs={12}>
                                                <Select.Creatable
                                                    name="select-admin-upload-bakery-ingredients"
                                                    value={currentIngredients}
                                                    multi={true}
                                                    valueKey="_id"
                                                    labelKey="type"
                                                    options={ingredients}
                                                    onChange={this.setCurrentIngredients}
                                                />
                                            </Col>
                                            <Col xs={12}>
                                                <Select.Creatable
                                                    name="select-admin-upload-bakery-filling"
                                                    value={currentFilling}
                                                    multi={true}
                                                    valueKey="_id"
                                                    labelKey="composition"
                                                    options={filling}
                                                    onChange={this.setCurrentFilling}
                                                />
                                            </Col>
                                            <Col xs={12}>
                                                <Select.Creatable
                                                    name="select-admin-upload-bakery-basis"
                                                    value={currentBasis}
                                                    multi={true}
                                                    valueKey="_id"
                                                    labelKey="type"
                                                    options={basis}
                                                    onChange={this.setCurrentBasis}
                                                />
                                            </Col>
                                            <Col xs={12}>
                                                <AdminCreateCategoryWeightDecorForm currentDecor={currentDecor}
                                                                                    onSetCurrentDecor={this.setCurrentDecor}/>
                                            </Col>
                                            {ingredients_showCreateNewForm &&
                                                <Col xs={12}>
                                                    <AdminCreateIngredientsForm onSubmit={this.setCurrentIngredientForCreationForm}/>
                                                </Col>
                                            }
                                            {filling_showCreateNewForm &&
                                                <Col xs={12}>
                                                    <AdminCreateFillingForm onSubmit={this.setCurrentFillingForCreationForm}/>
                                                </Col>
                                            }
                                            {basis_showCreateNewForm &&
                                                <Col xs={12}>
                                                    <AdminCreateBasisForm onSubmit={this.setCurrentBasisForCreationForm}/>
                                                </Col>
                                            }
                                        </Row>
                                    </Grid>
                                </CardText>
                                <CardActions>
                                    <RaisedButton label="Update" primary={true} />
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

    componentWillMount() {
        this.getBakeryById();
        this.getIngredients();
        this.getFilling();
        this.getBasis();
    }

    render() {
        return (
            <section id="sou-admin-update">
                {this.getBakeryElement()}
            </section>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        admin: state.admin,
        form: state.form
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        AdminActions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdate)
