import React, { Component } from 'react'
import { Col, Grid, Row } from "react-flexbox-grid";
import { IconButton } from "material-ui";
import * as CORE_CONSTANTS from "../../constants/Core"
import { ru_RU } from "../../constants/Translations";

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <footer role="contentinfo">
                <Grid tagName="section">
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <Col xs={12}>
                                    <h3 className="sou-footer__title">{ru_RU['COMPONENT.SECTIONS.FOOTER.CONTACT_US']}</h3>
                                </Col>
                            </Row>
                            <hr/>
                            <Row right="xs">
                                <Col xs={12} sm={6}>
                                    <h4>{ru_RU['COMPONENT.SECTIONS.FOOTER.TELEPHONE']}:</h4>
                                    <a href="tel:+380632130613">+380 (63) 213-06-13</a>
                                    <h4>{ru_RU['COMPONENT.SECTIONS.FOOTER.EMAIL']}:</h4>
                                    <div>slasti.od.ua@gmail.com</div>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <h4>{ru_RU['COMPONENT.SECTIONS.FOOTER.SOCIAL_MEDIA']}:</h4>
                                    <div>
                                        <IconButton
                                            iconClassName="sou-footer__social__icon icon-instagram"
                                            iconStyle={{'color': CORE_CONSTANTS.COLORS.instagram, 'fontSize': '30px'}}
                                            style={{'width': 'auto', 'height': 'auto', 'paddingLeft': '0'}}
                                            href="https://www.instagram.com/slasti_odessa/"
                                            target="_blank"
                                        />
                                        <IconButton
                                            iconClassName="sou-footer__social__icon icon-facebook2"
                                            iconStyle={{'color': CORE_CONSTANTS.COLORS.facebook, 'fontSize': '30px'}}
                                            style={{'width': 'auto', 'height': 'auto'}}
                                            href="https://www.facebook.com/profile.php?id=100012691151235"
                                            target="_blank"
                                        />
                                        <IconButton
                                            iconClassName="sou-footer__social__icon icon-vk"
                                            iconStyle={{'color': CORE_CONSTANTS.COLORS.vk, 'fontSize': '30px'}}
                                            style={{'width': 'auto', 'height': 'auto'}}
                                            href="https://vk.com/id63830569"
                                            target="_blank"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </footer>
        )
    }
}
