'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import favicon from '../favicon.ico'
import Cookies from 'js-cookie'

export const Navbar = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const token = Cookies.get('token')
        
        if(token){
            setLoggedIn(true)
        }

        
        
    }, [])
    
    function onLogoutButton(){
        Cookies.remove('token')
        setLoggedIn(false)
    }

  return (
    <header className='flex justify-between items-center p-4 border-b-2 border-black bg-white sticky top-0 left-0 z-20'>
        <ul>
            <Link href={'/'}><Image src={favicon} width={70} height={70} alt='Älg'/></Link>
        </ul>
        <ul>
            { loggedIn ?
                <Link href={'/login'}><li className='py-2 bg-customOrange text-customWhite px-4 rounded-lg font-bold cursor-pointer'>Logga in</li></Link>
                :
                <Link href={'/login'}><li onClick={onLogoutButton} className='py-2 bg-customOrange text-customWhite px-4 rounded-lg font-bold cursor-pointer'>Logga ut</li></Link>
            }
        </ul>
        
    </header>
  )
}
