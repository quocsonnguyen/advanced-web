import React, {useState, useEffect} from 'react';
import s from './Notification.module.css'
import NotiItem from '../NotiItem/NotiItem'

function Notification(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch("/api/notification")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setNotifications(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={s.Notification}>
                <div className={s.Notification_title}>
                    <b>THÔNG BÁO</b>
                </div>
    
                <div className={s.Notification_list}>
                    {notifications.map((noti) => {
                        return (
                            <NotiItem key={noti._id} noti={noti} />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Notification;