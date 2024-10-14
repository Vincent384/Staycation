'use client'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'




const Page = () => {
  const [listings, setListings] = useState<Listing[] |null>(null)
  const [input, setInput] = useState('')
  const [displayResult, setDisplayResult] = useState<Listing | null>(null)
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

    const findTitle = listings.find((todo:Listing) => {
      return todo.title.toLowerCase() === input.toLowerCase()
    })
    console.log(findTitle)
    setDisplayResult(findTitle as Listing)
  }

  function onSearch(propertyTitle:string) {
    setInput(propertyTitle)
  }

  return (
    <>
      {
        loading ? (
          <LoaderCircle className='h-screen w-[300px] m-auto spin size-60' />
        ) : (
          <div className='w-[400px] m-auto mt-10 bg-purple-300 p-10'>
            <h1 className='text-center mb-5 text-2xl'>Sök efter bostäder</h1>
            <form onSubmit={onSubmit}>
              <input
                name='input'
                value={input}
                onChange={e => setInput(e.target.value)}
                className='p-1 border'
                type='text'
                autoComplete='off'
              />
              <button className='py-2 px-5 bg-slate-400 text-white rounded-md ml-3'>Sök</button>
              <>
                {
                  listings && listings.filter((property) => {
                    const searchTerm = input.toLowerCase()
                    const title = property.title.toLowerCase()

                    return searchTerm && title.includes(searchTerm) && title !== searchTerm
                  }).map((property) => (
                    <div key={property._id} onClick={(e) => onSearch(property.title)} className='bg-white p-5 border border-slate-300 cursor-pointer flex'>
                      <div className='flex flex-col'><span className='' >{property.title}</span> &nbsp;
                      <p>{property.description.slice(0,20)}...</p></div>
                    <div className=''>
                    <Image
                      src={property.images[0]}
                      width={100}
                      height={100}
                      alt={property.title}/>
                    </div>
                    </div>
                  ))
                }
              </>
            </form>
            {displayResult && (
              <div className='mt-3'>
                <p className='text-xl'>{displayResult.title}</p>
                <p>{displayResult.description}</p>
                <div className=''>
                    <Image
                      src={displayResult.images[0]}
                      width={100}
                      height={100}
                      alt={displayResult.title}/>
                    </div>
              </div>
            )}
          </div>
        )
      }
 
    </>
  )
}

export default Page
