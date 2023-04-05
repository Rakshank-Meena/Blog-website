import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CustomButton from './CustomButton'
import axios from 'axios'
import SearchList from './SearchList'
import Link from 'next/link'
const Navbar = (props) => {
    const router = useRouter()
    const [blog, setBlogs] = useState([])
    const [search, setSearch] = useState('')
    const [searchedItem, setSearchedItem] = useState([])
    const [signupCta, setSignupCta] = useState('sign in')
    const [hamburger, setHamburger] = useState(false)
    useEffect(() => {
        localStorage.getItem("_uud") && setSignupCta('sign out')
        axios.get('http://localhost:5000/blogs', {
            headers: {
                "content-type": "application/json"
            }
        }).then((res) => { setBlogs(res.data.data) }).catch((err) => { console.log(err) })

    }, [])

    const handleSearch = () => {
        if (search.length < 3) {
            return setSearchedItem([])

        }
        else {
            return blog.filter((item) => {
                (item.title.replace(" ", '').toLowerCase().includes(search.replace(" ", '').toLowerCase()) || item.content.replace(" ", '').toLowerCase().includes(search.replace(" ", '').toLowerCase())) && (!searchedItem.includes(item) && setSearchedItem((any) => [...any, item]))
            })
        }
    }
    const handleSignin = () => {
        localStorage.getItem("_uud") ? (localStorage.removeItem("_uud"), setSignupCta('sign in')) : router.push("/login")
    }
    return (
        <>
            <div className='w-full z-10 bg-emerald-900 text-bannerGreen fixed top-0 flex justify-between px-5 items-center h-[80px]'>

                <div className='text-4xl font-bold drop-shadow-lg shadow-black flex items-center justify-center' >
                    <div className='sm:hidden mr-3 text-2xl' onClick={() => setHamburger(!hamburger)}>
                        <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    Blogify
                </div>

                <ul className='flex gap-7 font-semibold'>
                    <li className='hidden sm:block'>
                        <Link href={"/blog/blogs"}>Home</Link>
                    </li>
                    <li className='hidden sm:block'>
                        <Link href={"/blog/first-post"}>Write a Blog</Link>
                    </li>
                    <li className='hidden sm:block'>
                        <Link href={"/blog/my-blogs"}>My blogs</Link>
                    </li>
                    <li>
                        <div className='relative  bg-stone-50 text-black  rounded-md border-primaryTxt pl-3 flex justify-center items-center py-1'>
                            <input className='search-input px-1 text-sm bg-stone-50 sm:w-auto w-[80px]' placeholder={'Search'} value={search} onChange={(e) => { handleSearch(), setSearch(e.target.value) }} />
                            <button onClick={handleSearch}>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    height="1em"
                                    width="1em"
                                    {...props}
                                >
                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                                </svg>
                            </button>

                        </div>
                    </li>
                </ul>
                {searchedItem[0] && <div className='absolute flex flex-col h-auto left-[20%] sm:left-[40%] border  w-[300px] text-black bg-orange-50 top-[75px] py-1 px-[2px] rounded-sm '>
                    <SearchList array={searchedItem} />
                </div>}
                <div className='hidden sm:block' onClick={handleSignin}>
                    <CustomButton text={signupCta} type={'primary'} classes={'font-semibold py-1 px-2 rounded-full '} />
                </div>
            </div>
            <div className={`sm:hidden absolute top-0 pt-[85px] left-0 flex-col justify-between  min-w-[35%] w-auto h-screen bg-white  px-2 border border-primaryCtaColor py-1 flex transition ease-in-out delay-150 ${hamburger ? ' ' : '-translate-x-[80vw]'}`}>
                <ul className='flex flex-col gap-3'>
                    <li className=' text-primaryCtaColor  mx-2 my-auto text-lg font-semibold capitalize'>
                        <Link href={"/blog/blogs"}>Home</Link>
                    </li>
                    <li className=' text-primaryCtaColor  mx-2 my-auto text-lg font-semibold capitalize'>
                        <Link href={"/blog/first-post"}>Write a blog</Link>
                    </li>
                    <li className=' text-primaryCtaColor  mx-2 my-auto text-lg font-semibold capitalize'>
                        <Link href={"/blog/my-blogs"}>My Blogs</Link>
                    </li>
                </ul>
                <div className='sm:hidden px-2 py-1 bg-primaryCta drop-shadow-lg mb-5 text-sm font-semibold uppercase flex' onClick={handleSignin}>
                    {signupCta}
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
                </div>
            </div>
        </>
    )
}


export default Navbar
