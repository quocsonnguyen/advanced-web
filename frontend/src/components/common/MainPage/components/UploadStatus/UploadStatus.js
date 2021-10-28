import React, { useRef, useState } from 'react';
import s from './UploadStatus.module.css'
import { BsFillImageFill } from 'react-icons/bs';
import { RiVideoFill } from 'react-icons/ri'

function UploadStatus(props) {
    const textareaRef = useRef(null);
    const [statusContent, setStatusContent ] = useState("");// you can manage data with it
    const [showUploadStatusBtn, setShowUploadStatusBtn] = useState(false)

    // useEffect(() => {
    //     textareaRef.current.style.height = "40px";
    //     const scrollHeight = textareaRef.current.scrollHeight;
    //     textareaRef.current.style.height = scrollHeight + "px";
    // }, [statusContent]);

    const onStatusClick = () => {
        setShowUploadStatusBtn(true)
    }

    // const onStatusClickOut = () => {
    //     setShowUploadStatusBtn(false)
    // }

    const uploadStatus = () => {
        console.log("oke");
    }

    return (
        <div className={s.UploadStatus}>
            <div className={s.UploadStatus_avatar_status}>
                <img className={s.UploadStatus_avatar}
                src={props.user.avatarImgUrl} alt="avatar" />

                {/* <textarea
                    className={s.UploadStatus_status}
                    ref={textareaRef}
                    value={statusContent}
                    onChange={e => {
                        setStatusContent(e.target.value)
                    }}
                /> */}

                <input className={s.UploadStatus_status}
                    ref={textareaRef}
                    value={statusContent}
                    onChange={e => {
                        setStatusContent(e.target.value)
                    }}
                    onFocus={onStatusClick}
                    // onBlur={onStatusClickOut}
                    type="text"
                    placeholder="Bạn muốn chia sẻ điều gì ?" 
                />

                
            </div>

            {showUploadStatusBtn &&
                <div onClick={uploadStatus} className={s.UploadStatus_upload_btn}>Upload</div>
            }

            <hr/>
            <div className={s.UploadStatus_photo_and_video}>
                <div className={s.UploadStatus_photo}>
                    <BsFillImageFill /> Photo
                </div>
                <div className={s.UploadStatus_video}>
                    <RiVideoFill /> Video
                </div>
            </div>

        </div>
    );
}

export default UploadStatus;