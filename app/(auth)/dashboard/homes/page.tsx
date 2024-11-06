'use client'
import { Navbar } from '@/app/component/Navbar'
import { Bed, Bus } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'

const Homes = () => {


    const [property, setProperty] = useState<ListingProperty[] | null>(null)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        
        const host = localStorage.getItem('Host') 
        if(!host){
            return
        }
        const hostObject = JSON.parse(host)
        const id = hostObject._id 
        
            async function getProperty(){
                const res = await fetch(`http://localhost:3000/api/property/homes?id=${id}`)

                const data:ListingProperty[] = await res.json()
                console.log(data)
                if(res.status !== 200){
                    return 
                }
                setProperty(data)
            }
        getProperty()


    }, [])
    
  return (
    <div>
        <Navbar/>
        <h1 className='text-3xl font-semibold text-center mt-10 text-customWhite'>Dina Hem</h1>
        <div className=''>
  {     property && property.map((property)=>(
         <div className='bg-customWhite w-[500px] m-auto rounded-lg max-md:w-[300px]' key={property._id}>
         <div className='flex justify-center items-center mt-10 '>
             <div className=''>
                 <h2 className='bg-customOrange text-customWhite rounded-lg
                 font-semibold py-2 text-xl my-5 text-center'>{property.title}</h2>
                 <div className='w-[200px] border-2 border-customGray'>
                 <CldImage
                 src={property.images[activeImage]}
                 width={2000}
                 height={2000}
                 alt='Husbild'
                 crop={'fill'}/>
                 </div>
             </div>
         </div>
     
              <div className='flex justify-center items-center'>

                             <div className='flex m-3 gap-5 max-md:grid max-md:grid-cols-1 '>{property.images.map((image,index)=>(
                                 <div onClick={() => setActiveImage(index)} className='w-[100px] 
                                 border-2 border-customGray cursor-pointer hover:opacity-50 transition-opacity'
                                 key={index}>
                                 <CldImage 
                                 src={image}
                                 width={2000}
                                 height={2000}
                                 crop={'fill'}
                                 alt='Husbilder'/>
                                 </div>
                             ))}</div>
                             </div>
 
     
             <div className='grid grid-cols-2 mt-5 max-md:grid-cols-1 max-md:gap-3 max-md:px-5'>
                 <div className='flex flex-col text-lg bg-customGreen text-customWhite 
                 rounded-full gap-2 justify-center items-center'>
                     <span className=''>{property.location.adress}</span>
                     <span>{property.location.city}</span>
                     <span>{property.location.district}</span>
                     <div className='flex gap-3'>
                         <Bus/>
                         <span>{property.distanceToNearestBus}</span>
                     </div>
                 </div>
                 <div className='bg-customLightGreen flex flex-col justify-center items-center text-lg text-customWhite font-semibold
                  rounded-full '>
                     <div className='flex gap-5'>
                         <span>{property.maximum_guest}</span>
                         <Bed/>
                     </div>
                     <span>{property.price_per_night}kr per natt</span>
                 </div>
             </div>
         
         
         
             <div>
                     <h3 className='text-center text-xl mt-5'>Beskrivning</h3>    
                 <div className=' mt-5 mx-10 text-white rounded-lg bg-customOrange'>
                     <p className='p-5 text-lg'>{property.description}</p>
                 </div>
                 <div>
                     <h4 className='text-xl text-center mt-5'>Hus regler</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center bg-customGreen
                      text-customWhite rounded-lg mx-10'>{property.house_rules.map((regler,index)=>(
                         <div className='' key={index}>
                             <span>{regler}</span>
                         </div>
                     ))}</div>
                                             <h4 className='text-xl text-center mt-5'>Bekvämligheter</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center bg-customGreen
                      text-customWhite rounded-lg mx-10'>{property.facilities.map((regler,index)=>(
                         <div className='' key={index}>
                             <span>{regler}</span>
                         </div>
                     ))}</div>
                         <h4 className='text-xl text-center mt-5'>TillgänglighetsAnpassat</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center bg-customGreen
                      text-customWhite rounded-lg mx-10'>{property.accessibilityFeatures.map((regler,index)=>(
                         <div className='' key={index}>
                             <span>{regler}</span>
                         </div>
                     ))}</div>
                                             <h4 className='text-xl text-center mt-5'>TillgänglighetsAnpassade bilder</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center 
                      text-customWhite rounded-lg mx-10'>{property.accessibilityImages.map((image,index)=>(
                         <div className='w-12 h-12' key={index}>
                             <CldImage
                             src={image}
                             width={1200}
                             height={1200}
                             alt='Tillgänglighetsanpassade bilder'/>
                         </div>
                     ))}</div>
                 </div>
             </div>
     </div>     
         

      ))
          
         
              } 

           
        </div>
    </div>
  )
}

export default Homes