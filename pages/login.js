import axios from 'axios'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const CustomButton = dynamic(()=>import('../Components/CustomButton'))
import { useRouter } from 'next/router'
import Link from 'next/link'
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
      document.cookie=`_jwt=${res.data._jwt}`
      localStorage.setItem("_uud", JSON.stringify(item), new Date(Date.now() + 2892000000)),
        router.push('/blog/blogs')
    }).catch((e) => { console.log(e) })
  }
  useEffect(() => {
    localStorage.getItem("_uud") && router.push('/blog/blogs')
  }, [])

  return (
    <div className='h-screen w-screen flex flex-col justify-center gap-7 items-center bg-lime-900'>
      <div className='w-[70%] h-1/2 border shadow-md flex flex-col p-[16px] justify-between items-center bg-white rounded-lg pb-[20px]' >
        <div className='text-[21px] font-semibold text-cyan-900'>Please Login To Continue</div>
        <input className='bg-lime-50 px-2 h-[40px] w-[80%] rounded-md border border-slate-500' type='email' placeholder='Please Your Email here' onChange={(e) => { setEmail(e.target.value) }}></input>
        <input className='bg-lime-50 px-2 h-[40px] w-[80%] rounded-md  border border-slate-500' type='password' placeholder='Your Password' onChange={(e) => { setPassword(e.target.value) }}></input>
        <div onClick={handleSubmit}><CustomButton classes={'mb-3 font-semibold uppercase py-1'} type={'primary'} text={'submit'} /></div>

      </div>
      <Link href={"/signup"}><div className='uppercase text-white drop-shadow-lg shadow-black flex flex-col gap-2 items-center'>dont have an account yet?? <CustomButton classes={'font-semibold py-1 px-2'} type={'primary'} text={'Sign up'} /></div></Link>
    </div>
  )
}

export default LoggedIn

