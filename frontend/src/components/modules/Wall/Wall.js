import React, { useEffect, useState } from 'react';
import s from './Wall.module.css'
import { CardPost, Layout } from '../../common'
import { useParams } from 'react-router';

function Wall(props) {
    let { uid } = useParams()
    let [posts, setPosts] = useState([])
    const [numPosts, setNumPosts] = useState(10)
    const [totalPosts, setTotalPosts] = useState(0)

    const loadMorePosts = () => setNumPosts(numPosts + 10)

    useEffect(() => {
        fetch(`/api/post/u/${uid}/num-posts/${numPosts}`)
            .then(res => res.json())
            .then(result => {
                setTotalPosts(result.data.totalPosts)
                setPosts(result.data.posts)
            })
    }, [numPosts, uid])

    return (
        <Layout>
            <div className={s.Wall}>
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
            </div>
        </Layout>
    );
}

export default Wall;