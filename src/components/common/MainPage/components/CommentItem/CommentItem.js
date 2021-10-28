import React from 'react';
import s from './CommentItem.module.css'
import { BsThreeDots } from 'react-icons/bs'

function CommentItem(props) {
    return (
        <div className={s.CommentItem}>
            <img className={s.CommentItem_avatar}
            src={props.imgUrl} alt="avatar" />

            <div className={s.CommentItem_comment_content}>
                <b>{props.name}</b>
                <div>{props.content}</div>
            </div>

            <div className={s.CommentItem_more_option}>
                <BsThreeDots />
            </div>
        </div>
    );
}

export default CommentItem;