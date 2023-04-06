const { default: Link } = require("next/link")

const BlogList = (props) => {
    const { author, title, blogId } = props
    return (
        <>
            <div className="sm:w-[60%] w-[85%] mx-auto  border border-primaryTxt shadow-xl flex flex-col  rounded-xl bg-stone-50 text-primaryTxt px-3 py-2">
                <div className="w-full h-[70%] py-1 text-[21px] font-semibold">{title}</div>
                <div className="w-full flex justify-between h-[30%] py-1 text-[14px]">
                    <div>{author}</div>
                    <Link className="text-cyan-900 font-bold" href={`/blog/blog-detail/${blogId}`}>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="1.5em"
                            width="3em"
                            {...props}
                        >
                            <path
                                fillRule="evenodd"
                                d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default BlogList