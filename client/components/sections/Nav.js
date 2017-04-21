import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';

import { checkUserIsAuthorized } from '../../middleware/auth'
import { SIZES } from "../../constants/Core";

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.navigationIndeces = {
            '': 0,
            'bakery': 1,
            'about': 2,
            'cart': 3,
            'admin': 4
        };
    }

    setCurrentActiveTabIndex = (segment) => {
        return this.navigationIndeces[segment];
    };

    render() {
        const { user, segment } = this.props;

        let adminLink = function() {
            if (checkUserIsAuthorized(user)) {
                return  <Tab label={<Link to="/admin" className="sou-header__nav__link">Admin</Link>} value="admin" style={{'height': SIZES.HEADER.HEIGHT}}/>;
            }
            return null;
        };

        return (
            <Tabs className="sou-header__nav" initialSelectedIndex={this.setCurrentActiveTabIndex(segment)} value={segment}>
                <Tab label={<Link to="/bakery" className="sou-header__nav__link">Bakery</Link>} value="bakery" style={{'height': SIZES.HEADER.HEIGHT}}/>
                <Tab label={<Link to="/about" className="sou-header__nav__link">About</Link>} value="about" style={{'height': SIZES.HEADER.HEIGHT}}/>
                <Tab label={<Link to="/order" className="sou-header__nav__link">Order</Link>} value="order" style={{'height': SIZES.HEADER.HEIGHT}}/>
                <Tab label={<Link to="/cart" className="sou-header__nav__link">Cart</Link>} value="cart" style={{'height': SIZES.HEADER.HEIGHT}}/>
                {adminLink()}
            </Tabs>
        )
    }
}
