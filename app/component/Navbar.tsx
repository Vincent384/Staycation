'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import favicon from '../favicon.ico'

export const Navbar = () => {

    const [avatar, setAvatar] = useState<Host | null>(null)

    useEffect(() => {
        
       async function getHost(){

            //KOlla om användaren är inloggad

            try {
                const res = await fetch('http://localhost:3000/api/host/homes')

                if(!res.ok){
                    throw new Error('Hittade inte någon host')
                }

                const data = await res.json()
                console.log(data)

                setAvatar(data)

            } catch (error) {
                console.log((error as Error).message)
            }

        }

        // getHost()

    }, [])
    

  return (
    <header className='flex justify-between items-center p-4 border-b-2 border-black bg-white sticky top-0 left-0 z-20'>
        <ul>
            <Link href={'/'}><Image src={favicon} width={70} height={70} alt='Älg'/></Link>
        </ul>
        <ul>
            <Link href={'/login'}><li className='py-2 bg-customOrange text-customWhite px-4 rounded-lg font-bold cursor-pointer'>Logga in</li></Link>
        </ul>
        
    </header>
  )
}
