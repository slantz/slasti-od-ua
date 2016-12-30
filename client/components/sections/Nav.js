import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul>
                <li>
                    <Link to="catalog">Catalog</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
                <li>
                    <Link to="cart">Cart</Link>
                </li>
                <li>
                    <Link to="admin">Admin</Link>
                </li>
            </ul>
        )
    }
}
