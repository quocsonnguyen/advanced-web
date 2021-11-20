import React, {useEffect, useState} from 'react';
import s from './CardPost.module.css'
import YoutubeEmbed from '../../../YoutubeEmbed/YoutubeEmbed'
import CommentItem from '../CommentItem/CommentItem';
import CommentInput from '../CommentInput/CommentInput';
import { BsThreeDots } from 'react-icons/bs'
import { GoGlobe } from 'react-icons/go'
import { FcLike } from 'react-icons/fc'
import { FaRegComment } from 'react-icons/fa'
import io from 'socket.io-client';
const socket = io();

function CardPost(props) {
    const [postID] = useState(props.postInfo._id)
    const [commentContent, setCommentContent] = useState("")
    const [showComment, setShowComment] = useState(false);
    const [totalLike, setTotalLike] = useState(props.postInfo.totalLike)
    const [totalComment, setTotalComment] = useState(props.postInfo.totalComment)
    const [comments, setComments] = useState(props.postInfo.comments)
    const [reLoadPost, setReLoadPost] = useState(false)

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
                    setTotalLike(result.totalLike)
                    setTotalComment(result.totalComment)
                    setComments(result.comments)
                },
                error => {
                    console.log(error);
                }
            )
    }, [reLoadPost])

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

    return (
        <div className={s.CardPost}>
            <div className={s.CardPost_post_info}>
                <div className={s.CardPost_avatar_name_date}>
                    {/* <img className={s.CardPost_avatar}
                    src={props.postInfo.avatarImgURL} alt="avatar" /> */}
                    <img className={s.CardPost_avatar}
                    src="https://media.karousell.com/media/photos/products/2018/08/18/ice_bear_we_bare_bears_stuff_toy_1534571614_1b8bf38b_progressive.jpg" alt="avatar" />

                    <div className={s.CardPost_name_and_date}>
                        {/* <div><b>{props.postInfo.name}</b></div> */}
                        <div><b>Ngu</b></div>
                        <div className={s.CardPost_date}>{props.postInfo.createdTime} <GoGlobe /></div>
                    </div>
                </div>

                <div className={s.CardPost_more_option}>
                    <BsThreeDots />
                </div>
            </div>

            <div className={s.CardPost_content}>
                {props.postInfo.content}
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
                    <div>{totalComment} Comments</div>
                </div>

                <div className={s.CardPost_like_comment_button}>
                    <div onClick={like} className={s.CardPost_like_button}>
                        <FcLike /> Like
                    </div>
                    <div onClick={renderCommentSection} className={s.CardPost_comment_button}>
                        <FaRegComment /> Comment
                    </div>
                </div>

                {showComment &&
                    <div className={s.CardPost_comment_section}>
                        {comments.map((cmt) => {
                            return (
                                <CommentItem key={cmt.id} name={cmt.name} content={cmt.content} imgUrl={cmt.img_url} />
                            )
                        })}
                        <CommentInput user={props.user}
                        commentContent={commentContent} onChange={setCommentContent} uploadComment={uploadComment} />
                    </div>
                }
            </div>
        </div>
    );
}

export default CardPost;