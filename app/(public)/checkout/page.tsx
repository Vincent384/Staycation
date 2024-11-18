'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { calculateDaysBetween } from '@/utils/calculateday'
import { CldImage } from 'next-cloudinary'
import {  useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Checkout = () => {

    const searchParams = useSearchParams()
    const [property, setProperty] = useState<ListingPropertyWithHost | null>(null)
    const [resultDay, setResultDay] = useState<number | null>(null)
    const [resultOfPrice, setResultOfPrice] = useState<number | null>(null)
    const checkinDate = searchParams.get('checkinDate') as string    
    const checkoutDate = searchParams.get('checkoutDate') as string   
    const guests = searchParams.get('guests') as string 
    const id = searchParams.get('id') as string  

    const [form, setForm] = useState<{name:string,card:string}>({
        name:'',
        card:''
    })

    useEffect(() => {
 
        if(property && resultDay != null){
          const price = property?.price_per_night as number 
          console.log(price)
          const calculatePrice = resultDay * price 
          setResultOfPrice(calculatePrice)
      }
  
  
    }, [property,resultDay])

    useEffect(() => {
        async function getProperty(){
          try {
            const res = await fetch(`http://localhost:3000/api/property?id=${id}`)
    
            if(!res.ok){
              throw new Error('Hittade inte bostaden')
            }
    
            const data:ListingPropertyWithHost = await res.json()
            setProperty(data)
            const result = calculateDaysBetween(checkinDate,checkoutDate) 
            setResultDay(result)
          } catch (error) {
            console.log(error)
          }finally{
          }
        } 
    
        if(id){
            console.log(id)
          getProperty()
        }
    
      }, [id,checkinDate,checkoutDate])
    

      function onSubmitButton(){
           const login = localStorage.getItem('status')
            if(!login){
                return console.log('måste logga in')
            }

            const url = new URL('http://localhost:3000/checkout/confirmation')
            url.searchParams.append('id',id)
          
            window.location.href = url.toString()
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
    <div>
        <Navbar/>
        {    
        property ?
            <div className='flex justify-center items-center '>

            <div className='grid grid-cols-2 gap-5 my-5 w-[800px] text-center max-lg:flex max-lg:flex-col max-lg:p-5'>
                <div>
                    <div>
                        <div className='flex justify-center items-center gap-3 bg-customWhite border-2 p-5'>
                            <div className='w-[50px] bg-customGray rounded-xl'>
                                <CldImage
                                src='https://res.cloudinary.com/drkty7j9v/image/upload/v1731591855/mastercard-og-image_ln2puk.png'
                                width={1200}
                                height={1200}
                                alt='MasterCard'
                                />
                            </div>
                            <div className='w-[50px] bg-customGray rounded-xl'>
                                <CldImage
                                src='https://res.cloudinary.com/drkty7j9v/image/upload/v1731592095/visa_vwqvg4.webp'
                                width={1200}
                                height={1200}
                                alt='Visa'
                                />
                            </div>
                            <div className='w-[50px] bg-customGray rounded-xl'>
                                <CldImage
                                src='https://res.cloudinary.com/drkty7j9v/image/upload/v1731592173/173_o_swish-logo-primary-light-bg-p3_jvrlw6.webp'
                                width={1200}
                                height={1200}
                                alt='Swish'
                                />
                            </div>
                        </div>
                        <div className='bg-customWhite border-2 mt-2 p-7'>
                            <div className=''>
                                <InputForm changeInputSize={true} typeText='text' placeHolder='Olof Jönsson' 
                                labelText='Namn' valueText={form.name} errorText='' nameText='name'
                                onChangeInput={onChangeHandler}/>
                                                        <InputForm changeInputSize={true} typeText='text' placeHolder='1230912123' 
                                labelText='KortNummer' valueText={form.card} errorText='' nameText='card'
                                onChangeInput={onChangeHandler}/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-customWhite'>
                    
                    <div className='bg-customWhite p-2 rounded-lg pt-5'>
                            {
                            checkinDate && checkoutDate && guests &&        
                            <div className='flex flex-col items-center border-2 border-customGray rounded-lg'>
                            <span>Checkin: {checkinDate}</span>
                            <span>CheckOut: {checkoutDate}</span>
                            <span>Antal Gäster: {guests}</span>
                        </div>
                            }
  
                            <div className='border-2 border-customGray p-2 text-center rounded-lg mt-3'>
                                <h4 className='mb-5 border-b-2 border-customGray font-semibold text-lg'>Bokningsdetaljer</h4>
                                {
                                    property &&
                                    <div>
                                        <title className='mb-2'>{property.title}</title>
                                        <span className=''>{resultDay} x {property.price_per_night}kr</span>
                                    </div>
                                }
                                <div>
                                    <h4 className='mt-10 border-b-2 border-customGray text-lg font-semibold'>Pris</h4>
                                    {
                                    resultOfPrice && 
                                    <div className='flex justify-around mt-3 items-center'>
                                        <span>Bokning:</span>
                                        <span>{resultOfPrice} :-</span>
                                    </div>
                                    }
                                </div>
                                <button onClick={onSubmitButton} className='bg-customOrange container mt-10 py-2 text-customWhite 
                                font-semibold rounded-lg cursor-pointer hover:opacity-80 transition-all'>Boka</button>
                            </div>
                            </div>



                </div>
                <div className='col-span-2 border-2 border-customBlack '>
                    <CldImage className='w-full h-[300px] object-cover'
                    src={property.images[0]}
                    height={2000}
                    width={2000}
                    alt='Hus'
                    crop={'fill'}/>
                </div>
            </div>
        </div>
            : 'Laddar'
        }
    </div>
  )
}

export default Checkout