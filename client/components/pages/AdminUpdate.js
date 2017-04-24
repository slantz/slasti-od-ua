import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AdminActions from '../../actions/AdminActions'
import * as CORE_CONSTANTS from '../../constants/Core';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index';
import Select from 'react-select';
import AdminCreateIngredientsForm from '../popover/AdminCreateIngredientsForm';
import AdminCreateFillingForm from '../popover/AdminCreateFillingForm';
import AdminCreateBasisForm from '../popover/AdminCreateBasisForm';
import AdminCreateCategoryWeightDecorForm from "../popover/AdminCreateCategoryWeightDecorForm";
import AdminCreateEventForm from "../popover/AdminCreateEventForm";
import { ru_RU } from "../../constants/Translations";

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

    showEventNewForm = () => {
        const { AdminActions: { showEventNewForm } } = this.props;
        showEventNewForm();
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

    setCurrentEvent = (value) => {
        const { AdminActions: { setCurrentEvent } } = this.props;
        return setCurrentEvent(value);
    };

    setCurrentStuff = (data) => {
        const { AdminActions: { setCurrentStuff } } = this.props;
        return setCurrentStuff(data);
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
        }).then(() => this.update());
    };

    setCurrentFillingForCreationForm = (filling) => {
        const { AdminActions: { createNewFilling } } = this.props;
        createNewFilling({
            filling: [{
                taste: filling.taste,
                composition: filling.composition
            }]
        }).then(() => this.update());
    };

    setCurrentBasisForCreationForm = (basis) => {
        const { AdminActions: { createNewBasis } } = this.props;
        createNewBasis({
            basis: [{
                type: basis.type,
                composition: basis.composition
            }]
        }).then(() => this.update());
    };

    setCurrentEventForCreationForm = (event) => {
        const { AdminActions: { createNewEvent } } = this.props;
        createNewEvent({
            event: {
                type: event.type
            }
        }).then(() => this.update());
    };

    update = () => {
        const {
            admin: {
                ingredients: {
                    currentIngredients
                },
                filling: {
                    currentFilling
                },
                basis: {
                    currentBasis
                },
                event: {
                    currentEvent
                },
                currentDecor
            },
            form,
            AdminActions: {
                hideAllForms
            }
        } = this.props;

        let ingredientsToBeSaved = currentIngredients.filter((ingredient) => ingredient._id === ingredient.type);
        let fillingToBeSaved = currentFilling.filter((filling) => filling._id === filling.composition);
        let basisToBeSaved = currentBasis.filter((basis) => basis._id === basis.type);
        let eventToBeSaved = currentEvent;

        hideAllForms();

        if (ingredientsToBeSaved.length) {
            alert(ru_RU['COMPONENT.PAGES.ADMIN.UPDATE.ALERT_SAVE_CUSTOM_INGREDIENT']);
            return this.showIngredientsNewForm();
        }

        if (fillingToBeSaved.length) {
            alert(ru_RU['COMPONENT.PAGES.ADMIN.UPDATE.ALERT_SAVE_CUSTOM_FILLING']);
            return this.showFillingNewForm();
        }

        if (basisToBeSaved.length) {
            alert(ru_RU['COMPONENT.PAGES.ADMIN.UPDATE.ALERT_SAVE_CUSTOM_BASIS']);
            return this.showBasisNewForm();
        }

        if (eventToBeSaved._id === eventToBeSaved.type) {
            alert(ru_RU['COMPONENT.PAGES.ADMIN.UPDATE.ALERT_SAVE_CUSTOM_EVENT']);
            return this.showEventNewForm();
        }

        let newItem = {
            currentIngredients,
            currentFilling,
            currentBasis,
            currentEvent,
            category: form['admin-create-category-weight-decor'].values.category,
            name: form['admin-create-category-weight-decor'].values.name
        };

        if (currentDecor.length > 0) {
            newItem.decor = currentDecor.map((decor) => decor.value);
        }

        if (form['admin-create-category-weight-decor'].values.weight) {
            newItem.weight = form['admin-create-category-weight-decor'].values.weight;
        }

        if (form['admin-create-category-weight-decor'].values.numberOfPieces) {
            newItem.numberOfPieces = form['admin-create-category-weight-decor'].values.numberOfPieces;
        }

        if (form['admin-create-category-weight-decor'].values.description) {
            newItem.description = form['admin-create-category-weight-decor'].values.description;
        }

        return this.updateBakeryWithStuff(newItem);
    };

    updateBakeryWithStuff = (newItem) => {
        const {
            params,
            AdminActions: {
                updateBakery,
                clearCurrentStuff
            }
        } = this.props;

        clearCurrentStuff();
        updateBakery({
            "bakeryWithStuff": {
                [params.id]: {
                    ["basis"] : newItem.currentBasis.map((currentBasis) => currentBasis._id),
                    ["filling"] : newItem.currentFilling.map((currentFilling) => currentFilling._id),
                    ["ingredients"] : newItem.currentIngredients.map((currentIngredient) => currentIngredient._id),
                    ["event"] : newItem.currentEvent._id,
                    ["name"] : newItem.name,
                    ["description"] : newItem.description,
                    ["category"] : newItem.category,
                    ["decor"] : newItem.decor,
                    ["weight"] : newItem.weight,
                    ["numberOfPieces"] : newItem.numberOfPieces
                }
            }
        }, params.id);
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

    getEvents = () => {
        const { AdminActions: { getEvents } } = this.props;
        return getEvents();
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
                event: {
                    events,
                    currentEvent
                },
                currentDecor,
                bakeryItem,
                ingredients_showCreateNewForm,
                filling_showCreateNewForm,
                basis_showCreateNewForm,
                event_showCreateNewForm
            }
        } = this.props;

        if (bakeryItem.item) {
            if (!this.isPrepopulatedOnInitialLoad) {
                if (currentBasis && currentFilling && currentIngredients && currentDecor && currentEvent) {
                    let data = {};

                    if (currentBasis.length === 0) {
                        data.basis = bakeryItem.item.basis;
                    }

                    if (currentFilling.length === 0) {
                        data.filling = bakeryItem.item.filling;
                    }

                    if (currentIngredients.length === 0) {
                        data.ingredients = bakeryItem.item.ingredients;
                    }

                    if (!currentEvent || Object.keys(currentEvent).length === 0) {
                        data.event = bakeryItem.item.event;
                    }

                    if (currentDecor.length === 0) {
                        data.decor = bakeryItem.item.decor.map((dec) => {
                            return {
                                label: dec,
                                value: dec
                            };
                        });
                    }

                    this.isPrepopulatedOnInitialLoad = true;

                    if (Object.keys(data).length > 0) {
                        return this.setCurrentStuff(data);
                    }
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
                                            {bakeryItem.item.numberOfPieces} {bakeryItem.item.category}{bakeryItem.item.numberOfPieces > 1 ? "ы" : null}
                                        </span>
                                    </span>}
                                />
                                <CardMedia overlay={<CardTitle title={bakeryItem.name} subtitle={bakeryItem.description} />}>
                                    <img src={`${CORE_CONSTANTS.IMAGES_ROOT}${bakeryItem.item.imgUrl}`} />
                                </CardMedia>
                                <CardTitle title="Card title" subtitle="Card subtitle" />
                                <CardText>
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
                                                noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
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
                                                noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
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
                                                noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Select.Creatable
                                                name="select-admin-upload-bakery-event"
                                                value={currentEvent}
                                                valueKey="_id"
                                                labelKey="type"
                                                options={events}
                                                onChange={this.setCurrentEvent}
                                                noResultsText={ru_RU['COMPONENT.SECTIONS.FILTERS.NO_RESULTS_TEXT']}
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
                                        {event_showCreateNewForm &&
                                            <Col xs={12}>
                                                <AdminCreateEventForm onSubmit={this.setCurrentEventForCreationForm}/>
                                            </Col>
                                        }
                                    </Row>
                                </CardText>
                                <CardActions>
                                    <RaisedButton label={ru_RU['COMPONENT.PAGES.ADMIN.UPDATE.UPDATE']} primary={true} onTouchTap={this.update}/>
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
        this.getEvents();
    }

    componentWillUnmount() {
        const {
            AdminActions: {
                clearCurrentStuff
            }
        } = this.props;

        this.isPrepopulatedOnInitialLoad = false;
        clearCurrentStuff();
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
