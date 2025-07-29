import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import HomeLogoutImage from '../assets/home-logout.jpg'

function Home() {
    const [posts, setPosts] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(true)

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authStatus) {
            // Only fetch posts if user is logged in
            setLoadingPosts(true)
            appwriteService.getPosts()
                .then((res) => {
                    if (res) {
                        setPosts(res.documents)
                    }
                })
                .finally(() => setLoadingPosts(false))
        } else {
            setLoadingPosts(false)
        }
    }, [authStatus]) // run this effect every time userData changes

    if (loadingPosts) {
        return <div className="text-center py-10 text-xl">Loading...</div>
    }

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="h-120 flex flex-wrap justify-center">
                        <div className="p-4 w-full flex justify-center">
                            <img
                                src={HomeLogoutImage}
                                alt="Login Illustration"
                                className="w-120 rounded-xl shadow-md shadow-blue-300"
                            />
                        </div>
                        <div className="p-4 w-full">
                            <h1 className="text-4xl font-bold hover:text-gray-800">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home