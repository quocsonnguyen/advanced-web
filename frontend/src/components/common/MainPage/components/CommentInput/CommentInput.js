import React from 'react';
import s from './CommentInput.module.css'

function CommentInput(props) {
    return (
        <div className={s.CommentInput}>
            <img className={s.CommentInput_avatar}
                src={props.user.avatarImgUrl} alt="avatar" />

            <input className={s.CommentInput_status} placeholder="Viết bình luận ..." />
        </div>
    );
}

export default CommentInput;