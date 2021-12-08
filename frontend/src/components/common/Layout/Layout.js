import React, { useState, useEffect } from 'react';
import s from './Layout.module.css'
import { useNavigate } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import { Alert } from 'react-bootstrap';
import { socket } from '../../../App';

const Layout = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [alertFaculty, setAlertFaculty] = useState(false);

    socket.on('notice', (faculty) => {
        setAlertFaculty(faculty)
        setShow(true)
    })

    const requireAuth = () => {
        if(!localStorage.getItem('user')) {
            navigate('/login')
        }
    }

    const onAlertClick = () => {
        navigate('/notifications')
        setShow(false)
    }

    useEffect(() => {
        requireAuth()
    })

    return (
        <>
            <Navigation />
            <div className={s.Layout}>
                {props.children}
            </div>

            {
                show &&
                <div onClick={onAlertClick} className={s.Layout_popup}>
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        <b>{alertFaculty}</b> vừa đăng một thông báo mới!
                    </Alert>
                </div>
            }
        </>
    );
};

export default Layout;