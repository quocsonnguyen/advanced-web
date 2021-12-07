import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import s from './ModalChangePassword.module.css'
import axios from 'axios';

function ModalChangePassword(props) {
    let uid = localStorage.getItem('uid')
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
            
        axios.post(`/api/user/${uid}/changePassword`, {
            oldPassword : oldPassword,
            newPassword : newPassword
        })
        .then(res => {
            props.handleClose()
            if (res.data.code === 0) {        
                props.handleSuccess()
            } else {
                props.handleFail()
            }
        })
    }

    return (
            <Modal
                show={props.isShow}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={e => handleFormSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formOldPassword">
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control 
                                type="password" value={oldPassword} name="oldPassword"
                                onChange={e => setOldPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNewPassword">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control 
                                type="password" value={newPassword} name="newPassword"
                                onChange={e => setNewPassword(e.target.value)} />
                        </Form.Group>

                        <div className={s.ModalChangePassword_buttons}>
                            <Button onClick={props.handleClose} type="button" variant="secondary">
                                Huỷ
                            </Button>
                            <Button className={s.ModalChangePassword_submit_btn} type="submit" variant="success">
                                Đổi
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
    );
}

export default ModalChangePassword;