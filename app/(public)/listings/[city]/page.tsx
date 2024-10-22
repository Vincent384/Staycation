'use client'
import { Navbar } from '@/app/component/Navbar'
import { SearchBar } from '@/app/component/SearchBar'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ListingProperties = () => {

  const { city } = useParams()

  const [listings, setListings] = useState<ListingProperty[] |null>(null)
  const [filteredListings, setFilteredListings] = useState<ListingProperty[] |null>(null)
  const [input, setInput] = useState<string>('')
  const [displayResult, setDisplayResult] = useState<ListingProperty | null>(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
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


        setListings(properties)
        setListings(properties)

        // Filtrera listor baserat på stadens namn
        const filteredProperties = properties.filter((property) => 
          property.location.city.toLowerCase() === city?.toString().toLowerCase()
        )

        setFilteredListings(filteredProperties)
      } catch (error) {
        setLoading(false)
      }
    }

    if(city){
      getData()
    }
  }, [])


  console.log(listings)
  
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

      <div className='grid grid-cols-2 place-content-center max-w-[700px] mx-auto mt-10'>
     

      { 
          filteredListings && filteredListings.map((property) => (
            <main className='border w-[300px]'>
              <div className=''>
                <div className='flex justify-between items-center p-2 bg-customWhite container'>
                  <span className='bg-customBeige border p-1 rounded-md'>{property.price_per_night} SEK/NATT</span>
                  <span>{property.title}</span>
                  <span className='bg-customBeige border p-1 rounded-md'>5 star</span>
                </div>
              </div>
              <div className='w-[100px]'>
                <Image
                src={property.images[0]}
                width={600}
                height={600}
                alt={property.title}/>
              </div>
              <div>
                <span>{property.distanceToNearestBus}</span>
                <span>{property.location.district}</span>
                <span>{property.maximum_guest}</span>
                <span>{property.distanceToNearestBus}</span>
              </div>
              <div>
                {
                  property?.accessibilityImages.map((image)=>(
                    <span>{image}</span>
                  ))
                }
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