import React, { Component } from 'react'
import { RefreshIndicator } from "material-ui";

export default class Loader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <RefreshIndicator
                size={60}
                left={window.innerWidth / 2 - 30}
                top={window.innerHeight / 2 - 30}
                status="loading"
            />
        )
    }
}
