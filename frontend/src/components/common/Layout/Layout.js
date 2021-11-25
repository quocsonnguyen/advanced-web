import React, { useEffect } from 'react';
import s from './Layout.module.css'
import { useNavigate  } from "react-router-dom";
import SideNavigation from '../SideNavigation/SideNavigation';
import MainPage from '../MainPage/MainPage'
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
        <div className={s.Layout}>
            <div>
                <SideNavigation />
            </div>
            <div className={s.Layout_MainPage}>
                <MainPage />
            </div>
        </div>
    );
};

export default Layout;