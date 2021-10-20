import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../Login/LoginPage.module.css'


function LoginPage() {
    return (
        <>
            <div className={styles.Login_background_image}></div>
            <Container fluid className={styles.Login_container}>
                <Row>
                    <Col md={8}>
                    </Col>

                    <Col md={4}>
                        <h2 className={styles.Login_title}>Hệ Thống Thông Tin <br/>Sinh Viên</h2>
                        
                        <Form action='/login' method='POST' >
                            
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Enter email" className={styles.Login_form_input}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password  </Form.Label>
                                <Form.Control type="password" placeholder="Password" className={styles.Login_form_input}/>
                            </Form.Group>

                            <div>
                                <Button variant="primary" type="submit" > Login </Button>
                                {/* Reserved For Google */}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginPage
