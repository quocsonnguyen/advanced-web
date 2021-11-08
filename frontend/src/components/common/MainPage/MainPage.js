import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap'
import s from './MainPage.module.css'
import UploadStatus from './components/UploadStatus/UploadStatus'
import CardPost from './components/CardPost/CardPost'
import Notification from './components/Notification/Notification'

// const POSTS = [
//     {
//         id: "P001",
//         name: "Quoc Son",
//         time: "26-10-2000 14:12",
//         avatarImgURL: "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-1/c0.0.240.240a/p240x240/231242613_546058539857263_5368986266516434149_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=7206a8&_nc_ohc=VFvErtkLLJQAX_FP0JD&_nc_ht=scontent.fsgn4-1.fna&oh=72e733331ba414c59c69f4a8274d24f5&oe=617E9159",
//         content: "Xin chao",
//         postImgUrl: "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/10/dien-gia-pham-thanh-long.jpg",
//         totalLike: 100,
//         totalComment: 20,
//         comments: [
//             {id: "1", name: "Kelly Thang Uc Viet", content: "may ngu may an dau buoi", img_url: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/9/2/4/2/924266474839f0b498d7f867a3447fe9.jpg"},
//             {id: "2", name: "Kelly Thang Uc Viet", content: "may ngu may an dau buoi", img_url: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/9/2/4/2/924266474839f0b498d7f867a3447fe9.jpg"}
//         ]
//     },
//     {
//         id: "P002",
//         name: "XuanSang",
//         time: "26-10-2000 14:12",
//         avatarImgURL: "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-1/c0.0.240.240a/p240x240/231242613_546058539857263_5368986266516434149_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=7206a8&_nc_ohc=VFvErtkLLJQAX_FP0JD&_nc_ht=scontent.fsgn4-1.fna&oh=72e733331ba414c59c69f4a8274d24f5&oe=617E9159",
//         content: "Xin chao",
//         postImgUrl: "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/10/dien-gia-pham-thanh-long.jpg",
//         totalLike: 100,
//         totalComment: 20,
//         comments: [
//             {id: "1", name: "Kelly Thang Uc Viet", content: "may ngu may an dau buoi", img_url: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/9/2/4/2/924266474839f0b498d7f867a3447fe9.jpg"},
//             {id: "2", name: "Kelly Thang Uc Viet", content: "may ngu may an dau buoi", img_url: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/9/2/4/2/924266474839f0b498d7f867a3447fe9.jpg"}
//         ]
//     }
// ]

function MainPage(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPosts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={s.MainPage}>
                <Row>
                    <Col xs={8}>
                        <div className={s.MainPage_social_media}>
                            <UploadStatus user={props.user} />
                            {posts.map((post) => {
                                return (
                                    <div key={post.id}>
                                        <hr />
                                        <CardPost user={props.user} postInfo={post} />
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
    
                    <Col xs={4}>
                        <Notification />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MainPage;