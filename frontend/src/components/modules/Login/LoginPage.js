import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Col } from 'react-bootstrap';
import styles from '../Login/LoginPage.module.css'
import { CustomButton } from '../../common';
import AuthService from '../../../services/auth.service';
import { GoogleLogin } from 'react-google-login';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

const LoginPage = (props) => {
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const responseGoogle = async (res) => {
        let user = res.profileObj
        if (user.email.slice(user.email.length - 20) === "@student.tdtu.edu.vn") {
            let googleId = user.googleId
        
            let apiRes
            await axios.get(`/api/${googleId}/isValid`).then(result => apiRes = result.data)
            
            if (apiRes.code === 0) {
                localStorage.setItem('user', JSON.stringify({
                    id : apiRes.user._id,
                    name: apiRes.user.name,
                    image: apiRes.user.image,
                    role: apiRes.user.role
                }))
                localStorage.setItem('uid', apiRes.user._id)
                navigate('/')
            } else {
                let newUser = {
                    username : '',
                    name : user.name,
                    email : user.email,
                    password : user.email,
                    googleId : googleId,
                    roles : ['student']
                }

                let newApiRes
                await axios.post('/api/google/signup', newUser).then(result => newApiRes = result.data)
                localStorage.setItem('user', JSON.stringify({
                    id : newApiRes.user._id,
                    name: newApiRes.user.name,
                    image: newApiRes.user.image,
                    role: 'student'
                }))
                localStorage.setItem('uid', newApiRes.user._id)
                navigate('/')
            }
        } else {
            setMessage("Hãy đăng nhập bằng tài khoản sinh viên")
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
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
        checkLogin()
    })

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

                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label><b>Tên đăng nhập</b></Form.Label>
                                <Form.Control 
                                    name="username" value={username} type="text" placeholder="Nhập tên đăng nhập"
                                    onChange={(e) => setUsername(e.target.value)}  className={styles.Login_form_input} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label><b>Mật khẩu</b></Form.Label>
                                <Form.Control 
                                    name="password" value={password} type="password" placeholder="Nhật mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}  className={styles.Login_form_input} 
                                />
                            </Form.Group>

                            <div className={styles.Login_login_buttons}>
                                <CustomButton variant='fill_blue' text='Đăng Nhập' className={styles.button22} />
                                <div className={styles.Login_google_login}>
                                    <GoogleLogin
                                        clientId="917753298000-r032b63avasjd0m4il2681eirlc1eoct.apps.googleusercontent.com"
                                        buttonText="Login With Google"
                                        onSuccess={responseGoogle}
                                        // onFailure={responseGoogle}
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
