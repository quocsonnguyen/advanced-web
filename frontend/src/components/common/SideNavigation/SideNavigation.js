import React, { useState } from 'react';
import s from './SideNavigation.module.css'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import UploadPostModal from './components/UploadPostModal/UploadPostModal';
import ModalSuccess from './components/ModalSuccess/ModalSuccess'

const SideNavigation = (props) => {
    const [isShowModal, setShowModal] = useState(false)
    const [isShowModalSuccess, setShowModalSuccess] = useState(false)
    // const [isShowModalFail, setShowModalFail] = useState(false)

    const showUserOptions = () => {
        console.log("Dang xuat");
    }

    const showUploadPostModal = () => {
        setShowModal(true)
    }

    const closeUploadPostModal = () => {
        setShowModal(false)
    }

    const showModalSuccess = () => {
        setShowModalSuccess(true)
    }

    const closeModalSuccess = () => {
        setShowModalSuccess(false)
    }

    return (
        <div className={s.SideNavigation}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Student
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/">
                            <CDBSidebarMenuItem icon="columns">Bảng tin</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter className={s.SideNavigation_footer}>
                    <img onMouseOver={showUserOptions} className={s.SideNavigation_avatar}
                        src={props.user.avatarImgUrl} alt="avatar" />

                    <div><b>{props.user.name}</b></div>

                    <div 
                        className={s.SideNavigation_upload_post_btn}
                        onClick={showUploadPostModal}
                    >
                        <b>Đăng bài</b>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
            
            <UploadPostModal 
                handleClose={closeUploadPostModal} isShow={isShowModal} 
                handleSuccess={showModalSuccess}
            /> 

            <ModalSuccess 
                handleClose={closeModalSuccess} isShow={isShowModalSuccess}
            />
        </div>
    )
};

export default SideNavigation;