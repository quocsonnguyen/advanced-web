import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function ModalSuccess(props) {
    return (
        <Modal show={props.isShow} onHide={props.handleClose}>
            <Modal.Body>
                Đăng bài viết thành công !
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