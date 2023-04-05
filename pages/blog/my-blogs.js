import axios from 'axios'
import Navbar from '../Components/Navbar'

import BlogList from "../Components/BlogList"
import { useEffect, useState } from 'react'

const MyBlog = (props) => {
    const [blogs, setBlogs] = useState()
    useEffect(() => {
        if (localStorage.getItem("_uud")) {
            const userData = JSON.parse(localStorage.getItem("_uud"))
            axios.get('http://localhost:5000/my-blogs', {
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
        <>
            <Navbar />
            <div className=" w-full sm:px-20 mt-[100px]">
                {blogs && blogs.map((item, index) => {
                    return (
                        <div className="my-3" key={`blogList${index}`}><BlogList author={item.userName} title={item.title} blogId={item.blogId} /></div>
                    )
                })}
            </div>
        </>
    )
}


export default MyBlog