import React, { Component } from 'react';
import AuthService from '../../../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import { CustomButton } from '..';
export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            roles: "falculty",
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
        })
        
        console.log(this.state)
        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.roles
            ).then(
                res => {
                    console.log(res.data.message)
                    this.setState({
                        message: res.data.message
                    })
                }, error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        message: resMessage
                    });
                }
            )

    }
    render() {
        return (
            <div>
                <Container>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={this.handleRegister} method='POST'>
                    <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control name="username" value={this.state.username} onChange={this.onChangeUsername} type='text' placeholder="Enter Username"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control name="email" value={this.state.email} onChange={this.onChangeEmail} type='email' placeholder="Enter Email"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control name="password" value={this.state.password} onChange={this.onChangePassword} type='text' placeholder="Enter Password"/>
                    </Form.Group>

                    

                    <CustomButton variant='fill_blue' text='Đăng Ký' />
                </Form>

                </Container>

            </div>
        )
    }
}
