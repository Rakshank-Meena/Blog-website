import axios from 'axios'
import dynamic from "next/dynamic"
import { useEffect, useState } from 'react'
const BlogList = dynamic(() => import('../../Components/BlogList'))


const BlogListing = (props) => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        setBlogs(props.blogs)
    }, [])
    return (
        <>
            <div className="container mx-auto px-4 py-8 lg:max-w-[62rem] ">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">All Blogs</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto">
                    {blogs.map((item, index) => {
                        return (
                            <div className="my-3" key={`blogList${index}`}>
                                <BlogList author={item.userName} title={item.title} blogId={item.blogId} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    let blogs
    await axios.get('https://blog-backend-nhou.onrender.com/blogs', {
        headers: {
            "content-type": "application/json"
        }
    }).then((res) => { blogs = res.data.data }).catch((err) => { console.log(err) })


    return {
        props: { blogs } // will be passed to the page component as props
    }
}
export default BlogListing