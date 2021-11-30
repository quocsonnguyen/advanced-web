import React, {useState, useEffect} from 'react';
import s from './Notification.module.css'
import NotiItem from './components/NotiItem/NotiItem'
import { Layout } from '../'
import { Pagination } from 'react-bootstrap'

function Notification(props) {
    const [notifications, setNotifications] = useState([])
    const [listPages, setlistPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const toPage = (pageNum) => {
        setCurrentPage(pageNum)
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
    }, [currentPage])

    return (
        <Layout>
            <div className={s.Notification}>
                <div className={s.separator}>
                    <h5>THÔNG BÁO</h5>
                </div>

                

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
    );
}

export default Notification;