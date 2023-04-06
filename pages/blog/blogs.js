import axios from 'axios'
import Navbar from '../../Components/Navbar'
import BlogList from "../../Components/BlogList"


const BlogListing = (props) => {
    return (
        <div className=''>
            <Navbar />
            <div className=" w-full sm:px-20 mt-[100px] bg-bannerGreen">
                <div className='text-2xl font-semibold px-8 sm:px-40 my-10'>Blogs</div>
                {props.blogs && props.blogs.map((item, index) => {
                    return (
                        <div className="my-3" key={`blogList${index}`}><BlogList author={item.userName} title={item.title} blogId={item.blogId} /></div>
                    )
                })}
            </div>
        </div>
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