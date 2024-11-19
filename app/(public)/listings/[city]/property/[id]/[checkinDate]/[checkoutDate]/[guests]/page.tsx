'use client'
import { DetailPageModal } from '@/app/component/DetailPageModal'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { SideShopBar } from '@/app/component/SideShopBar'
import { calculateDaysBetween } from '@/utils/calculateday'
import {  Dot, LoaderCircle, MapPin, Star, X } from 'lucide-react'
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
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [reviewModal, setReviewModal] = useState<boolean>(false)
  const [form, setForm] = useState<UserReview>({
    rating:'',
    comment:'',
    hostId:'',
    propertyId:'',
    hostAvatar:'',
    hostName:''
  })

  const [error, setError] = useState<UserReview>({
    rating:'',
    comment:'',
    hostId:'',
    propertyId:'',
    hostAvatar:'',
    hostName:''
  })

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
  
  console.log(property)

  useEffect(() => {
 
      if(property && resultDay != null){
        const price = property?.price_per_night as number 
        console.log(price)
        const calculatePrice = resultDay * price 
        setResultOfPrice(calculatePrice)
    }


  }, [property,resultDay])


function onSubmitButton(){
 setErrorMessage('')
  if(guests === '0'){
    return setErrorMessage('Du måste ha minst en gäst')
  }

  const url = new URL('http://localhost:3000/checkout')
  url.searchParams.append('id',id)
  url.searchParams.append("checkinDate", checkinDate)
  url.searchParams.append("checkoutDate", checkoutDate)
  url.searchParams.append("guests", guests)

  window.location.href = url.toString()
}

  
  function modalButtonToggler():void{
    setModalButton(prev => !prev)
  }

  function reviewButton(){
    setErrorMessage('')
     const login = localStorage.getItem('status')
    if(!login){
         return setErrorMessage('Du behöver vara inloggad')
     }

    setReviewModal(prev => !prev)

  }

  async function submitReview(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      if(form.rating.trim() === ''){
        return setError((prev) =>({
          ...prev,
          rating:'Du behöver ge ett Betyg'
        }))
      }
      if(form.comment.trim() === ''){
        return setError((prev) =>({
          ...prev,
          rating:'Du behöver skriva en kommentar'
        }))
      }

      const getHost = localStorage.getItem('Host') as string
      const host = JSON.parse(getHost) 
      const requestBody = {
          rating:form.rating,
          comment:form.comment,
          hostId: host._id,
          propertyId:property?._id,
          hostname:host.name,
          hostAvatar:host.avatar
      }

      try {
        const res = await fetch('http://localhost:3000/api/property/review',{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(requestBody)
        })

        const data = await res.json()
        console.log(data)
        const newReview = data.responseData
        console.log(newReview)
        setProperty((prev) => {
          if (prev) {
            return {
              ...prev,
              reviews: [...prev.reviews, newReview]
            };
          } else {
            console.log("Property is null, review cannot be added")
            return null
          }
        })

      } catch (error) {
        console.log((error as Error).message)
      }


  }

  function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
        
    setForm((prev) =>{
            return {
                ...prev,
                [name]:value
            }
        })
    
    }

  return (
    <div><Navbar/>
     {
       loading ? (
          <LoaderCircle className='h-screen w-[300px] m-auto spin size-60' />
        ) :
            <main className='relative'>
              <div className='flex justify-center items-center flex-wrap'>
                <DetailPageModal property={property}/>
                <SideShopBar  checkinDate={checkinDate}checkoutDate={checkoutDate}
                 guests={guests} property={property}
                resultDay={resultDay}
                 resultOfPrice={resultOfPrice} onSubmitButton={onSubmitButton}
                 errorMessage={errorMessage}/>
            
              </div>

                {property &&  ( 
                  <div className='flex justify-center items-center'>

                        <div className='my-10 bg-customWhite w-[500px] border-2
                        border-customGray p-5 rounded-lg max-md:w-[300px] max-lg:m-0'>
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
                                      quality="auto" 
                                      dpr="auto" 
                                      loading="lazy"
                                      alt='Profilbild'
                                      className="absolute top-0 left-0 w-full h-full object-cover" 
                                  />
                              </div>
                                }
                                  <span className='text-lg'>{property.hostName}</span>
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
                        <div className='relative animate-slideDown z-20'>

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

                    <div className='flex justify-center'>
                      <button className='bg-customOrange
                     text-customWhite mt-2 cursor-pointer py-2 px-10 border border-black
                    rounded-lg show-button hover:opacity-50 transition-opacity'>Boka</button>
                    </div>
                      <div className='px-12 mx-10 my-5 lg:hidden'>
                      {errorMessage && <p className='bg-red-600 text-customWhite text-center p-2 font-semibold'>{errorMessage}</p>}
                        </div>
                      <div className='mx-auto mb-10 p-5 rounded-lg border-2 border-customGray bg-customWhite w-[500px] max-md:w-[300px]'>
                          {
                            property &&
                            <div>
                              <div className='flex justify-between items-center relative'>
                                  <h4 className='text-2xl'>Recensioner</h4>
                                  <button className='px-4 py-2 bg-customGreen text-customWhite text-lg rounded-full 
                                  cursor-pointer hover:opacity-50 transition-opacity' onClick={reviewButton}>Lägg&nbsp;till</button>
                                    {
                                    reviewModal && 
                                    <form onSubmit={submitReview}
                                     className='absolute flex justify-center items-center 
                                     flex-col bottom-0 left-0 border-2 border-customBlack bg-customWhite p-10'>
                                      <X onClick={() => setReviewModal(prev => !prev)} className='absolute top-2 right-2 text-black cursor-pointer size-8 border-2 border-black rounded-full
                                      hover:text-red-600'/>
                                      <h3 className='text-2xl'>Hur var din upplevelse på ditt boende?</h3>
                                      <InputForm 
                                        nameText={'rating'} 
                                        typeText='text' 
                                        placeHolder='5' 
                                        labelText='Betyg 1-5'
                                        valueText={form.rating}
                                        errorText={error.rating}
                                        onChangeInput={onChangeHandler}
                                        changeInputSize={true}
                                        />
                                        <InputForm 
                                        nameText={'comment'} 
                                        typeText='text' 
                                        placeHolder='Mycket trevligt...' 
                                        labelText='Kommentar'
                                        valueText={form.comment}
                                        errorText={error.comment}
                                        onChangeInput={onChangeHandler}/>
                                        <button className='px-4 py-2 mt-5 bg-customLightGreen text-customWhite text-lg rounded-full 
                                  cursor-pointer hover:bg-green-600 transition-colors'>Spara recension</button>
                                    </form>
                                  }
                              </div>

                              {property?.reviews?.map((rev,index)=> (
                                <div className='border-2 p-5 mt-5' key={index}>
                                  <div className='flex justify-between gap-3 mb-5 items-center'>
                                       {rev.hostId?.avatar ? (
                                           <>
                                        <div className='flex items-center justify-center gap-3'>
                                         <div className="w-12 h-12 overflow-hidden rounded-full">
                                          <CldImage
                                            src={rev.hostId.avatar}
                                            width={1000}
                                            height={1000}
                                            quality="auto" 
                                            dpr="auto" 
                                            loading="lazy"
                                            alt={"Host Avatar"}
                                            crop="fill"
                                            />
                                        </div>
                                        <span className='text-lg'>{rev.hostId.name}</span>
                                        </div>   
                                        <div className='flex items-center justify-center gap-1'>
                                              <span className='font-semibold text-lg'>{rev.rating}</span>
                                              <Star/>
                                        </div>
                                        </>
                                      ) : (
                                        <div className="size-10 cursor-pointer">
                                          <CldImage
                                            className="object-contain"
                                            src="https://res.cloudinary.com/drkty7j9v/image/upload/v1729774400/profileDefault_hfv9ys.png"
                                            width={1000}
                                            height={1000}
                                            quality="auto" 
                                            dpr="auto" 
                                            loading="lazy"
                                            alt="Default Avatar"
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <p className='text-lg'>{rev.comment}</p>
                                  </div>
                                ))}
                            </div>
                          }
                      </div>
                      {
                    property &&     <div className='flex justify-center items-center'>

                    <div className='mb-10 bg-customWhite w-[500px] border-2
                    border-customGray p-5 rounded-lg max-md:w-[300px] max-lg:m-0'>
                      <div className=''>
                        <div className='text-center mb-5'>
                              <h2 className='text-2xl font-bold text-customBlack'>Husregler</h2>
                              <p className="text-sm text-gray-500">Vänligen läs igenom innan bokning</p>
                        </div>
                  
                
                        <ul className="list-disc list-inside mt-5 text-lg space-y-2">
                          {property.house_rules.map((regler, index) => (
                            <li key={index}>{regler}</li>
                          ))}
                        </ul>
                      </div>
                  </div>
                            
                </div>
                  }    
            </main>

     }
    </div>
  )
}

export default DetailPropertyPage