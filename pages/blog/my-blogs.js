import axios from 'axios'
import dynamic from 'next/dynamic'
const LazyLoader = dynamic(() => import('../../components/LazyLoader'), { ssr: false })
const BlogList = dynamic(() => import("../../components/BlogList"), { ssr: false, loading: () => <LazyLoader /> })
const Nothing = dynamic(() => import("../../components/NothingError"))
import { useEffect, useState } from 'react'
import NoSSR from '../../components/SSRDisable'
const MyBlog = (props) => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        if (localStorage.getItem("_uud")) {
            const userData = JSON.parse(localStorage.getItem("_uud"))
            axios.get('https://blog-backend-nhou.onrender.com/my-blogs', {
                headers: {
                    "content-type": "application/json"
                },
                params: {
                    email: userData.email
                }
            }).then((res) => { setBlogs(res.data.data) }).catch((err) => { console.log(err) })
        }
    }, [])
    return (
        <NoSSR>
            <div className='container mx-auto px-4 py-8 lg:max-w-[62rem] '>
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Blogs</h1>
                {blogs[0] ?
                    (<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto">
                        {blogs.map((item, index) => {
                            return (
                                <div className="my-3" key={`blogList${index}`}>
                                    <BlogList author={item.userName} title={item.title} blogId={item.blogId} />
                                </div>
                            )
                        })}
                    </div>
                    ) : (
                        <div>
                            <Nothing text={"sorry,nothing to show here"} />
                        </div>
                    )}
            </div>
        </NoSSR>
    )
}


export default MyBlog