import React, { Component } from 'react'
import { Link } from "react-router";

export default class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section id="sou-about">
                <article>about me</article>
                <article>what we do</article>
                <article>why me</article>
            </section>
        )
    }
}
