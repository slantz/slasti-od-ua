import React, { Component } from 'react'
import {Link} from 'react-router'
import * as CORE_CONSTANTS from '../../constants/Core'
import Nav from './Nav'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    compileLoginWithVkLink = () => {
        return <button onClick={this.loginWithVk}>azaza vk login</button>
    };

    loginWithVk = () => {
        window.location.href = '/auth/vk'
    };

    greet = () => {
        const { user } = this.props;

        if (!user.payload.name) {
            return null;
        }

        return <h1>Greetings, {user.payload.name}!</h1>
    };

    render() {
        return (
            <header role="banner">
                {this.compileLoginWithVkLink()}
                {this.greet()}
                <div className="header__nav_holder">
                    <Nav user={this.props.user} />
                </div>
            </header>
        )
    }
}
