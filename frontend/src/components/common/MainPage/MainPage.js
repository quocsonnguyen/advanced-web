import React, {useState, useEffect} from 'react';
import s from './MainPage.module.css'
import CardPost from './components/CardPost/CardPost'
import Notification from './components/Notification/Notification'
import io from 'socket.io-client'
const socket = io()

function MainPage(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [reload, setReLoad] = useState(false)

    socket.on('reRenderFeed', () => {
        setReLoad(!reload)
    })

    useEffect(() => {
        fetch("/api/post")
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
    }, [reload])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={s.MainPage}>
                <div className={s.MainPage_social_media}>
                    {posts.map((post, i) => {
                        if (i === 0) {
                            return (
                                <CardPost key={post._id} user={props.user} postInfo={post} />
                            )
                        } else {
                            return (
                                <div key={post._id}>
                                    <hr />
                                    <CardPost user={props.user} postInfo={post} />
                                </div>
                            )
                        }
                    })}
                </div>

                <Notification />
            </div>
        );
    }
}

export default MainPage;