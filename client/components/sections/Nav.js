import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

import { checkUserIsAuthorized } from '../../middleware/auth'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user } = this.props;

        let adminLink = function() {
            if (checkUserIsAuthorized(user)) {
                return  <li>
                            <Link to="/admin">Admin</Link>
                        </li>;
            }
            return null;
        };

        return (
            <ul>
                <li>
                    <IndexLink to="/" activeClassName="active">
                        Home
                    </IndexLink>
                </li>
                <li>
                    <Link to="/bakery">Bakery</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                {adminLink()}
            </ul>
        )
    }
}
