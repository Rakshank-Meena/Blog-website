import { useEffect, useState } from "react";
import CustomButton from "./CustomButton.js"
import axios from "axios"
import { useRouter } from "next/router.js";
const Layout = () => {
    const router = useRouter()
    const [blogTitle, setBlogTitle] = useState('')
    const [content, setContent] = useState('')
    const payload = {
        title: blogTitle,
        content: content
    }
    const handleFormSubmit = async () => {
        if (blogTitle !== '' && content !== '') {
            await axios.post('http://localhost:5000/blogs', payload, {
                headers: {
                    "content-type": "application/json",
                },
                withCredentials: true,
            }).then((res) => { return(alert('blog posted successfully'),setBlogTitle(''),setContent(''),router.push("/blog/blogs")) }).catch((err) => { alert(err) })
        }
    }

    return (
        <>
            <div className="w-screen h-screen bg-bannerGreen flex justify-center items-center flex-col px-5 ">
                <form className="flex flex-col h-auto mx-auto  text-[25px] text-primaryTxt w-[80%]">
                    <input className="rounded-lg w-full my-4 py-3 px-4 " placeholder={'Title'} type="text" name="title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                    <textarea className="rounded-lg w-full my-4 py-3 px-4 min-h-[40vh]" placeholder={'Tell Your Story'} type="text" name="blog" value={content} onChange={(e) => setContent(e.target.value)} />
                </form>
                <div onClick={handleFormSubmit}><CustomButton text={'publish'} type={'primary'} classes={' mt-5'} /></div>
            </div>
        </>
    );
}

export default Layout