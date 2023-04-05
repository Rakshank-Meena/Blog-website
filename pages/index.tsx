import Link from 'next/link'
import Navbar from './Components/Navbar'


export default function Home() {

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center h-auto mt-[40px] py-[60px] bg-bannerGreen px-10 ">


        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to <span className='text-emerald-900'>Blogify</span></h1>
          <p className="text-lg font-semibold text-gray-600 mb-5">
            Welcome to our blog website, where you can share your thoughts, insights, and stories with the world! We believe that everyone has a unique perspective to offer, and we are excited to provide a platform for you to do just that.

            Our blog website is designed to be user-friendly and accessible to anyone who wants to write. Whether you're an experienced blogger or just starting out, we have everything you need to create a high-quality post that will engage and inform your readers.

          </p>

          <div className="flex space-x-4">
            <Link href="/login">
              <div className="py-3 px-6 bg-primaryCta text-primaryCtaColor rounded-lg  focus:outline-none border-2 border-primaryCtaColor focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Sign In</div>
            </Link>
            <Link href="/blog/blogs">
              <div className="py-3 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 border-2 border-primaryCtaColor focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Explore</div>
            </Link>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}
