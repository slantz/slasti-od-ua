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
                return  <Tab label={<Link to="/admin" style={{'height': '60px', 'width': '100%', 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>Admin</Link>} value="admin" style={{'height': '60px'}}/>;
            }
            return null;
        };

        return (
            <Tabs initialSelectedIndex={this.setCurrentActiveTabIndex(segment)} value={segment} style={{'flex': '1 auto'}} tabTemplateStyle={{'height': '60px'}}>
                <Tab label={<Link to="/bakery" style={{'height': '60px', 'width': '100%', 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>Bakery</Link>} value="bakery" style={{'height': '60px'}}/>
                <Tab label={<Link to="/about" style={{'height': '60px', 'width': '100%', 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>About</Link>} value="about" style={{'height': '60px'}}/>
                <Tab label={<Link to="/order" style={{'height': '60px', 'width': '100%', 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>Order</Link>} value="order" style={{'height': '60px'}}/>
                <Tab label={<Link to="/cart" style={{'height': '60px', 'width': '100%', 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>Cart</Link>} value="cart" style={{'height': '60px'}}/>
                {adminLink()}
            </Tabs>
        )
    }
}
