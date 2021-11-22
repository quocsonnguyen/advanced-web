import React from 'react';
import s from './CommentInput.module.css'

function CommentInput(props) {

    const upload = (e) => {
        if (e.key === 'Enter') {
            props.uploadComment()
            e.target.value = ''
        }
    }

    return (
        <div className={s.CommentInput}>
            <img className={s.CommentInput_avatar}
                src={props.user.avatarImgUrl} alt="avatar" />

            <input className={s.CommentInput_status} placeholder="Viết bình luận ..."
            value={props.comment} onChange={e => props.onChange(e.target.value)}
            onKeyPress={e => upload(e)} />
        </div>
    );
}

export default CommentInput;