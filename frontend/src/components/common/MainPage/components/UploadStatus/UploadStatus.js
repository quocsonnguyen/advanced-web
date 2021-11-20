import React, { useRef, useState } from 'react';
import s from './UploadStatus.module.css'
import { BsFillImageFill } from 'react-icons/bs';
import { RiVideoFill } from 'react-icons/ri'

function UploadStatus(props) {
    const textareaRef = useRef(null);
    const [statusContent, setStatusContent ] = useState("");// you can manage data with it
    const [videoURL, setVideoURL] = useState("")
    const [showUploadStatusBtn, setShowUploadStatusBtn] = useState(false)
    const [showUploadPhoto, setShowUploadPhoto] = useState(false)
    const [showUploadVideo, setShowUploadVideo] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    // useEffect(() => {
    //     textareaRef.current.style.height = "40px";
    //     const scrollHeight = textareaRef.current.scrollHeight;
    //     textareaRef.current.style.height = scrollHeight + "px";
    // }, [statusContent]);

    const onStatusClick = () => {
        setShowUploadStatusBtn(true)
    }

    const uploadStatus = () => {
        let uid = localStorage.getItem('uid')
        const formData  = new FormData();
        formData.append('creatorID', uid);
        formData.append('postFile', selectedImage);
        formData.append('videoURL', videoURL);
        
        const request = {
            headers: {'Content-Type' : 'multipart/form-data'},
            method: 'POST',
            body: formData
        };
        fetch('/api/post', request)
    }

    const showUploadPhotoSection = () => {
        setShowUploadPhoto(true)
        setShowUploadVideo(false)
    }

    const showUploadVideoSection = () => {
        setShowUploadPhoto(false)
        setShowUploadVideo(true)
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
                    type="text"
                    placeholder="Bạn muốn chia sẻ điều gì ?" 
                />

                
            </div>

            <hr/>
            <div className={s.UploadStatus_photo_and_video}>
                <div onClick={showUploadPhotoSection} className={s.UploadStatus_photo}>
                    <BsFillImageFill /> Photo
                </div>
                <div onClick={showUploadVideoSection} className={s.UploadStatus_video}>
                    <RiVideoFill /> Video
                </div>
            </div>
            
            {showUploadPhoto &&
                <input className={s.UploadStatus_photo_input} name="image" type="file"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}
                />
            }

            {/* {selectedImage && (
                <div>
                <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                <br />
                <button onClick={()=>setSelectedImage(null)}>Remove</button>
                </div>
            )} */}

            {showUploadVideo &&
                <input className={s.UploadStatus_youtubeLink_input}
                type="text" placeholder="Link youtube video"
                value={videoURL} onChange={e => setVideoURL(e.target.value)} />
            }

            {showUploadStatusBtn &&
                <div onClick={uploadStatus} className={s.UploadStatus_upload_btn}>Upload</div>
            }
        </div>
    );
}

export default UploadStatus;