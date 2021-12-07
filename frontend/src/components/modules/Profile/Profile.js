import React, { useState } from 'react';
import s from './Profile.module.css'
import { Layout } from '../../common'
import { Button } from 'react-bootstrap'
import ModalEditInfo from './components/ModalEditInfo/ModalEditInfo';
import ModalChangePassword from './components/ModalChangePassword/ModalChangePassword';
import ModalSuccess from './components/ModalSuccess/ModalSuccess'
import ModalFail from './components/ModalFail/ModalFail'

function Profile(props) {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [showEditInfo, setShowEditInfo] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showFail, setShowFail] = useState(false)

    function showModalEditInfo() {
        setShowEditInfo(true)
    }

    function closeModalEditInfo() {
        setShowEditInfo(false)
    }

    function showModalChangePassword() {
        setShowChangePassword(true)
    }

    function closeModalChangePassword() {
        setShowChangePassword(false)
    }

    function showModalSuccess() {
        setShowSuccess(true)
    }

    function showModalFail() {
        setShowFail(true)
    }

    function closeModalFail() {
        setShowFail(false)
    }
    
    return (
        <>
            <Layout>
                <div className={s.Profile}>
                    <img 
                        className={s.Profile_avatar} alt="avatar"
                        src={`http://localhost:3300/api/image/${currentUser.image}`} />
                
                    <div className={s.Profile_name}>
                        {currentUser.name}
                    </div>

                    <div className={s.Profile_role}>
                        {
                            currentUser.role === 'student' ? 'Sinh viên' : 
                            currentUser.role === 'faculty' ? 'Phòng / Khoa' : 'Quản trị viên'
                        }
                    </div>

                    <div className={s.Profile_buttons}>
                        <Button onClick={showModalEditInfo} variant="secondary" type="button">
                            Chỉnh sửa thông tin
                        </Button>
                        {
                            currentUser.role === 'faculty' &&
                            <Button onClick={showModalChangePassword} variant="warning" type="button">
                                Đổi mật khẩu
                            </Button>
                        }
                    </div>

                        
                </div>
            </Layout>

            <ModalEditInfo 
                isShow={showEditInfo} name={currentUser.name}
                handleClose={closeModalEditInfo} handleSuccess={showModalSuccess} />

            <ModalChangePassword 
                isShow={showChangePassword} handleClose={closeModalChangePassword}
                handleSuccess={showModalSuccess} handleFail={showModalFail} />

            <ModalSuccess isShow={showSuccess} />

            <ModalFail isShow={showFail} handleClose={closeModalFail} />
        </>
    );
}

export default Profile;