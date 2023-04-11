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
            await axios.post('https://blog-backend-nhou.onrender.com/blogs', payload, {
                headers: {
                    "content-type": "application/json",
                },
                withCredentials: true,
            }).then((res) => { return (alert('blog posted successfully'), setBlogTitle(''), setContent(''), router.push("/blog/blogs")) }).catch((err) => { alert(err) })
        }
    }

    return (
        <>
            {/* <div className="w-screen h-screen bg-bannerGreen flex justify-center items-center flex-col px-5 ">
                <form className="flex flex-col h-auto mx-auto  text-[25px] text-primaryTxt w-[80%]">
                    <input className="rounded-lg w-full my-4 py-3 px-4 " placeholder={'Title'} type="text" name="title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                    <textarea className="rounded-lg w-full my-4 py-3 px-4 min-h-[40vh]" placeholder={'Tell Your Story'} type="text" name="blog" value={content} onChange={(e) => setContent(e.target.value)} />
                </form>
                <div onClick={handleFormSubmit}><CustomButton text={'publish'} type={'primary'} classes={' mt-5'} /></div>
            </div> */}
            <div className="container mx-auto mt-8">
                <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto bg-white rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border border-neutral1 rounded-md px-4 py-2"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block font-bold mb-2">Content</label>
                        <textarea
                            id="content"
                            className="w-full border border-neutral1 rounded-md px-4 py-2"
                            rows="8"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-link">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default Layout