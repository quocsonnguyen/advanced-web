import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import s from './ModalEditInfo.module.css'
import axios from 'axios';

function ModalEditInfo(props) {
    let uid = localStorage.getItem('uid')
    const [name, setName] = useState(props.name)
    const [avatar, setAvatar] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', name)

        if (avatar) {
            formData.append('avatar', avatar)
        } else {
            formData.append('avatar', '')
        }
            
        axios.post(`/api/user/${uid}/edit`, formData)
        .then(res => {
            props.handleClose()
            if (res.status === 200) {        
                props.handleSuccess()
            } else {
                // props.handleFail()
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
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={e => handleFormSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formContent">
                            <Form.Label>Tên của bạn</Form.Label>
                            <Form.Control 
                                type="text" value={name} name="name"
                                onChange={e => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control 
                                type="file" name="avatar"
                                onChange={e => setAvatar(e.target.files[0])} />
                        </Form.Group>

                        <div className={s.ModalEditInfo_buttons}>
                            <Button onClick={props.handleClose} type="button" variant="secondary">
                                Huỷ
                            </Button>
                            <Button className={s.ModalEditInfo_submit_btn} type="submit" variant="success">
                                Chỉnh sửa
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        
    );
}

export default ModalEditInfo;