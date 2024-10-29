'use client'
import { Navbar } from '@/app/component/Navbar'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {

  const router = useRouter()

  useEffect(() => {
  
    const avatar = localStorage.getItem('Avatar')
      
    if(avatar){
      router.push('/create-host-profile')
    }
  }, [])

  return (
    <div>
        <Navbar/>
        <div className=''>
            <div>
                Sidbar
            </div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Dashboard