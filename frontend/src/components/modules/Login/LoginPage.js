import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Col } from 'react-bootstrap';
import styles from '../Login/LoginPage.module.css'
import { CustomButton } from '../../common';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
}


function LoginPage() {


    return (
        <>
            <div className={styles.Login_background_image}></div>
            <Container fluid className={styles.Login_container}>
                <Row>
                    <Col md={8}>
                    </Col>

                    <Col md={4} className={styles.Login_content}>
                        <h2 className={styles.Login_title}><b>Hệ Thống Thông Tin <br />Sinh Viên</b></h2>

                        <Form action='/login' method='POST' className={styles.Login_form}>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label><b>Email</b> </Form.Label>
                                <Form.Control type="email" placeholder="Enter email" className={styles.Login_form_input} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label><b>Password</b>  </Form.Label>
                                <Form.Control type="password" placeholder="Password" className={styles.Login_form_input} />
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
