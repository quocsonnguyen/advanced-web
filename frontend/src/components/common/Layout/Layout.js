import React from 'react';
import SideNavigation from '../SideNavigation/SideNavigation';
import MainPage from '../MainPage/MainPage'
import Register from '../RegisterPage/register'
import ProfilePage from '../Content/UserProfile'
import { Row, Col } from 'react-bootstrap'
import s from './Layout.module.css'
import authService from '../../../services/auth.service';


const USER = {
    id: "U001",
    name: "Viet Trung",
    avatarImgUrl: "https://media.karousell.com/media/photos/products/2018/08/18/ice_bear_we_bare_bears_stuff_toy_1534571614_1b8bf38b_progressive.jpg"
}



const Layout = (props) => {
    let Logged_User = authService.getCurrentUser()
    console.log(Logged_User)
    return (
        <div className={s.Layout}>
            
            <Row>
                <Col xs={3}>
                    <SideNavigation user={USER} />
                </Col>

                <Col xs={9}>
                    <ProfilePage user={USER} />
                </Col>
            </Row>
        </div>
    );
};

export default Layout;