'use client'
import { DetailPageModal } from '@/app/component/DetailPageModal'
import { Navbar } from '@/app/component/Navbar'
import { SideShopBar } from '@/app/component/SideShopBar'
import { calculateDaysBetween } from '@/utils/calculateday'
import { Bus, BusIcon, ChevronDown, ChevronUp, Dot, LoaderCircle, MapPin, Star, X } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailPropertyPage = () => {

  const {id,checkinDate,checkoutDate,guests} = useParams() as {
    id: string;
    checkinDate: string;
    checkoutDate: string;
    guests: string;
  };

  const [property, setProperty] = useState<ListingPropertyWithHost | null>(null)
  const [resultDay, setResultDay] = useState<number | null>(null)
  const [resultOfPrice, setResultOfPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [modalButton, setModalButton] = useState<boolean>(false)

 

  useEffect(() => {
    async function getProperty(){
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/property?id=${id}`)

        if(!res.ok){
          throw new Error('Hittade inte bostaden')
        }

        const data:ListingPropertyWithHost = await res.json()

        const reviewsRes = await fetch(`http://localhost:3000/api/property/review?id=${id}`);
        if (!reviewsRes.ok) throw new Error("Kunde inte hämta recensioner");
        const reviewsData = await reviewsRes.json();

        const reviewsArray = reviewsData.property.reviews
   
        setProperty({...data,reviews:reviewsArray})
        const result = calculateDaysBetween(checkinDate,checkoutDate) 
        setResultDay(result)
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    } 

    if(id){
      getProperty()
      console.log(property)
    }

  }, [id,checkinDate,checkoutDate])
  
  useEffect(() => {
 
      if(property && resultDay != null){
        const price = property?.price_per_night as number 
        console.log(price)
        const calculatePrice = resultDay * price 
        setResultOfPrice(calculatePrice)
    }


  }, [property,resultDay])


  
  
  function modalButtonToggler():void{
    setModalButton(prev => !prev)
  }

console.log(property)

  return (
    <div><Navbar/>
     {
       loading ? (
          <LoaderCircle className='h-screen w-[300px] m-auto spin size-60' />
        ) :
            <main className='relative'>
              <div className='flex justify-center items-center flex-wrap'>
                <DetailPageModal property={property}/>
                <SideShopBar  checkinDate={checkinDate}checkoutDate={checkoutDate} guests={guests} property={property} resultDay={resultDay} resultOfPrice={resultOfPrice}/>
            
              </div>

                {property &&  ( 
                  <div className='flex justify-center items-center'>

                        <div className='my-10 bg-customWhite w-[500px] border-2
                        border-customGray p-5 rounded-lg max-md:w-[300px]'>
                          <div className=''>
                            <div className='flex justify-between'>
                                  <div className='flex'>
                                    <MapPin />
                                    <span>{property.location.district}</span>
                                  </div>
                              <h2>{property.title}</h2>
                            </div>
                            <Link href={''}>
                                <div className='flex items-center gap-3 mt-5'>
                                {
                                  property.hostAvatar === '' ?
                                  <div className='size-10'>
                                      <CldImage className='object-contain'
                                      src={'https://res.cloudinary.com/drkty7j9v/image/upload/v1729774400/profileDefault_hfv9ys.png'}
                                      width={1000}
                                      height={1000}
                                      alt={property.hostName}/>
                                  </div>
                                  :
                                  <div className="relative w-12 h-12 overflow-hidden rounded-full hover:opacity-50 transition-opacity"> 
                                  <CldImage
                                      src={property.hostAvatar} 
                                      height={1200}
                                      width={1200}
                                      alt='Profilbild'
                                      className="absolute top-0 left-0 w-full h-full object-cover" 
                                  />
                              </div>
                                }
                                  <span>{property.hostName}</span>
                                </div>
                            </Link>
                              <p className='mt-5 text-lg'>{property.description}</p>
                          </div>
                      </div>

                    </div>
              )}
                         <div className='relative  flex justify-center mb-10'>
                    <button onClick={modalButtonToggler} className='bg-customOrange
                     text-customWhite mt-2 cursor-pointer py-2 px-10 border border-black
                    rounded-lg hover:opacity-50 transition-opacity'>Vad&nbsp;som&nbsp;ingår</button>
                      {
                        modalButton &&
                        <div className='relative animate-slideDown'>

                        <div className='absolute top-12 right-0  
                          transform -translate-x-0 -transform-y-0 bg-customWhite p-2 w-[300px] rounded-lg border border-customGray'>
                            <div className='flex justify-end p-2'>
                                <X onClick={modalButtonToggler} className='cursor-pointer  border-2 rounded-full border-black'/>      
                            </div>
                          <div className='flex flex-col gap-5'>
                            {property?.facilities.map((info,index)=>(
                              <div key={index} className='flex'><Dot /><span>{info}</span></div>
                            ))}</div>
                        </div>

                            </div> 
  
                      }

                      </div>
                    <div className='flex justify-center my-5'>
                      <div className='bg-customWhite w-[300px] h-[100px] flex justify-center items-center'>
                        Karta
                      </div>
                    </div>

                    <div className='flex justify-center mb-10 '>
                      <button className='bg-customOrange
                     text-customWhite mt-2 cursor-pointer py-2 px-10 border border-black
                    rounded-lg show-button hover:opacity-50 transition-opacity'>Boka</button>
                    </div>

                      <div className='mx-auto mb-10 p-5 rounded-lg border-2 border-customGray bg-customWhite w-[500px] max-md:w-[300px]'>
                          {
                            property &&
                            <div>
                              <h4 className='text-2xl mb-5'>Recensioner</h4>
                              {property.reviews.map((rev,index)=> (
                                <div key={index}>
                                  <div className='flex justify-between items-center'>
                                    {
                                      rev.hostId.avatar === '' ?
                                      <div className='size-10 cursor-pointer'>
                                      <Image className='object-contain'
                                      src={'https://res.cloudinary.com/drkty7j9v/image/upload/v1729774400/profileDefault_hfv9ys.png'}
                                      width={1000}
                                      height={1000}
                                      alt={property.hostName}/>
                                  </div>
                                  :
                                  <Image
                                  src={rev.hostId.avatar}
                                  width={1000}
                                  height={1000}
                                  alt={property.hostName}/>
                                }
                                <span className='cursor-pointer'>{rev.hostId.name}</span>
                                  </div>
                                  <div className='my-5'>
                                    <div className='flex mt-3 gap-1'>
                                    <span className='text-lg font-semibold'>{rev.rating}</span>
                                    <Star/>
                                    </div>
                                  <p>{rev.comment}</p>

                                  </div>
                                </div>
                              ))}
                            </div>
                          }
                      </div>

            </main>

     }
    </div>
  )
}

export default DetailPropertyPage