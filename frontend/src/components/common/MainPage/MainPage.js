import React, {useState, useEffect} from 'react';
import s from './MainPage.module.css'
import { Layout } from '../'
import CardPost from './components/CardPost/CardPost'
import UploadPostModal from './components/UploadPostModal/UploadPostModal';
import ModalSuccess from './components/ModalSuccess/ModalSuccess'
import {socket} from '../../../App'

function MainPage(props) {
    const [posts, setPosts] = useState([])
    const [reload, setReLoad] = useState(false)
    const [numPosts, setNumPosts] = useState(10)
    const [totalPosts, setTotalPosts] = useState(0)
    const [isShowModal, setShowModal] = useState(false)
    const [isShowModalSuccess, setShowModalSuccess] = useState(false)

    socket.on('reRenderFeed', () => {
        setReLoad(!reload)
    })

    const loadMorePosts = () => setNumPosts(numPosts + 10)

    const showUploadPostModal = () => {
        setShowModal(true)
    }

    const closeUploadPostModal = () => {
        setShowModal(false)
    }

    const showModalSuccess = () => {
        setShowModalSuccess(true)
    }

    const closeModalSuccess = () => {
        setShowModalSuccess(false)
    }

    useEffect(() => {
        fetch(`/api/post/num-posts/${numPosts}`)
            .then(res => res.json())
            .then(result => {
                setTotalPosts(result.data.totalPosts)
                setPosts(result.data.posts)
            })
    }, [reload, numPosts])

    return (
        <Layout>
            <div className={s.MainPage}>
                <div 
                    className={s.MainPage_upload_post_btn}
                    onClick={showUploadPostModal}
                >
                    <b>Đăng bài</b>
                </div>

                <hr/>

                {posts.map((post, i) => {
                    if (i === 0) {
                        return (
                            <CardPost key={post._id} postInfo={post} />
                        )
                    } else {
                        return (
                            <div key={post._id}>
                                <hr />
                                <CardPost postInfo={post} />
                            </div>
                        )
                    }
                })}

                {
                    numPosts < totalPosts &&
                    <div onClick={loadMorePosts} className={s.separator}>
                        <h5>Xem thêm</h5>
                    </div>
                }

                <UploadPostModal 
                    handleClose={closeUploadPostModal} isShow={isShowModal} 
                    handleSuccess={showModalSuccess}
                /> 

                <ModalSuccess 
                    handleClose={closeModalSuccess} isShow={isShowModalSuccess}
                />
            </div>
        </Layout>
    );
}

export default MainPage;