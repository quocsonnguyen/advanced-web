import React, {useState, useEffect} from 'react';
import s from './Notification.module.css'
import NotiItem from './components/NotiItem/NotiItem'
import { Layout } from '../'

function Notification(props) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch("/api/notification")
            .then(res => res.json())
            .then(result => setNotifications(result))
    }, [])

    return (
        <Layout>
            <div className={s.Notification}>
                {/* <div className={s.Notification_title}>
                    <b>THÔNG BÁO</b>
                </div> */}

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
            </div>
        </Layout>
    );
}

export default Notification;