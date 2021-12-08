import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function ModalFail(props) {
    return (
        <Modal show={props.isShow}>
            <Modal.Header>
                <Modal.Title>Đổi mật khẩu thất bại</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Mật khẩu cũ không đúng!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleClose}>
                    Thử lại
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalFail;