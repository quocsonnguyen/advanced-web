import React, { Component } from "react";
import { Container } from "react-bootstrap";

import userService from '../../../services/user.service';

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <Container>
                <header>
                    <h3>{this.state.content}</h3>
                </header>
            </Container>
        );
    }
}