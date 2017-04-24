import React, { Component } from 'react'
import { Col, Grid, Row } from "react-flexbox-grid";
import { ru_RU } from "../../constants/Translations";

export default class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid tagName="section" id="sou-about" className="sou-about">
                <Row tagName="article" className="sou-about__article sou-about__article_yellow" middle="xs">
                    <Col xs={12}>
                        <h2 className="sou-about__article__head i-uppercase i-center">
                            {ru_RU['COMPONENT.PAGES.ABOUT.ABOUT_US.TITLE']}
                        </h2>
                        <div className="sou-about__article__description i-center">
                            <p>{ru_RU['COMPONENT.PAGES.ABOUT.ABOUT_US.DESCRIPTION']}</p>
                        </div>
                    </Col>
                </Row>
                <Row tagName="article" className="sou-about__article sou-about__article_dark-green" middle="xs">
                    <Col xs={12}>
                        <h2 className="sou-about__article__head i-uppercase i-center">
                            {ru_RU['COMPONENT.PAGES.ABOUT.WHAT_WE_DO.TITLE']}
                        </h2>
                        <div className="sou-about__article__description i-center">
                            <p>{ru_RU['COMPONENT.PAGES.ABOUT.WHAT_WE_DO.DESCRIPTION']}</p>
                        </div>
                    </Col>
                </Row>
                <Row tagName="article" className="sou-about__article sou-about__article_brown" middle="xs">
                    <Col xs={12}>
                        <h2 className="sou-about__article__head i-uppercase i-center">
                            {ru_RU['COMPONENT.PAGES.ABOUT.WHY_US.TITLE']}
                        </h2>
                        <div className="sou-about__article__description i-center">
                            <p>{ru_RU['COMPONENT.PAGES.ABOUT.WHY_US.DESCRIPTION']}</p>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
