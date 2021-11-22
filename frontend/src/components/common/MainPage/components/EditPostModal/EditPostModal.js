import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import s from './EditPostModal.module.css'
import axios from 'axios';
import io from 'socket.io-client'
const socket = io()

function EditPostModal(props) {
    const [postContent, setPostContent] = useState(props.postInfo.content)
    const [videoURL, setVideoURL] = useState(props.postInfo.videoURL)
    const [postImage, setPostImage] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('content', postContent)
        formData.append('postImage', postImage)
        formData.append('videoURL', videoURL)
            
        axios.post(`/api/post/${props.postInfo._id}`, formData)
        .then(res => {
            props.handleClose()
            if (res.status === 200) {
                // props.handleSuccess()
                socket.emit('editPost', props.postInfo._id)
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
                    <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={e => handleFormSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formContent">
                            <Form.Label>Nội dung bài viết</Form.Label>
                            <Form.Control 
                                as="textarea" rows={2} value={postContent} name="content"
                                onChange={e => setPostContent(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Thêm ảnh</Form.Label>
                            <Form.Control 
                                type="file" name="postImage"
                                onChange={e => setPostImage(e.target.files[0])} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formYoutubeURL">
                            <Form.Label>Thêm video Youtube</Form.Label>
                            <Form.Control 
                                type="text" value={videoURL} name="videoURL"
                                placeholder="Ví dụ: https://www.youtube.com/watch?v=XqZsoesa55w"
                                onChange={e => setVideoURL(e.target.value)} />
                        </Form.Group>

                        <div className={s.EditPostModal_buttons}>
                            <Button onClick={props.handleClose} type="button" variant="secondary">
                                Huỷ
                            </Button>
                            <Button className={s.EditPostModal_submit_btn} type="submit" variant="success">
                                Chỉnh sửa
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        
    );
}

export default EditPostModal;