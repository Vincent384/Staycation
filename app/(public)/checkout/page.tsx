'use client'
import { Navbar } from '@/app/component/Navbar'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Checkout = () => {

    const searchParams = useSearchParams()

    const checkinDate = searchParams.get('checkinDate') as string    
    const checkoutDate = searchParams.get('checkoutDate') as string   
    const guests = searchParams.get('guests') as string   

    useEffect(() => {


      
    }, [checkinDate,checkoutDate,guests])
    

  return (
    <div>
        <Navbar/>
        Checkout
    </div>
  )
}

export default Checkout