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
    

    const { avatar } = useAuthContext()

    useEffect(() => {
  
      const token = localStorage.getItem('status')
        if(token){
            setLoggedIn(true)
        }

        
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

    console.log(avatar)

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
                    <Link href={''}>


                    <div className="relative w-12 h-12 overflow-hidden rounded-full"> {/* Behållare för rund bild */}
                        <CldImage
                            src={avatarSrc} // Använder avatarSrc som sträng
                            height={50}
                            width={50}
                            alt='Profilbild'
                            className="absolute top-0 left-0 w-full h-full object-cover" // CSS för att göra bilden rund
                        />
                    </div>
                    </Link>


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
