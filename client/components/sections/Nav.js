import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';

import { checkUserIsAuthorized } from '../../middleware/auth'

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
                return  <Tab label={<Link to="/admin">Admin</Link>} value="admin"/>;
            }
            return null;
        };

        return (
            <Tabs initialSelectedIndex={this.setCurrentActiveTabIndex(segment)} value={segment} style={{'flex': '1 auto'}}>
                <Tab label={<Link to="/bakery">Bakery</Link>} value="bakery"/>
                <Tab label={<Link to="/about">about</Link>} value="about"/>
                <Tab label={<Link to="/cart">Cart</Link>} value="cart"/>
                {adminLink()}
            </Tabs>
        )
    }
}
