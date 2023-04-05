import axios from 'axios'
import { useEffect, useState } from 'react'
import CustomButton from "./components/CustomButton"
import { useRouter } from 'next/router'


const Signup = () => {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')

  const data = {
    email: email,
    userName: userName,
    password: password,
    cPassword: cPassword,
    reqType: "signup"
  }
  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/login', data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res) => {
      const item = {
        email: res.data.user.email,
        _patk: res.data._patk
      }
      localStorage.setItem("_uud", JSON.stringify(item), new Date(Date.now() + 2892000000)),
      router.push('/blog/blogs')
    }).catch((e) => { console.log(e) })
  }
  useEffect(() => {
    localStorage.getItem("_uud")  && router.push('/blog/blogs')
  }, [])

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-lime-900'>
      <div className='w-[70%] h-1/2 border shadow-md flex flex-col p-[16px] justify-between items-center bg-white rounded-lg pb-[20px]' >
        <div className='text-[21px] font-semibold text-cyan-900'>Sign Up</div>
        <input className='bg-lime-50 px-2 h-[40px] w-[80%] rounded-md border border-slate-500' type='email' placeholder='Please Your Email here' onChange={(e) => { setEmail(e.target.value) }}></input>
        <input className='bg-lime-50 px-2 h-[40px] w-[80%] rounded-md border border-slate-500' type='text' placeholder='set a username' onChange={(e) => { setUserName(e.target.value) }}></input>
        <input className='bg-lime-50 px-2 h-[40px] w-[80%] rounded-md  border border-slate-500' type='password' placeholder='Your Password' onChange={(e) => { setPassword(e.target.value) }}></input>
        <input className='bg-lime-50 px-2 h-[40px] w-[80%] rounded-md  border border-slate-500' type='password' placeholder='confirm your password' onChange={(e) => { setCPassword(e.target.value) }}></input>
        <div onClick={handleSubmit}><CustomButton classes={'mb-3 font-semibold uppercase py-1'} type={'primary'} text={'submit'} /></div>

      </div>
    </div>
  )
}

export default Signup
