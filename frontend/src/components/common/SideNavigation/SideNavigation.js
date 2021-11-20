import React, { useState } from 'react';
import s from './SideNavigation.module.css'
import { BiHome } from 'react-icons/bi'
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
            <div className={s.SideNavigation_title}>Student Social Media</div>
            
            <div className={s.SideNavigation_menu}>
                <div className={s.SideNavigation_menu_item}>
                    <BiHome /> <span>Trang chủ</span>
                </div>
            </div>

            <div className={s.SideNavigation_footer}>
                <img onMouseOver={showUserOptions} className={s.SideNavigation_avatar}
                src={props.user.avatarImgUrl} alt="avatar" />

                <div>{props.user.name}</div>

                <div 
                    className={s.SideNavigation_upload_post_btn}
                    onClick={showUploadPostModal}
                >
                    Đăng bài
                </div>
            </div>

            {
                isShowModal && 
                <UploadPostModal 
                    handleClose={closeUploadPostModal} isShow={isShowModal} 
                    handleSuccess={showModalSuccess}
                /> 
            }

            {
                isShowModalSuccess && 
                <ModalSuccess 
                    handleClose={closeModalSuccess} isShow={isShowModalSuccess}
                /> 
            }
        </div>
    )
};

export default SideNavigation;