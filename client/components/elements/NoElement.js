import React, { Component } from 'react'
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import * as CORE_CONSTANTS from '../../constants/Core'
import { ru_RU } from "../../constants/Translations";

export default class NoElement extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            'height': CORE_CONSTANTS.SIZES.ICON.HEIGHT,
            'width': CORE_CONSTANTS.SIZES.ICON.WIDTH,
            'marginRight': CORE_CONSTANTS.SIZES.ICON.MARGIN_RIGHT,
            'color': CORE_CONSTANTS.COLORS.accent1Color
        };
    }

    render() {
        return (
            <h3 className="i-center">
                <WarningIcon className="i-inline-block" style={this.styles}/>
                <span className="i-inline-block">{ru_RU['COMPONENT.ELEMENT.NO_ELEMENT']}</span>
            </h3>
        )
    }
}
