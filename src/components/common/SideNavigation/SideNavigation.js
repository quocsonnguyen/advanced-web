import React from 'react';
import s from './SideNavigation.module.css'
import { BiHome } from 'react-icons/bi'

const SideNavigation = (props) => {
    return (
        <div className={s.SideNavigation}>
            <div className={s.SideNavigation_title}>Student Social Media</div>
            
            <div className={s.SideNavigation_menu}>
                <div className={s.SideNavigation_menu_item}>
                    <BiHome /> <span>Trang chủ</span>
                </div>
                <div className={s.SideNavigation_menu_item}>
                    Trang chủ
                </div>
                <div className={s.SideNavigation_menu_item}>
                    Trang chủ
                </div>
            </div>

            <div className={s.SideNavigation_footer}>
                <img className={s.SideNavigation_avatar}
                src={props.user.avatarImgUrl} alt="avatar" />

                <div>{props.user.name}</div>
            </div>
        </div>
    )
};

export default SideNavigation;