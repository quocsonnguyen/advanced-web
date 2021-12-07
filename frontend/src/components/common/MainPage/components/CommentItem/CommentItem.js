import React from 'react';
import s from './CommentItem.module.css'
import { BsThreeDots } from 'react-icons/bs'

function CommentItem(props) {
    return (
        <div className={s.CommentItem}>
            <a href={`/wall/u/${props.uid}`}>
                <img className={s.CommentItem_avatar}
                src={`http://localhost:3300/api/image/${props.image}`} alt="avatar" />
            </a>
            <div className={s.CommentItem_comment_content}>
                <b>{props.name}</b>
                <div>{props.content}</div>
            </div>

            <div>
                <div className={s.CommentItem_more_option}>
                    <BsThreeDots />
                </div>
                <div className={s.CommentItem_commented_time}>
                    {props.createdTime}
                </div>
            </div>
            
        </div>
    );
}

export default CommentItem;