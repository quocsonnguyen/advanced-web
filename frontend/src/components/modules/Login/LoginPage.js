import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Col } from 'react-bootstrap';
import styles from '../Login/LoginPage.module.css'
import { CustomButton } from '../../common';
import AuthService from '../../../services/auth.service';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = (props) => {
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const responseGoogle = async (response) => {
        let user = response.profileObj
        console.log(user);
        let googleId = user.googleId

        let res
        await axios.get(`/api/${googleId}/isValid`).then(result => res = result.data)

        if (res.code === 0) {
            console.log(res.message)
            localStorage.setItem('user', JSON.stringify({
                // id : 
                // name: user.name,
                // image: "cc"
            }))
        } else {
            console.log(res.message)
            let newUser = {
                username: user.name,
                email: user.email,
                password: googleId,
                googleId: googleId,
                roles : ['student']
            }
            console.log(newUser)
            await axios.post("/api/google/signup", newUser).then(result => {
                console.log(result.code, result.message)
            }
            )
        }

        navigate('/')
    }

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(email, password).then(
            () => {
                navigate('/');
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
                setMessage(resMessage)
            }
        )
    }

    const checkLogin = () => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }

    useEffect(() => {
        // checkLogin()
    }, [])

    return (
        <>
            <div className={styles.Login_background_image}></div>
            <Container fluid className={styles.Login_container}>
                <Row>
                    <Col md={8}>
                    </Col>

                    <Col md={4} className={styles.Login_content}>
                        <h2 className={styles.Login_title}><b>Hệ Thống Thông Tin <br />Sinh Viên</b></h2>

                        {message && (
                            <div className={styles.Login_Error} >
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <Form onSubmit={handleLogin} method='POST' className={styles.Login_form}>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label><b>Email</b> </Form.Label>
                                <Form.Control
                                    name="email" value={email} type="email" placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} className={styles.Login_form_input}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label><b>Password</b>  </Form.Label>
                                <Form.Control
                                    name="password" value={password} type="password" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} className={styles.Login_form_input}
                                />
                            </Form.Group>

                            <div className={styles.Login_login_buttons}>
                                <CustomButton variant='fill_blue' text='Đăng Nhập' className={styles.button22} />
                                <div className={styles.Login_google_login}>
                                    <GoogleLogin
                                        clientId="917753298000-r032b63avasjd0m4il2681eirlc1eoct.apps.googleusercontent.com"
                                        buttonText="Login With Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginPage
