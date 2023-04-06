import { useRouter } from 'next/router'
const SearchList = (props) => {
    const router=useRouter()
    return (
        <div>
            {props.array.map((item, i) => {
                return (
                    <a key={`search${i}`} href={`/blog/blog-detail/${item.blogId}`}><div className='capitalize my-1 font-semibold text-md text-primaryTxt bg-stone-100 border rounded-md shadow-lg px-1 py-[2px]' >
                        {item.title}
                    </div></a>
                )

            })}

        </div>
    )
}



export default SearchList
