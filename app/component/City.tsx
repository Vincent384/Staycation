import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const City = () => {

    const [cities, setCities] = useState<Cityies[] | null>(null)

    useEffect(() => {
        async function getCities(){
            try {
                const res = await fetch('http://localhost:3000/api/city')

                if(!res.ok){
                    throw new Error('Could not find any cities')
                }

                const data = await res.json()
                console.log(data.getCities)
                setCities(data.getCities)

            } catch (error) {
                console.log((error as Error).message)
            }

        }

        getCities()
    }, [])
    
console.log(cities)
  return (
    <main className='grid place-items-center mt-10 gap-7 max-w-[750px] m-auto grid-cols-3 
    cursor-pointer max-lg:grid-cols-2 max-lg:max-w-[500px] max-sm:grid-cols-1 max-sm:max-w-[300px]  '>
        {
            cities && cities.map((city,_id) =>(
                    <>
                <div className='border border-borderGray rounded-md relative w-full h-48 mb-10 max-sm:mb-5' key={_id}>
                    <Image className='object-cover rounded-md rounded-b-none '
                    src={city.cityImage}
                    layout='fill'
                    alt={city.cityName}/>
                    <p className='absolute bottom-0 left-0 right-0 p-2 bg-customWhite text-center text-2xl z-10'>{city.cityName}</p>
                </div>
                </>
            ))
        }
    </main>
  )
}
