import React, { useEffect, useState } from 'react';
import AuthService from '../../../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { CustomButton } from '../../common';
import style from './register.module.css'
import { useNavigate } from 'react-router-dom';



function RegisterPage(props) {
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([])



    useEffect(() => {
        fetch("/fetchUser").then(res => res.json()).then(result => setUsers(result))
    }, [])



    const handleRegister = (e) => {
        e.preventDefault();
        let roles = ['falculty']
        setMessage("")
        console.log(username, email, password, roles)
        AuthService.register(
            username,
            email,
            password,
            roles
        ).then(
            res => {
                console.log(res.data.message)
                setMessage(res.data.message)
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage)
            }
        )
        navigate('/manage')
    }

    return (
        <div>
            <Container className={style.register_container}>
                <h1>Quản lý tài khoản</h1>
                <Row>
                    <Col md={5}>
                        <div className={style.separator}>
                            <h5>ĐĂNG KÝ TÀI KHOẢN</h5>
                        </div>

                        {message && (
                            <div>
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <Form onSubmit={handleRegister}>

                            <Form.Group className={style.Register_form_field}>
                                <Form.Label className={style.Register_form_label} >Username: </Form.Label>
                                <Form.Control className={style.Register_form_input} name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} type='text' placeholder="Enter Username" />
                            </Form.Group>

                            <Form.Group className={style.Register_form_field}>
                                <Form.Label className={style.Register_form_label}>Email: </Form.Label>
                                <Form.Control className={style.Register_form_input} name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group className={style.Register_form_field}>
                                <Form.Label className={style.Register_form_label}>Password: </Form.Label>
                                <Form.Control className={style.Register_form_input} name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder="Enter Password" />
                            </Form.Group>


                            <CustomButton variant='fill_blue' text='Đăng Ký' />

                        </Form>
                    </Col>

                    <Col md={7}>
                        <div className={style.separator}>
                            <h5>DANH SÁCH TÀI KHOẢN</h5>
                        </div>
                        <br></br>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td><a href={'/authorize?_id=' + user._id}>Cấp quyền</a>|<a href="/manage">Xóa</a></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                    </Col>
                </Row>
            </Container>

        </div>
    )
}


export default RegisterPage