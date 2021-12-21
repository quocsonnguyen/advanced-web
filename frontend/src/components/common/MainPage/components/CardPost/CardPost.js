import React, {useEffect, useState} from 'react';
import s from './CardPost.module.css'
import YoutubeEmbed from '../../../YoutubeEmbed/YoutubeEmbed'
import CommentItem from '../CommentItem/CommentItem';
import CommentInput from '../CommentInput/CommentInput';
import EditPostModal from '../EditPostModal/EditPostModal';
import DeletePostModal from '../DeletePostModal/DeletePostModal'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from 'react-icons/bs'
import { FcLike } from 'react-icons/fc'
import { FaRegComment } from 'react-icons/fa'
import { socket } from '../../../../../App';

function CardPost(props) {
    const [postID] = useState(props.postInfo._id)
    const [showOptions] = useState(
        props.postInfo.creatorID === localStorage.getItem('uid') ||
        JSON.parse(localStorage.getItem('user')).role === 'admin'
    )
    const [commentContent, setCommentContent] = useState("")
    const [showComment, setShowComment] = useState(false);
    const [content, setContent] = useState()
    const [totalLike, setTotalLike] = useState()
    const [totalComment, setTotalComment] = useState()
    const [comments, setComments] = useState()
    const [reLoadPost, setReLoadPost] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    socket.on('reRenderPost', (pid) => {
        if (postID === pid) {
            setReLoadPost(!reLoadPost)
        }
    })

    useEffect(() => {
        // call API to render via props
        fetch(`/api/post/${postID}`)
            .then(res => res.json())
            .then(
                result => {
                    setContent(result.content)
                    setTotalLike(result.totalLike)
                    setTotalComment(result.totalComment)
                    setComments(result.comments)
                },
                error => {
                    console.log(error);
                }
            )
    }, [reLoadPost, postID])

    const renderCommentSection = () => {
        setShowComment(!showComment)
    }

    const uploadComment = () => {
        let uid = localStorage.getItem('uid')
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                commenterID : uid,
                content : commentContent,
            })
        };
        fetch(`/api/post/${postID}/comment`, request)
        setCommentContent('')
        socket.emit('editPost', postID)
    }

    const like = () => {
        fetch(`/api/post/${postID}/like`, { method: 'POST' })
        socket.emit('editPost', postID)
    }

    // const unLike = () => {
    //     fetch(`/api/post/${postID}/unlike`, { method: 'POST' })
    // }

    const showModalEditPost = () => {
        setShowModalEdit(true)
    }

    const closeModalEditPost = () => {
        setShowModalEdit(false)
    }

    const showModalDeletePost = () => {
        setShowModalDelete(true)
    }

    const closeModalDeletePost = () => {
        setShowModalDelete(false)
    }

    return (
        <div className={s.CardPost}>
            <div className={s.CardPost_post_info}>
                <div className={s.CardPost_avatar_name_date}>
                    <a href={`/wall/u/${props.postInfo.creatorID}`}>
                        <img className={s.CardPost_avatar}
                        src={`http://localhost:3300/api/image/${props.postInfo.creatorImage}`} alt="avatar" />
                    </a>
                    <div className={s.CardPost_name_and_date}>
                        <div><b>{props.postInfo.creatorName}</b></div>
                        <div className={s.CardPost_date}>{props.postInfo.createdTime}</div>
                    </div>
                </div>

                {
                    showOptions && 
                    <Dropdown >
                        <Dropdown.Toggle variant="success" bsPrefix="p-0" className={s.CardPost_toggle_btn}>
                            <BsThreeDots />
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" className={s.CardPost_toggle_menu}>
                            <Dropdown.Item onClick={showModalEditPost}>
                                Sửa bài viết
                            </Dropdown.Item>

                            <Dropdown.Item onClick={showModalDeletePost}>
                                Xoá bài viết
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }

                <EditPostModal
                    handleClose={closeModalEditPost} isShow={showModalEdit}
                    postInfo={props.postInfo}
                />

                <DeletePostModal
                    handleClose={closeModalDeletePost} isShow={showModalDelete}
                    postID={props.postInfo._id}
                />

            </div>

            <div className={s.CardPost_content}>
                {content}
            </div>

            
            {props.postInfo.image && 
                <div className={s.CardPost_image}>
                    <img className={s.CardPost_image}
                    src={`http://localhost:3300/api/image/${props.postInfo.image}`} alt="post's img" />
                </div>
            }

            {
                props.postInfo.videoURL && 
                <YoutubeEmbed embedId={props.postInfo.videoURL.slice(props.postInfo.videoURL.length - 11)} />
            }
            

            <div className={s.CardPost_like_and_comment}>
                <div className={s.CardPost_total_like_comment}>
                    <div><FcLike /> {totalLike}</div>
                    <div>{totalComment} Bình luận</div>
                </div>

                <div className={s.CardPost_like_comment_button}>
                    <div onClick={like} className={s.CardPost_like_button}>
                        <FcLike /> Thích
                    </div>
                    <div onClick={renderCommentSection} className={s.CardPost_comment_button}>
                        <FaRegComment /> Bình luận
                    </div>
                </div>

                {showComment &&
                    <div className={s.CardPost_comment_section}>
                        {comments.map((cmt) => {
                            return (
                                <CommentItem 
                                    key={cmt._id} uid={cmt.commenterID} postID={postID} commentID={cmt._id}
                                    name={cmt.commenterName} createdTime={cmt.createdTime}
                                    content={cmt.content} image={cmt.commenterImage} />
                            )
                        })}
                        <CommentInput
                            commentContent={commentContent} onChange={setCommentContent} 
                            uploadComment={uploadComment} 
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default CardPost;