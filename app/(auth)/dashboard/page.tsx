'use client'
import { Navbar } from '@/app/component/Navbar'

import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const router = useRouter()
  const [userProfile, setUserProfile] = useState<GetUserProfile | null>(null)


  useEffect(() => {
  
    const avatar = localStorage.getItem('Avatar')
    const userId = localStorage.getItem('User')
    
    if(avatar){
      router.push('/create-host-profile')
    }

    if(userId){
      const id = JSON.parse(userId)
      console.log(id)
      async function getUserProfile(){
        try {
          const res = await fetch(`http://localhost:3000/api/profile?userId=${id}`)

          const data = await res.json()
          console.log(data)
          setUserProfile(data.userProfile)
        } catch (error) {
          console.log(error)
        }
      }
  

      getUserProfile()
    }
   
  }, [])


  const defaultAvatarSrc = 'https://res.cloudinary.com/drkty7j9v/image/upload/v1729774400/profileDefault_hfv9ys.png';

  console.log(userProfile)
  const avatarSrc: string = userProfile?.avatar && userProfile.avatar !== '' ? userProfile.avatar : defaultAvatarSrc;

  return (
    <div>
        <Navbar/>
        <div className=''>
            {
              userProfile && 
              <div className='flex justify-center items-center gap-10 h-screen'>
                    <div className="relative w-[300px] h-[300px] overflow-hidden rounded-full">
                      <Link href={'/change-host-profile'} >
                        <CldImage
                          src={avatarSrc} 
                          height={1200}
                          width={1200}
                          alt='Profilbild'
                          className="absolute top-0 left-0 w-full h-full object-cover" 
                                      />
                      </Link> 
                      </div> 
                      <div className='flex justify-center items-center bg-customWhite rounded-lg p-10'>
                        <div className='flex px-10 justify-center items-center gap-5  flex-col '>
                          <h1 className='text-2xl font-semibold border-b-2 border-customGray'>Min&nbsp;Profil</h1>
                          <div className='grid grid-cols-2 gap-4 container'>
                            <label className='text-lg border-b-2 border-customGray'>Användarnamn</label> 
                            <span className='font-semibold text-lg border-customGray'>{userProfile.name}</span>
                            
                            <label className='text-lg border-b-2 border-customGray'>Namn</label> 
                            <span className='font-semibold text-lg border-customGray'>{userProfile.firstName} {userProfile.lastName}</span>

                            <label className='text-lg border-b-2 border-customGray'>Telefonnummer</label> 
                            <span className='font-semibold text-lg border-customGray'>{userProfile.phone}</span>

                            <label className='text-lg border-b-2 border-customGray'>Epostadress</label> 
                            <span className='font-semibold text-lg border-customGray'>{userProfile.email}</span>
                    </div>
                        </div>
                        <div className='flex flex-col gap-5 px-10'>
                            <Link href={'/create-listing'}>
                            <button className='py-2 px-4 bg-customLightGreen container text-customWhite font-semibold text-lg
                            rounded-lg'>Skapa&nbsp;Annons</button>
                            </Link>
                            <Link href={'/create-listing'}>
                            <button className='py-2 px-4 bg-customGreen container text-customWhite font-semibold text-lg
                            rounded-lg'>Mina&nbsp;hem</button>
                            </Link>
                            <Link href={'/create-listing'}>
                            <button className='py-2 px-4 bg-customOrange container text-customWhite font-semibold text-lg
                            rounded-lg'>Ändra&nbsp;profil</button>
                            </Link>
                            <Link href={'/create-listing'}>
                            <button className='py-2 px-4 bg-customGray container text-customWhite font-semibold text-lg
                            rounded-lg'>Mina meddelande</button>
                            </Link>
                        </div>
                      </div>
              </div>
            }
        </div>
    </div>
  )
}

export default Dashboard