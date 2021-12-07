import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ModalSuccess(props) {
    const navigate = useNavigate()
    
    function handleClose() {
        localStorage.removeItem('user')
        localStorage.removeItem('uid')
        navigate('/login')
    }

    return (
        <Modal show={props.isShow} backdrop="static">
            <Modal.Header>
                <Modal.Title>Chỉnh sửa thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Xin hãy đăng nhập lại!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSuccess;