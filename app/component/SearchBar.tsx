import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type SearchBarProps = {
    listings:ListingProperty[] | null,
    displayResult:ListingProperty | null,
    onSubmit:(e:React.FormEvent<HTMLFormElement>) => (void),
    setInput:(value:string) => void,
    onSearch:(title:string) => (void),
    input:string
}

export const SearchBar:React.FC<SearchBarProps> = ({listings,displayResult,onSubmit,setInput,input,onSearch}) => {
  return (
      <div className='flex justify-center items-center m-auto mt-10 max-md:mt-5'>
        <form onSubmit={onSubmit}>
            <input
              name='input'
              placeholder='Sök...'
              value={input}
              onChange={e => setInput(e.target.value)}
              className='rounded rounded-r-none pr-[10rem] pl-4 py-3 border bg-customWhite border-black '
              type='search'
              autoComplete='off'
            />
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
    <div className='px-4 p-3 border cursor-pointer border-black bg-white'>
      <Search />
    </div>
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
