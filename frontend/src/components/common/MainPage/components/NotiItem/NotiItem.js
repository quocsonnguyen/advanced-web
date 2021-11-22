import React, { useState } from 'react';
import s from './NotiItem.module.css'
import NotificationModal from '../NotificationModal/NotificationModal';

function NotiItem(props) {
    const [isModalShow, setModalShow] = useState(false)

    const showModal = () => {
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }

    return (
        <>
            <div onClick={showModal} className={s.NotiItem}>
                <div className={s.NotiItem_noti_id}>{props.noti._id}</div>
                
                <div className={s.NotiItem_faculty_and_time}>
                    <div className={s.NotiItem_faculty}>{props.noti.faculty}</div>
                    <div className={s.NotiItem_time}>{props.noti.createdTime}</div>
                </div>

                <div className={s.NotiItem_title}>
                    <b>{props.noti.title}</b>
                </div>

                <div className={s.NotiItem_description}>
                    {props.noti.description}
                </div>
            </div>

            <NotificationModal isShow={isModalShow} handleClose={closeModal} noti={props.noti} />
        </>
    );
}

export default NotiItem;