import { ChevronDown, ChevronUp, X } from 'lucide-react'
import React, { useState } from 'react'


export const ModalFilter = ({}) => {

    const [buttonModal, setButtonModal] = useState<boolean>(true)

    function buttonToggler():void{
        setButtonModal((prev => !prev))
      }
    
  
    return (
      //TODO Göra klart antal träffar
    <div className='flex justify-around items-center mb-5 mt-3'>
    <span className='text-customWhite'>Antal Träffar:2</span>
    {
buttonModal ? (
<div className='relative inline-block'>
  <button onClick={buttonToggler} className='bg-customOrange border-2 text-lg  border-black text-customWhite py-2 px-10 rounded-lg'>
    Filtrera
  </button>
  <ChevronDown onClick={buttonToggler} className='absolute top-2.5 right-2 cursor-pointer' />
</div>
) : (
<div className='relative inline-block'>
  <button onClick={buttonToggler} className='bg-customOrange border-2 text-lg  border-black text-customWhite py-2 px-10 rounded-lg'>
    Filtrera
  </button>
  <ChevronUp onClick={buttonToggler} className={ `absolute top-2.5 right-2 cursor-pointer ${buttonModal? 'transition-all' :''}`} />

    <div className={`relative animate-slideDown`}>
      <div className='absolute top-[145px] left-1/2 transform -translate-x-1/2
            -translate-y-1/2 
            bg-customBeige py-5 px-5 z-10 rounded-lg mt-3 border-2 border-customGray ease-ease-in-out'>
        
        <div className='flex justify-between gap-10'>
          <span className='mb-3'>Sortera Efter:</span>

          <X className='cursor-pointer border-2 rounded-full border-black' onClick={buttonToggler} />
        </div>

        <form className='flex flex-col gap-3'>
          <div className='flex'>
            <input className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Lägst pris</label>
          </div>
          <div className='flex'>
            <input className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Högst pris</label>
          </div>
          <div className='flex'>
            <input className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Senaste hus</label>
          </div>
          <span>Special anpassning:</span>
          <div className='flex items-center'>
            <input className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Rullstolsanpassat</label>
          </div>
          <div className='flex'>
            <input className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Synskadeanpassat</label>
          </div>
          <div className='flex'>
            <input className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Hörselskadadeanpassat</label>
          </div>
        </form>
      </div>
  </div>
</div>
)
}
  </div>
  )
}
