import React from 'react';
import s from './NotificationModal.module.css'
import { Modal, Button } from 'react-bootstrap';

function NotificationModal(props) {
    return (
            <Modal
                show={props.isShow}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <div>
                        <Modal.Title>Thông báo</Modal.Title>
                        <div className={s.NotificationModal_from}>
                            <span>Từ: </span>
                            <span className={s.NotificationModal_faculty}>{props.noti.faculty}</span>
                        </div>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <h5 className={s.NotificationModal_title}>{props.noti.title}</h5>
                    
                    <div>{props.noti.content}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.handleClose} type="button" variant="success">
                        Đã đọc rõ
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default NotificationModal;