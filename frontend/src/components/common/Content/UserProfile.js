import React, { Component } from "react";
import { Container } from "react-bootstrap";
import authService from "../../../services/auth.service";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authService.getCurrentUser()
        }
    }
    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <Container>
                    <h3>
                        <strong>{currentUser.username}</strong>
                    </h3>
                    <p>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </Container>
            </div>
        )
    }
}