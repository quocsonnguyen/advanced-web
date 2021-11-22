import React from 'react';
import s from './CommentItem.module.css'
import { BsThreeDots } from 'react-icons/bs'

function CommentItem(props) {
    return (
        <div className={s.CommentItem}>
            {/* <img className={s.CommentItem_avatar}
            src={props.imgUrl} alt="avatar" /> */}
            <img className={s.CommentItem_avatar}
            src="https://img.hoidap247.com/picture/question/20200827/large_1598505339566.jpg" alt="avatar" />

            <div className={s.CommentItem_comment_content}>
                {/* <b>{props.name}</b> */}
                <b>Cheems</b>
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