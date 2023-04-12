const { default: Link } = require("next/link")
import NoSSR from "./SSRDisable"
const BlogList = (props) => {
    const { author, title, blogId } = props
    const add3dots = (text, char) => {
        return `${text.slice(0, char)}...`
    }
    return (
        <NoSSR>
            <div className="bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:h-28  ">{title.length > 75 ? add3dots(title, 70) : title}</h2>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center">
                            <span className="text-gray-600 text-sm mr-2 capitalize">Author:</span>
                            <span className="text-gray-800 text-sm">{author}</span>
                        </div>
                    </div>
                    <Link href={`/blog/blog-detail/${blogId}`} className="text-blue-500  my-auto hover:text-blue-600">Read more</Link>
                </div>
            </div>
        </NoSSR>
    )
}
export default BlogList