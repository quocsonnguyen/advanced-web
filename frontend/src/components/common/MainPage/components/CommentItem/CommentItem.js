import React, { useState } from 'react';
import s from './CommentItem.module.css'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown } from 'react-bootstrap'
import DeleteCommentModal from '../DeleteCommentModal/DeleteCommentModal';

function CommentItem(props) {
    const [showOptions] = useState(
        props.uid === localStorage.getItem('uid') ||
        JSON.parse(localStorage.getItem('user')).role === 'admin'
    )
    const [show, setShow] = useState(false)

    const showModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    return (
        <div className={s.CommentItem}>
            <a href={`/wall/u/${props.uid}`}>
                <img className={s.CommentItem_avatar}
                src={`http://localhost:3300/api/image/${props.image}`} alt="avatar" />
            </a>
            <div className={s.CommentItem_comment_content}>
                <b>{props.name}</b>
                <div className={s.CommentItem_comment_text}>{props.content}</div>
            </div>

            <div>
                <div className={s.CommentItem_more_option}>
                {
                    showOptions && 
                    <Dropdown >
                        <Dropdown.Toggle variant="success" bsPrefix="p-0" className={s.CommentItem_toggle_btn}>
                            <BsThreeDots />
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" className={s.CommentItem_toggle_menu}>
                            <Dropdown.Item onClick={showModal}>
                                Xoá bình luận
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
                </div>
                <div className={s.CommentItem_commented_time}>
                    {props.createdTime}
                </div>
            </div>
            
            <DeleteCommentModal isShow={show} handleClose={closeModal}
                postID={props.postID} commentID={props.commentID} />
        </div>
    );
}

export default CommentItem;