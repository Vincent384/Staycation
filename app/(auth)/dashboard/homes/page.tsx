'use client'
import { Navbar } from '@/app/component/Navbar'
import { Bed, Bus, LoaderCircle, X } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Homes = () => {


    const [property, setProperty] = useState<ListingProperty[] | null>(null)
    const [activeImage, setActiveImage] = useState(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
        setLoading(false)
        const host = localStorage.getItem('Host') 
        if(!host){
            return
        }
        const hostObject = JSON.parse(host)
        const id = hostObject._id 
        
            async function getProperty(){
                try {
                    const res = await fetch(`http://localhost:3000/api/property/homes?id=${id}`)

                    const data:ListingProperty[] = await res.json()
                    console.log(data)
                    if(res.status !== 200){
                        return 
                    }
                    setProperty(data)
                    setLoading(false)
                } catch (error) {
                    console.log((error as Error).message)
                }
            }
        getProperty()


    }, [])

    async function onClickHandleDeleteProperty(id:string){

        const bodyRequest = {
            propertyId:id
        }

            try {
                const res = await fetch('http://localhost:3000/api/property',{
                    method:'DELETE',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify(bodyRequest)
                })   

                if(res.status !== 200){
                    throw new Error('Något gick fel')
                }

                const data = await res.json()
                console.log(data)
                if(res.status == 200){
                    setProperty((prev) => prev?.filter((hus) => hus._id !== id) || [])
                }

            } catch (error) {
                console.log((error as Error).message)
            }
    }

    function popupModalWarning(){
        setModal(prev => !prev)
    }
    
  return (
    <div className='mb-10'>
        <Navbar/>
        <h1 className='text-3xl font-semibold text-center my-10 text-customWhite'>Dina Hem</h1>
        <div className=''>

  {
      loading ? (
          <LoaderCircle className='h-screen w-[300px] m-auto spin size-60' />
          ) : 
          
          property && property.map((property)=>(
         <div className='bg-customWhite w-[500px] m-auto border-2 rounded-lg max-md:w-[300px]' key={property._id}>
          {
                            modal && 
                          
                                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10'>
                                    <div className='relative flex flex-col bg-customBlack p-12 rounded-lg max-md:mx-10'>
                                        <X className='absolute top-2 right-2 size-8 text-customWhite cursor-pointer hover:text-red-700' onClick={popupModalWarning}/>
                                        <span className='text-xl text-customWhite font-semibold '
                                        >Varning! Är du säker på att du vill ta ditt hem?</span>
                                        <button onClick={() => onClickHandleDeleteProperty(property._id)}
                                        className='py-2 px-4 mt-5 bg-red-700 text-customWhite text-lg font-semibold rounded-lg
                                        hover:bg-red-500 transition-all'>Ta bort</button>
                                    </div>
                                </div>
                            
                            }
            <div className='p-5 flex justify-between'>
                <Link href={`/dashboard/change-listing/${property._id}`}>
                <button className='py-2 px-4 bg-customOrange text-customWhite font-semibold text-lg
                                rounded-lg hover:opacity-50 transition-opacity'>
                                    Ändra</button>
                </Link>
                <button className='py-2 px-4 bg-red-700 text-customWhite text-lg font-semibold rounded-lg' onClick={popupModalWarning}>Ta bort</button>
            </div>
         <div className='flex justify-center items-center '>
             <div className='flex justify-center items-center flex-col'>
                 <h2 className='bg-customBeige  text-customBlack border-2 border-customGray rounded-lg
                 font-semibold py-2 px-2 text-xl my-5 text-center'>{property.title}</h2>
                 <div className='w-[200px] border-2 border-customGray'>
                 <CldImage
                 src={property.images[activeImage]}
                 width={2000}
                 height={2000}
                 quality="auto" 
                 dpr="auto" 
                 loading="lazy" 
                 alt='Husbild'
                 crop={'fill'}/>
                 </div>
             </div>
         </div>
     
              <div className='flex justify-center items-center'>

                             <div className='flex m-3 gap-5 max-md:grid max-md:grid-cols-1 '>{property.images.map((image,index)=>(
                                 <div onClick={() => setActiveImage(index)} className='w-[100px] 
                                 border-2 border-customGray cursor-pointer  hover:opacity-50 transition-opacity'
                                 key={index}>
                                 <CldImage className='' 
                                 src={image}
                                 width={2000}
                                 height={2000}
                                 quality="auto" 
                                 dpr="auto" 
                                 loading="lazy"
                                 crop={'fill'}
                                 alt='Husbilder'/>
                                 </div>
                             ))}</div>
                             </div>
 
     
             <div className='grid grid-cols-2 mt-5 px-5 max-md:grid-cols-1 max-md:gap-3 max-md:px-5'>
                 <div className='flex flex-col text-lg bg-customGreen text-customWhite 
                 rounded-lg gap-2 justify-center items-center'>
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
                <div>
                    <div className='text-center my-5'>
                        <span className='text-lg '>Tillgängliga datum</span>
                    </div>
                    <div className='grid grid-cols-3 text-center bg-customGray p-5 mx-5 rounded-lg mt-5
                    text-customWhite font-semibold text-lg max-md:grid-cols-2'>{property.available_dates.map((datum,index)=>(
                        <span key={index}>{datum}</span>
                    ))}</div>
                </div>
                     <h3 className='text-center text-xl mt-5'>Beskrivning</h3>    
                 <div className=' mt-5 mx-10 text-white rounded-lg bg-customOrange max-md:mx-5'>
                     <p className='p-5 text-lg'>{property.description}</p>
                 </div>
                 <div>
                     <h4 className='text-xl text-center mt-5'>Hus regler</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center bg-customGreen
                      text-customWhite rounded-lg mx-10 p-5'>{property.house_rules.map((regler,index)=>(
                         <div className='' key={index}>
                             <span>{regler}</span>
                         </div>
                     ))}</div>
                                             <h4 className='text-xl text-center mt-5'>Bekvämligheter</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center bg-customGreen
                      text-customWhite rounded-lg mx-10 p-5'>{property.facilities.map((regler,index)=>(
                         <div className='' key={index}>
                             <span>{regler}</span>
                         </div>
                     ))}</div>
                         <h4 className='text-xl text-center mt-5'>TillgänglighetsAnpassat</h4>
                     <div className='flex flex-col items-center mt-5 text-lg justify-center bg-customGreen
                      text-customWhite rounded-lg mx-10 p-5'>{property.accessibilityFeatures.map((regler,index)=>(
                         <div className='' key={index}>
                             <span>{regler}</span>
                         </div>
                     ))}</div>
                                             <h4 className='text-xl text-center mt-5'>TillgänglighetsAnpassade bilder</h4>
                     <div className='flex flex-wrap gap-5 items-center my-5 pb-5 text-lg justify-center 
                      text-customWhite rounded-lg mx-10'>{property.accessibilityImages.map((image,index)=>(
                         <div className='w-12 h-12' key={index}>
                             <CldImage
                             src={image}
                             width={1200}
                             height={1200}
                             quality="auto" 
                             dpr="auto" 
                             loading="lazy"
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