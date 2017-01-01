import React, { Component } from 'react'
import * as CORE_CONSTANTS from '../../constants/Core'
import Nav from './Nav'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user } = this.props;

        let logos = Array
            .apply(0, Array(typeof amountOfLogos === 'number' && amountOfLogos > 0
                ? amountOfLogos
                : CORE_CONSTANTS.NUMBER_LOGO_SHADOWED))
            .map(function(){return 0;});

        return (
            <header role="banner">
                <div className="header__nav_holder">
                    <Nav user={this.props.user} />
                </div>
            </header>
        )
    }
}
