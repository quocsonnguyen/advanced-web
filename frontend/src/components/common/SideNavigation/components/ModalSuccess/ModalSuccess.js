import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function ModalSuccess(props) {
    return (
        <Modal show={props.isShow} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đăng bài viết thành công!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bài viết này đã được đăng lên dòng thời gian!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSuccess;