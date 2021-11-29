import React, { useEffect } from 'react';
import s from './Layout.module.css'
import { useNavigate  } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
// import Register from '../RegisterPage/register'
// import ProfilePage from '../Content/UserProfile'

// import authService from '../../../services/auth.service';

const Layout = (props) => {
    const navigate = useNavigate();

    const requireAuth = () => {
        if(!localStorage.getItem('user')) {
            navigate('/login')
        }
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
        </>
    );
};

export default Layout;