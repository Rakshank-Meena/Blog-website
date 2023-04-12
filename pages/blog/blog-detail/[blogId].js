import { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
const CustomButton = dynamic(() => import('../../../components/CustomButton'), { ssr: false })
import { useRouter } from 'next/router'
const Comments = dynamic(() => import('../../../components/Comments'), { ssr: false })
import NoSSR from "@/components/SSRDisable"
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
        await axios.patch('https://blog-backend-nhou.onrender.com/blogs', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then((res) => {
            alert('success'), setEdit(true)
        }).catch((err) => { alert('failed') })
    }
    const handleComment = async () => {
        if (comment == "") {
            return
        }
        const data = { blogId: props.blogs.blogId, email: props.blogs.email, type: "comment", comment }
        await axios.patch('https://blog-backend-nhou.onrender.com/blogs', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then((res) => {
            alert('comment posted successfully'), setEdit(true), setComment('')
        }).catch((err) => { alert('failed') })
    }
    const handleDelete = () => {
        window.confirm("are you sure you want to delete this blog permanently") ? axios.delete(`https://blog-backend-nhou.onrender.com/blogs`, {
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
        <NoSSR>
            <div className="container mx-auto mt-8 lg:px-10">
                {(!editAccess && !edit) &&
                    <div className='flex w-full justify-end gap-2 items-center'>
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
                    </div>
                }

                {edit ?
                    <h1 className={`text-3xl font-bold mb-8 px-8 `}>{blogTitle}</h1>
                    :
                    <div className=' mb-8 px-8 '>
                        <label className="block font-bold mb-2">Edit your Title</label>
                        <input type='text' readOnly={edit} className={`w-full  border-neutral1 border-2 rounded-md px-4 py-2 `} value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                    </div>
                }
                <div className=" flex justify-between px-8 items-center">
                    <p className="text-neutral2 capitalize ">{author}</p>
                    {editAccess == false && <button className='text-blue-900' onClick={() => !editAccess && setEdit(!edit)}>Edit</button>}
                </div>
                <section className="bg-white rounded-lg p-8 ">
                    {edit ?
                        <div className="prose max-w-none break-words whitespace-pre-wrap">
                            <p
                                dangerouslySetInnerHTML={{ __html: blogContent }}
                            >
                            </p>
                        </div>
                        :
                        <>
                            <label className="block font-bold mb-2">Edit Your Content</label>
                            <textarea rows="8" className='w-full border-2 border-neutral1 rounded-md px-4 py-2' value={blogContent} onChange={(e) => setBlog(e.target.value)} />
                        </>
                    }
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
        </NoSSR>
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const id = await params.blogId
    let blogs
    try {
        await axios.get(`https://blog-backend-nhou.onrender.com/blogs`, {
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
