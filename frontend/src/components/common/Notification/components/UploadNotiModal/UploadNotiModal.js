import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import s from './UploadNotiModal.module.css'
import axios from 'axios';
import { socket } from '../../../../../App';

function UploadNotiModal(props) {
    let currentUser = JSON.parse(localStorage.getItem('user'))
    let [title, setTitle] = useState('')
    let [desc, setDesc] = useState('')
    let [content, setContent] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
            
        axios.post(`/api/notification`, {
            creatorID: currentUser.id,
            faculty: currentUser.name,
            title: title,
            description: desc,
            content: content
        })
        .then(res => {
            props.handleClose()
            socket.emit('newNoti', currentUser.name)
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
                    <Modal.Title>Đăng thông báo mới</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={e => handleFormSubmit(e)}>
                        <Form.Group className="mb-3" controlId="faculty">
                            <Form.Label>Từ Phòng/Khoa</Form.Label>
                            <Form.Control type="text" value={currentUser.name} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control 
                                as="textarea" value={title} rows={1}
                                onChange={e => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Mô tả thông báo</Form.Label>
                            <Form.Control 
                                as="textarea" value={desc} rows={2}
                                onChange={e => setDesc(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Nội dung chính</Form.Label>
                            <Form.Control 
                                as="textarea" value={content} rows={2}
                                onChange={e => setContent(e.target.value)} />
                        </Form.Group>

                        <div className={s.UploadNotiModal_buttons}>
                            <Button onClick={props.handleClose} type="button" variant="secondary">
                                Huỷ
                            </Button>
                            <Button className={s.UploadNotiModal_submit_btn} type="submit" variant="success">
                                Đăng
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
    );
}

export default UploadNotiModal;