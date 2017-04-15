import React, { Component } from 'react'
import { Col, Grid, Row } from "react-flexbox-grid";

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <footer role="contentinfo">
                <Grid tagName="article" fluid={true}>
                    <Row middle="xs">
                        <Col xs={12}>
                            <p>Contact us</p>
                        </Col>
                    </Row>
                </Grid>
            </footer>
        )
    }
}
