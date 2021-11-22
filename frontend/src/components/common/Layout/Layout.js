import React, { useEffect } from 'react';
// import { useNavigate  } from "react-router-dom";
import SideNavigation from '../SideNavigation/SideNavigation';
import MainPage from '../MainPage/MainPage'
import s from './Layout.module.css'

const USER = {
    id: "U001",
    name: "Viet Trung",
    avatarImgUrl: "https://media.karousell.com/media/photos/products/2018/08/18/ice_bear_we_bare_bears_stuff_toy_1534571614_1b8bf38b_progressive.jpg"
}

const Layout = (props) => {
    // const navigate = useNavigate();

    const requireAuth = () => {
        // if(!localStorage.getItem('token')) {
        //     navigate('/login')
        // }
        // stay on this route since the user is authenticated
    }

    useEffect(() => {
        requireAuth()
    })

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