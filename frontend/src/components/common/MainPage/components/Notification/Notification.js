import React from 'react';
import s from './Notification.module.css'
import NotiItem from '../NotiItem/NotiItem'

const NOTIFICATIONS = [
    {id: "1", faculty:"Khoa công nghệ thông tin", time:"27/10/2021 14:30", title:"Thông báo", desc:"Thông báo đến toàn thể sinh viên"},
    {id: "2", faculty:"Khoa điện", time:"27/10/2021 14:30", title:"Thông báo", desc:"Thông báo đến toàn thể sinh viên"}
]

function Notification(props) {
    return (
        <div className={s.Notification}>
            <div className={s.Notification_title}>
                <b>THÔNG BÁO</b>
            </div>

            <div className={s.Notification_list}>
                {NOTIFICATIONS.map((noti) => {
                    return (
                        <NotiItem 
                            key={noti.id+noti.faculty+noti.time} faculty={noti.faculty}
                            time={noti.time} title={noti.title} desc={noti.desc} 
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default Notification;