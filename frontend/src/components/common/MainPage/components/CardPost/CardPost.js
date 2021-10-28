import React, {useState} from 'react';
import s from './CardPost.module.css'
import CommentItem from '../CommentItem/CommentItem';
import CommentInput from '../CommentInput/CommentInput';
import { BsThreeDots } from 'react-icons/bs'
import { GoGlobe } from 'react-icons/go'
import { FcLike } from 'react-icons/fc'
import { FaRegComment } from 'react-icons/fa'

function CardPost(props) {
    const [showComment, setShowComment] = useState(false);

    const renderCommentSection = () => {
        setShowComment(!showComment)
    }

    return (
        <div className={s.CardPost}>
            <div className={s.CardPost_post_info}>
                <div className={s.CardPost_avatar_name_date}>
                    <img className={s.CardPost_avatar}
                    src={props.postInfo.avatarImgURL} alt="avatar" />

                    <div className={s.CardPost_name_and_date}>
                        <div><b>{props.postInfo.name}</b></div>
                        <div className={s.CardPost_date}>{props.postInfo.time} <GoGlobe /></div>
                    </div>
                </div>

                <div className={s.CardPost_more_option}>
                    <BsThreeDots />
                </div>
            </div>

            <div className={s.CardPost_content}>
                {props.postInfo.content}
            </div>

            
            {props.postInfo.postImgUrl && 
                <div className={s.CardPost_image}>
                    <img className={s.CardPost_image}
                    src={props.postInfo.postImgUrl} alt="post's img" />
                </div>
            }
            

            <div className={s.CardPost_like_and_comment}>
                <div className={s.CardPost_total_like_comment}>
                    <div><FcLike /> {props.postInfo.totalLike}</div>
                    <div>{props.postInfo.totalComment} Comments</div>
                </div>

                <div className={s.CardPost_like_comment_button}>
                    <div className={s.CardPost_like_button}>
                        <FcLike /> Like
                    </div>
                    <div onClick={renderCommentSection} className={s.CardPost_comment_button}>
                        <FaRegComment /> Comment
                    </div>
                </div>

                {showComment &&
                    <div className={s.CardPost_comment_section}>
                        {props.postInfo.comments.map((cmt) => {
                            return (
                                <CommentItem key={cmt.id} name={cmt.name} content={cmt.content} imgUrl={cmt.img_url} />
                            )
                        })}
                        <CommentInput user={props.user} />
                    </div>
                }
            </div>
        </div>
    );
}

export default CardPost;