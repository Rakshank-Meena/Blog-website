import axios from 'axios'
import dynamic from "next/dynamic"
import { useEffect, useState } from 'react'
import NoSSR from "../../components/SSRDisable"
const LazyLoader = dynamic(() => import('../../components/LazyLoader'), { ssr: false })
const BlogList = dynamic(() => import('../../components/BlogList'), {
    loading: () => <LazyLoader />,
    ssr:false
})

const BlogListing = (props) => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setBlogs(props.blogs)
        setLoading(false)
    }, [])
    return (
        <NoSSR>
            {loading ?
                <LazyLoader />
                : <div className="container mx-auto px-4 py-8 lg:max-w-[62rem] ">
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
            }
        </NoSSR>
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