import React, {useState, useEffect} from 'react';
import s from './Notification.module.css'
import NotiItem from './components/NotiItem/NotiItem'
import UploadNotiModal from './components/UploadNotiModal/UploadNotiModal';
import { Layout } from '../'
import { Pagination } from 'react-bootstrap'
import { socket } from '../../../App';

function Notification(props) {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [notifications, setNotifications] = useState([])
    const [listPages, setlistPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [showUploadNoti, setShowUploadNoti] = useState(false)
    const [reload, setReLoad] = useState(false)

    socket.on('reRenderNoti', () => {
        setReLoad(!reload)
    })

    const toPage = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const showUploadNotiModal = () => {
        setShowUploadNoti(true)
    }

    const closeUploadNotiModal = () => {
        setShowUploadNoti(false)
    }

    const prev = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const next = () => {
        if (currentPage !== listPages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        fetch(`/api/notification/page/${currentPage}`)
            .then(res => res.json())
            .then(result => {
                const listPages = [];
                for (let i = 1; i <= result.data.numPages; i++) {
                    listPages.push(i);
                }
                setlistPages(listPages)
                setNotifications(result.data.notis)
            })
    }, [currentPage, reload])

    return (
        <>
            {
                showUploadNoti && 
                <UploadNotiModal isShow={showUploadNoti} handleClose={closeUploadNotiModal} />
            }
            <Layout>
                <div className={s.Notification}>
                    <div className={s.separator}>
                        <h5>THÔNG BÁO</h5>
                    </div>

                    {
                        currentUser.role === 'faculty' &&
                        <div 
                            className={s.Notification_upload_noti}
                            onClick={showUploadNotiModal} >
                            <b>Đăng thông báo</b>
                        </div>
                    }

                    <div className={s.Notification_list}>
                        {notifications.map((noti) => {
                            return (
                                <NotiItem key={noti._id} noti={noti} />
                            )
                        })}
                    </div>

                    <Pagination className={s.Notification_pagination}>
                        <Pagination.Prev onClick={prev} />
                        {listPages.map(i => {
                            if (i === currentPage) {
                                return (
                                    <Pagination.Item 
                                        key={i} active
                                    >
                                        {i}
                                    </Pagination.Item>
                                )
                            } else {
                                return (
                                    <Pagination.Item 
                                        key={i} onClick={() => toPage(i)}
                                    >
                                        {i}
                                    </Pagination.Item>
                                )
                            }
                        })}
                        <Pagination.Next onClick={next} />
                    </Pagination>
                </div>
            </Layout>
        </>
    );
}

export default Notification;