import React, { useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import SideNavigation from '../SideNavigation/SideNavigation';
import MainPage from '../MainPage/MainPage'
import Register from '../RegisterPage/register'
import ProfilePage from '../Content/UserProfile'
import s from './Layout.module.css'
import authService from '../../../services/auth.service';


const USER = {
    id: "U001",
    name: "Viet Trung",
    avatarImgUrl: "https://media.karousell.com/media/photos/products/2018/08/18/ice_bear_we_bare_bears_stuff_toy_1534571614_1b8bf38b_progressive.jpg"
}

const Layout = (props) => {
    const navigate = useNavigate();

    const requireAuth = () => {
        if(!localStorage.getItem('user')) {
            navigate('/login')
        }
    }

    useEffect(() => {
        requireAuth()
        // let user = JSON.parse(localStorage.getItem('user'))
    }, [])

    return (
        <div className={s.Layout}>
            <div>
                <SideNavigation user={USER} />
            </div>
            <div className={s.Layout_MainPage}>
                <MainPage user={USER} />
            </div>
        </div>
    );
};

export default Layout;