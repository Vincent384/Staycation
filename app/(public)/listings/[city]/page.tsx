'use client'
import { Calender } from '@/app/component/Calender'
import { ModalFilter } from '@/app/component/ModalFilter'
import { Navbar } from '@/app/component/Navbar'
import { SearchBar } from '@/app/component/SearchBar'
import { convertMonthAndDay } from '@/utils/monthDayConvert'
import { Bed, Bus, CalendarIcon, LoaderCircle, MapPin, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { list } from 'postcss'
import React, { useEffect, useState } from 'react'



const ListingProperties = () => {

  const { city } = useParams<{city:string | string[]}>()
  const router = useRouter()
  const [listings, setListings] = useState<ListingProperty[] |null>(null)
  const [filteredListings, setFilteredListings] = useState<ListingProperty[] |null>(null)
  const [input, setInput] = useState<string>('')
  const [date, setDate] = useState<any>({
    available_dates:[]
  })
  const [displayResult, setDisplayResult] = useState<ListingProperty | null>(null)
  const [loading, setLoading] = useState(false)
  const [howManyGuests, setHowManyGuests] = useState<number>(2)
  const [offSet, setOffSet] = useState<number>(0)
  const [searchResultsCount, setSearchResultsCount] = useState<number>(0)
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const checkinDate = '2025-06-05'
  const checkoutDate = '2025-06-08'
  
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

        const decodedCity = decodeURIComponent(Array.isArray(city) ? city[0] : city).toLowerCase();


        setListings(properties)

        const filteredProperties = properties.filter((property) => {
          const propertyCity = property.location.city.toLowerCase();
          const propertyDistrict = property.location.district.toLowerCase();
  
          if (propertyDistrict.includes(decodedCity)) {
            return propertyDistrict === decodedCity;
          } else {
            return propertyCity === decodedCity;
          }
        });
      
        setFilteredListings(filteredProperties);
   
      } catch (error) {
        setLoading(false)
      }
    }

    if(city){
      getData()
    }
  }, [])


  function navigateOnClick(id:string){
    router.push(`/listings/${city}/property/${id}/${checkinDate}/${checkoutDate}/${howManyGuests}`)
  }

  function onSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if(input.trim() === ''){
      return
    }

    if(!listings) return

  const filtered = listings.filter((prop) => {
    const cityInput = prop.location.city
    const districtInput = prop.location.district

    if(cityInput.includes(input)){
      setInput('')
      return cityInput
    }
    if(districtInput.includes(input)){
      setInput('')
      return districtInput
    }

  })
  let sum = filtered.length

 setSearchResultsCount(sum)
 setFilteredListings(filtered)

  }



  function onChangeSearch(searchTitle:string) {
    setInput(searchTitle)
  }

  function onClickGuestHandler(change:number){
      if(change === -1 && howManyGuests === 0)return
      setOffSet(prev => prev + change)
  }

  useEffect(() => {
  setHowManyGuests(offSet)
  }, [offSet])



  function onFilterHandler(search: string) {
 {

  let filtered = [...listings || []] 
  
      switch (search) {
        case 'low':
       
          filtered = filtered?.sort((a, b) => a.price_per_night - b.price_per_night);
          break;
          
        case 'high':
         
          filtered = filtered?.sort((a, b) => b.price_per_night - a.price_per_night);
          break

      }

      setFilteredListings(filtered)
    }
  }

  function onHandleDay(day:string,year:string,month:string){
    const monthNumber = convertMonthAndDay(month)
    const date = `${year}-${monthNumber}-${day}`
    console.log(date)

    setSelectedDates(prevDates =>
      prevDates.includes(date)
      ? prevDates.filter(d => d !== date)
      :[...prevDates,date]
    )     

    console.log(selectedDates)
    // setDate((prev) =>({
    //   ...prev,
    //   available_dates:[...prev.includes(date) ?
    //     prev.filter((datum) => (datum !== date))
    //     : [...prev,date]
    //   ]
    // }))

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
       displayResult={displayResult} listings={listings} input={input} onChangeSearch={onChangeSearch}/>

      <div className=''>
        <div className='grid grid-cols-5 w-[500px] mx-auto mt-5 text-center max-md:w-[300px]'>
          <span className='bg-gray-300 rounded-l-lg p-2 border border-black'>Datum</span>
              <Calender onHandleDay={onHandleDay} selectedDates={selectedDates} startDate='Start' className='absolute top-16 left-[-50px] z-50 max-sm:left-[150px] max-md:top-[100px]'/>  
            <Calender onHandleDay={onHandleDay} selectedDates={selectedDates} endDate='Slut' className='absolute top-16 left-[150px] max-md:top-[px] z-50'/>

          <span className='bg-gray-300  border border-l-0 border-black p-2'>Antal Gäster</span>
          <div className='flex items-center justify-center bg-customGray gap-2 rounded-r-lg border border-l-0 border-black container'>
            <Minus onClick={() => onClickGuestHandler(-1)} className='bg-black rounded-l-lg cursor-pointer text-white' />
            <span className='text-white'>{howManyGuests}</span>
            <Plus onClick={() => onClickGuestHandler(1)} className='bg-black rounded-r-lg cursor-pointer text-white' />
          </div>
        </div>

      </div>
          <div className='flex justify-around items-center mb-5 mt-3'>
            <span className='text-customWhite'>Antal Träffar: {searchResultsCount}</span>
            <ModalFilter onFilterHandler={onFilterHandler}/>
          </div>
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