'use client'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '../component/SearchBar'
import { Navbar } from '../component/Navbar'
import { City } from '../component/City'




const Home = () => {
  const [listings, setListings] = useState<ListingProperty[] |null>(null)
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
        
        const properties = data[0].listings

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
      } catch (error) {
        setLoading(false)
      }
    }
    getData()
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
          <h1 className='text-white text-center text-5xl p-5 mt-5 max-md:text-3xl'>Vart vill du boka?</h1>
         <SearchBar onSubmit={onSubmit} setInput={setInput} 
         displayResult={displayResult} listings={listings} input={input} onSearch={onSearch}/>
        <h2 className='bg-customGreen w-[1000px] rounded-full p-2 text-center text-3xl mx-auto mt-10 text-customWhite max-md:hidden'>Upptäck världen hemifrån – din bästa semester väntar runt hörnet!</h2>
        <City/>
        </div>

      }
 
    </>
  )
}

export default Home
