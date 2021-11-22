import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client'
const socket = io()

function DeletePostModal(props) {

    const handleDelete = () => {
        axios.post(`/api/post/${props.postID}/delete`)
        .then(res => {
            props.handleClose()
            if (res.status === 200) {
                // props.handleSuccess()
                socket.emit('reloadFeed')
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
                    <Modal.Title>Xoá bài viết</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Bạn có chắc là muốn xoá bài viết này chứ ?
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.handleClose} type="button" variant="secondary">
                        Huỷ
                    </Button>
                    <Button onClick={handleDelete} type="button" variant="danger">
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        
    );
}

export default DeletePostModal;