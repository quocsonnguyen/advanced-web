import React from 'react';
import s from './NotiItem.module.css'

function NotiItem(props) {
    return (
        <div className={s.NotiItem}>
            <div className={s.NotiItem_noti_id}>{props.id}</div>
            
            <div className={s.NotiItem_faculty_and_time}>
                <div className={s.NotiItem_faculty}>{props.faculty}</div>
                <div className={s.NotiItem_time}>{props.time}</div>
            </div>

            <div className={s.NotiItem_title}>
                <b>{props.title}</b>
            </div>

            <div className={s.NotiItem_description}>
                {props.desc}
            </div>
        </div>
    );
}

export default NotiItem;