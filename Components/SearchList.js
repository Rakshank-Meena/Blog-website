import { useRouter } from 'next/router'
const SearchList = (props) => {
    return (
        <>
            {props.array.map((item, i) => {
                return (
                    <ul className="text-default">
                        <li
                            key={`search${i}`}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-t-2 mt-1  lg:border-none"
                        >
                            <a href={`/blog/blog-detail/${item.blogId}`}>
                                {item.title}
                            </a>
                        </li>
                    </ul>
                )

            })}

        </>
    )
}



export default SearchList
