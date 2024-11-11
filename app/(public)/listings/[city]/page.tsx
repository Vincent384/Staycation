'use client'
import { Calender } from '@/app/component/Calender'
import { ModalFilter } from '@/app/component/ModalFilter'
import { Navbar } from '@/app/component/Navbar'
import { SearchBar } from '@/app/component/SearchBar'
import { Bed, Bus, CalendarIcon, LoaderCircle, MapPin, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const ListingProperties = () => {

  const { city } = useParams<{city:string | string[]}>()
  const router = useRouter()
  const [listings, setListings] = useState<ListingProperty[] |null>(null)
  const [filteredListings, setFilteredListings] = useState<ListingProperty[] |null>(null)
  const [input, setInput] = useState<string>('')
  const [date, setDate] = React.useState<Date>()
  const [displayResult, setDisplayResult] = useState<ListingProperty | null>(null)
  const [loading, setLoading] = useState(false)
  const checkinDate = '2025-06-05'
  const checkoutDate = '2025-06-08'
  const guests = '2'
  
  useEffect(() => {
    console.log(city)
    async function getData() {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:3000/api/listings')
        
        if (!res.ok) {
          throw new Error('Could not retrieve data')
        }
        
        const data = await res.json()
        
        const properties:ListingProperty[] = data[0].listings || []
    
        if(!properties){
          console.log('Found no listings')
          setLoading(false)
          return
        }

        if (!data) {
          return console.log('No data available')
        }
        setLoading(false)

        const decodedCity = decodeURIComponent(Array.isArray(city) ? city[0] : city).toLowerCase();


        setListings(properties)

        const filteredProperties = properties.filter((property) => 
          property.location.city.toLowerCase() === decodedCity?.toString().toLowerCase()
        )

        console.log(filteredProperties)

        if(filteredProperties.filter((stad) => (stad.location.city === ''))){
          const filterDisricts = properties.filter((property)=>(
            property.location.district.toLowerCase() === decodedCity?.toString().toLocaleLowerCase()
          ))
         return setFilteredListings(filterDisricts)
        }
        
        setFilteredListings(filteredProperties)
        
   
      } catch (error) {
        setLoading(false)
      }
    }

    if(city){
      getData()
    }
  }, [])

  
  function onSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!listings) return

    const findTitle = listings.find((todo:ListingProperty) => {
      return todo.title.toLowerCase() === input.toLowerCase()
    })
    console.log(findTitle)
    setDisplayResult(findTitle as ListingProperty)
  }

  function onSearch(propertyTitle:string) {
    setInput(propertyTitle)
  }

  function navigateOnClick(id:string){
    router.push(`/listings/${city}/property/${id}/${checkinDate}/${checkoutDate}/${guests}`)
  }

  // TODO Göra klart datum/klicka antal gäster funktionen

  return (
    <>
    {
      loading ? (
        <LoaderCircle className='h-screen w-[300px] m-auto spin size-60' />
      ) :
      <div>
      <Navbar/> 
       <SearchBar onSubmit={onSubmit} setInput={setInput} 
       displayResult={displayResult} listings={listings} input={input} onSearch={onSearch}/>

      <div>
        <div className='flex justify-center items-center mt-5'>
          <span className='bg-gray-300 rounded-l-lg p-2 border border-black'>Datum</span>
          <Calender/>
          <span className='bg-gray-300  border border-l-0 border-black p-2'>Antal Gäster</span>
          <div className='flex bg-customGray gap-2 rounded-r-lg border border-l-0 border-black  p-2'>
            <Minus className='bg-black rounded-l-lg text-white' />
            <span className='text-white'>0</span>
            <Plus className='bg-black rounded-r-lg text-white' />
          </div>
        </div>

      </div>

      <ModalFilter/>

<div className='flex justify-center items-center gap-10 flex-wrap mb-10'>
      { 
          filteredListings && filteredListings.map((property) => (
            <main key={property._id} onClick={() => navigateOnClick(property._id)} className='border
             border-customGray rounded-lg w-[300px] cursor-pointer hover:opacity-80 transition-all'>
              <div className=''>
                <div className='flex justify-between items-center p-2 bg-customWhite container rounded-t-lg'>
                  <span className='bg-customBeige border p-1 rounded-md border-b-2 border-customGray'>{property.price_per_night} SEK/NATT</span>
                  <span className=''>{property.title}</span>
                  <span className='bg-customBeige border p-1 rounded-md border-b-2 border-customGray'>5 star</span>
                </div>
              </div>
              <div className='size-[299px] h-[200px]'>
                <Image className='object-cover h-full w-full'
                src={property.images[0]}
                width={1200}
                height={1200}
                alt={property.title}/>
              </div>
              <div className='bg-customWhite flex justify-around gap-5 p-5 border-t-2 rounded-b-lg border-customGray'>
                <div className='flex flex-col gap-5'>
                   <div className='flex gap-3'>
                      <MapPin />
                      <span>{property.location.district}</span>
                   </div>
                    <div className='flex gap-3'>
                      <Bus />
                      <span>{property.distanceToNearestBus}</span>
                    </div>
                </div>
                <div className='flex gap-5'>
                  <div className='flex gap-3'>
                    <Bed />
                    <span className='font-bold'>{property.maximum_guest}</span>
                  </div>
                  <div className='bg-customBlack p-3'>
                    {
                      property?.accessibilityImages.map((image,index)=>(
                        <div key={index} className='w-[30px] bg-white'>
                            <Image src={image} width={300} height={300} alt={property.accessibilityFeatures[0]}/>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
          </main>
            
          ))
        }

        </div>

      </div>
    
    
    }

  </>
  )
}

export default ListingProperties