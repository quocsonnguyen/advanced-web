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
import { Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import UploadPostModal from './components/UploadPostModal/UploadPostModal';
import ModalSuccess from './components/ModalSuccess/ModalSuccess'
import { useNavigate } from 'react-router-dom';


const SideNavigation = (props) => {
    let currentUser = JSON.parse(localStorage.getItem('user'))
    const [isShowModal, setShowModal] = useState(false)
    const [isShowModalSuccess, setShowModalSuccess] = useState(false)
    // const [isShowModalFail, setShowModalFail] = useState(false)
    const navigate = useNavigate()

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

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('uid')
        navigate('/login')
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
                    <Dropdown>
                        <Dropdown.Toggle variant="link" bsPrefix="p-0" className={s.SideNavigation_avatar}>
                            <img 
                                className={s.SideNavigation_avatar_img}
                                src={`http://localhost:3300/api/image/${currentUser.image}`} alt="avatar" 
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={s.SideNavigation_toggle_menu}>
                            <Dropdown.Item>
                                Thông tin
                            </Dropdown.Item>
                            <Dropdown.Item onClick={logout}>
                                Đăng xuất
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div><b>{currentUser.name}</b></div>

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