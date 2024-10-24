'use client'
import { DetailPageModal } from '@/app/component/DetailPageModal'
import { Navbar } from '@/app/component/Navbar'
import { Bus, BusIcon, ChevronDown, ChevronUp, Dot, X } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailPropertyPage = () => {

  const {id} = useParams()

  const [property, setProperty] = useState<ListingProperty | null>(null)


  useEffect(() => {
    async function getProperty(){
      try {
        const res = await fetch(`http://localhost:3000/api/property?id=${id}`)

        if(!res.ok){
          throw new Error('Hittade inte bostaden')
        }

        const data:ListingProperty = await res.json()
        console.log(data)
        setProperty(data)

      } catch (error) {
        
      }
    } 

    if(id){
      getProperty()
    }

  }, [])
  

console.log(property)


  return (
    <div><Navbar/>
       <main className='relative'>
        <div className='flex'>
          <DetailPageModal property={property}/>
          <div className='bg-gray-300 fixed h-screen w-[250px] right-0'>
             <div className='bg-customWhite'>

             </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default DetailPropertyPage