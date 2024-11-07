'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { Camera } from 'lucide-react'

import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChangeProfile = () => {

  const router = useRouter()
  const [userProfile, setUserProfile] = useState<GetUserProfile | null>(null)

  const [form, setForm] = useState<LoginForm>({
    email:'',
    password:''
  })

  const [error, setError] = useState<LoginForm>({
    email:'',
    password:''
  })

  useEffect(() => {
  
    const avatar = localStorage.getItem('Avatar')
    const userId = localStorage.getItem('User')
    
    if(avatar){
      router.push('/create-host-profile')
    }

    if(userId){
      const id = JSON.parse(userId)

      async function getUserProfile(){
        try {
          const res = await fetch(`http://localhost:3000/api/profile?userId=${id}`)

          const data = await res.json()
  
          setUserProfile(data.userProfile)
        } catch (error) {
          console.log(error)
        }
      }
  

      getUserProfile()
    }
   
  }, [])

  function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
        
    setForm((prev) =>{
            return {
                ...prev,
                [name]:value
            }
        })
    
    }


  return (
    <div>
        <Navbar/>
        <div className='h-screen flex justify-center items-center '>
            {
              userProfile && 
  
                      <div className='flex w-[800px] m-auto bg-customWhite rounded-lg p-10 max-md:grid grid-cols-1 max-md:p-0'>
                        <div className='flex px-10 justify-center items-center gap-5 flex-col'>
                            <InputForm valueText='' onChangeInput={onChangeHandler} typeText='text' errorText='' placeHolder='' labelText='E-post
                            ' nameText='email'/>
                        </div>
                        <div className='flex flex-col gap-5 px-10'>
                            <button className='py-2 px-4 bg-customLightGreen container text-customWhite font-semibold text-lg
                            rounded-lg hover:opacity-50 transition-opacity'>Skapa&nbsp;Annons</button>   
                        </div>
                      </div>
            }
        </div>
    </div>
  )
}

export default ChangeProfile