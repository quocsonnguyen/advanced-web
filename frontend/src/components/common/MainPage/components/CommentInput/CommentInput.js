import React from 'react';
import s from './CommentInput.module.css'

function CommentInput(props) {
    let currentUser = JSON.parse(localStorage.getItem('user'))

    const upload = (e) => {
        if (e.key === 'Enter') {
            props.uploadComment()
            e.target.value = ''
        }
    }

    return (
        <div className={s.CommentInput}>
            <a href={`/wall/u/${currentUser.id}`}>
                <img className={s.CommentInput_avatar}
                    src={`http://localhost:3300/api/image/${currentUser.image}`} alt="avatar" />
            </a>

            <input className={s.CommentInput_status} placeholder="Viết bình luận ..."
            value={props.comment} onChange={e => props.onChange(e.target.value)}
            onKeyPress={e => upload(e)} />
        </div>
    );
}

export default CommentInput;