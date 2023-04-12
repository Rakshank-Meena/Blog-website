import axios from 'axios'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const CustomButton = dynamic(() => import('../components/CustomButton'))
import { useRouter } from 'next/router'
import Link from 'next/link'
import NoSSR from '../components/SSRDisable'
const LoggedIn = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const data = {
    email: email,
    password: password
  }
  const handleSubmit = async () => {

    await axios.post('https://blog-backend-nhou.onrender.com/login', data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res) => {
      const item = {
        email: res.data.user.email,
        _patk: res.data._patk
      }
      document.cookie = `_jwt=${res.data._jwt}`
      localStorage.setItem("_uud", JSON.stringify(item), new Date(Date.now() + 2892000000)),
        router.push('/blog/blogs')
    }).catch((e) => { console.log(e) })
  }
  useEffect(() => {
    localStorage.getItem("_uud") && router.push('/blog/blogs')
  }, [])

  return (
    <NoSSR>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="bg-white w-full max-w-sm p-8 rounded-lg shadow-md">
          <h1 className="text-primary text-2xl font-bold mb-8 text-center">Sign In</h1>

          <div className="mb-4">
            <label htmlFor="email" className="text-neutral3 block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
              placeholder="Your email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-neutral3 block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-neutral1 rounded-md py-2 px-3 text-sm focus:outline-none"
              placeholder="Your password"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md text-center hover:bg-secondary transition-colors duration-300"
          >
            Sign In
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-link hover:text-linkHover font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </NoSSR>
  )
}

export default LoggedIn

