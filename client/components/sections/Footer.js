import React, { Component } from 'react'
import { Col, Grid, Row } from "react-flexbox-grid";
import { IconButton } from "material-ui";
import * as CORE_CONSTANTS from "../../constants/Core"

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
                                    <h3 className="sou-footer__title">Contact us</h3>
                                </Col>
                            </Row>
                            <hr/>
                            <Row right="xs">
                                <Col xs={12} sm={6}>
                                    <h4>Telephone:</h4>
                                    <div>+3657868789789789</div>
                                    <h4>Email:</h4>
                                    <div>sffgdgfgh@dghghjg.ghj</div>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <h4>Social media:</h4>
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
