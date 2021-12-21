import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { socket } from '../../../../../App'

function DeleteCommentModal(props) {

    const handleDelete = () => {
        axios.post(`/api/post/${props.postID}/comment/${props.commentID}/delete`)
        .then(res => {
            props.handleClose()
            if (res.status === 200) {
                socket.emit('reloadComment')
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
                    <Modal.Title>Xoá bình luận</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Bạn có chắc là muốn xoá bình luận này chứ ?
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

export default DeleteCommentModal;