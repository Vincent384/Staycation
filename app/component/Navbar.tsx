'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import favicon from '../favicon.ico'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/authContext'
import { CldImage } from 'next-cloudinary'

export const Navbar = () => {

    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<HostData | null>(null)

    useEffect(() => {
        
      const token = localStorage.getItem('status')
        if(token){
            setLoggedIn(true)
        }
    
        const getHost = localStorage.getItem('Host')

        if(getHost == null){
            return
        }

    const avatarData = JSON.parse(getHost)
        
    setAvatar(avatarData)
        
    }, [])


    
    async function onLogoutButton(){
        await fetch('http://localhost:3000/api/logout',{
            method:'POST'
        }
        )
        localStorage.removeItem('status')
        setLoggedIn(false)
    }

    const defaultAvatarSrc = 'https://res.cloudinary.com/drkty7j9v/image/upload/v1729774400/profileDefault_hfv9ys.png';


    const avatarSrc: string = avatar?.avatar && avatar.avatar !== '' ? avatar.avatar : defaultAvatarSrc;


  return (
    <header className='flex justify-between items-center p-4 border-b-2 border-black bg-white sticky top-0 left-0 z-20'>
        <ul>
            <Link href={'/'}><Image src={favicon} width={70} height={70} alt='Älg'/></Link>
        </ul>
        <div className='flex justify-center items-center gap-5'>
                <ul>
                    
                {
                    loggedIn &&

                    <div className='flex items-center justify-center gap-5'>
                            <Link href={'/dashboard'}>
                            <div className="relative w-12 h-12 overflow-hidden rounded-full"> 
                                <CldImage
                                    src={avatarSrc} 
                                    height={1200}
                                    width={1200}
                                    alt='Profilbild'
                                    className="absolute top-0 left-0 w-full h-full object-cover" 
                                />
                            </div>
                            </Link>

                    </div>



                }
                    
                </ul>
                <ul>
                            { loggedIn ?
                                <Link href={'/login'}><li onClick={onLogoutButton} className='py-2 bg-customOrange text-customWhite px-4 rounded-lg font-bold cursor-pointer'>Logga ut</li></Link>
                                :
                                <Link href={'/login'}><li className='py-2 bg-customOrange text-customWhite px-4 rounded-lg font-bold cursor-pointer'>Logga in</li></Link>
                            }
                </ul>

        </div>
        
    </header>
  )
}
