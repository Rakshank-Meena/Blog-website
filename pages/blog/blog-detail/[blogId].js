import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../Components/Navbar'
import CustomButton from '../../Components/CustomButton'
import { useRouter } from 'next/router'
import Comments from '../../Components/Comments'

const BlogDetail = (props) => {
    const router = useRouter()
    const [edit, setEdit] = useState(true)
    const [blogTitle, setBlogTitle] = useState(props.blogs.title ? props.blogs.title : '')
    const [editAccess, setEditAccess] = useState()
    const [blogContent, setBlog] = useState(props.blogs.content ? props.blogs.content : "")
    const [author, setAuthor] = useState(props.blogs.userName ? props.blogs.userName : "")
    const [comment, setComment] = useState("")
    const [commentsArr, setCommentsArr] = useState([])
    const arr = [1, 2, 3, 4, 5]
    useEffect(() => {
        setCommentsArr(props.blogs.comments)
        if (localStorage.getItem("_uud")) {
            const userData = JSON.parse(localStorage.getItem("_uud"))
            const boolVal = userData._patk == '1alwd' || userData.email == props.blogs.email ? false : true
            setEditAccess(boolVal)
        }

    }, [])
    const handleEdit = async () => {
        if (editAccess || (blogTitle === props.blogs.title && blogContent === props.blogs.content)) {
            return setEdit(true)
        }
        const data = { title: blogTitle, content: blogContent, blogId: props.blogs.blogId, email: props.blogs.email, type: "content" }
        await axios.patch('http://localhost:5000/blogs', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then((res) => {
            alert('success'), setEdit(true)
        }).catch((err) => { alert('failed') })
    }
    const handleComment = async () => {
        if (comment == "") {
            return
        }
        const data = { blogId: props.blogs.blogId, email: props.blogs.email, type: "comment", comment }
        await axios.patch('http://localhost:5000/blogs', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then((res) => {
            alert('comment posted successfully'), setEdit(true), setComment('')
        }).catch((err) => { alert('failed') })
    }
    const handleDelete = () => {
        window.confirm("are you sure you want to delete this blog permanently") ? axios.delete(`http://localhost:5000/blogs`, {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true,
            params: {
                blogId: props.blogs.blogId
            }
        }).then((res) => { return (alert('blog deleted successfully'), router.push("/blog/blogs")) }).catch((err) => { console.log('err') }) : ""
    }
    return (
        <>
            <Navbar />
            <div className="w-auto h-auto bg-white sm:mx-40 rounded-md sm:px-5 px-5 py-4 mx-10 mt-[100px] flex flex-col gap-4">
                {(!editAccess && !edit) && <div className='flex w-full justify-end gap-2 items-center'>
                    <div onClick={handleEdit}>
                        <CustomButton classes={''} type={'primary'} text={'save'} />
                    </div>
                    <div onClick={() => setEdit(!edit)}>
                        <CustomButton classes={''} type={'secondary'} text={'cancel'} />
                    </div>
                    <div className='ml-4 text-red-900' onClick={handleDelete}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                            {...props}
                        >
                            <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                        </svg>
                    </div>
                </div>}

                {edit ? <h1 className={`text-[26px] font-bold uppercase `}>{blogTitle}</h1> : <input type='text' readOnly={edit} className={`text-[21px] font-bold uppercase border border-primaryCtaColor bg-stone-300 px-3 rounded-lg shadow-sm shadow-black`} value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />}
                <div className=" flex justify-between text-[16px] font-semibold text-gray-600">{author}{!editAccess && <button className='text-blue-900' onClick={() => !editAccess && setEdit(!edit)}>Edit</button>}</div>
                <section className="text-[18px] h-auto w-full  flex flex-wrap break-words whitespace-pre-wrap">
                    {edit ? <p className="text-[18px] h-auto w-full"
                        dangerouslySetInnerHTML={{ __html: blogContent }}
                    >
                    </p> : <textarea className='w-full min-h-[40vh] px-3 py-2 border border-primaryCtaColor bg-stone-300  rounded-lg shadow-sm shadow-black' value={blogContent} onChange={(e) => setBlog(e.target.value)} />}
                </section>
            </div>
            <div className=" w-auto flex flex-col sm:mx-40 mx-10 px-2 mt-2 py-5 rounded-xl bg-emerald-50">
                <div className='font-semibold text-2xl  px-4 py-2'>Comments</div>
                <div className='mx-auto w-full flex px-2'>
                    <input placeholder='Comment' className='w-full bg-stone-200 px-2 mr-4 border-b-2 border-primaryTxt' type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <div onClick={handleComment}><CustomButton classes={''} type={'secondary'} text={'post'} /></div>
                </div>

                {commentsArr[0] && <div><Comments CommentsArr={commentsArr} /></div>}
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const id = await params.blogId
    let blogs
    try {
        await axios.get(`http://localhost:5000/blogs`, {
            headers: {
                "content-type": "application/json"
            },
            params: {
                blogId: id
            }
        }).then((res) => { blogs = res.data.data }).catch((err) => { console.log('err') })

    } catch (error) {
        console.log("error")
    }



    return {
        props: { blogs } // will be passed to the page component as props
    }
}
export default BlogDetail
