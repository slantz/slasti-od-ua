import React, { Component } from 'react'
import { Col, Grid, Row } from "react-flexbox-grid";

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
                            about us
                        </h2>
                        <div className="sou-about__article__description">
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        </div>
                    </Col>
                </Row>
                <Row tagName="article" className="sou-about__article sou-about__article_dark-green" middle="xs">
                    <Col xs={12}>
                        <h2 className="sou-about__article__head i-uppercase i-center">
                            what we do
                        </h2>
                        <div className="sou-about__article__description">
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        </div>
                    </Col>
                </Row>
                <Row tagName="article" className="sou-about__article sou-about__article_brown" middle="xs">
                    <Col xs={12}>
                        <h2 className="sou-about__article__head i-uppercase i-center">
                            why us
                        </h2>
                        <div className="sou-about__article__description">
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
