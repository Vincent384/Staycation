import { ChevronDown, ChevronUp, X } from 'lucide-react'
import React, { useState } from 'react'

type ModalFilterProps = {
  onFilterHandler:(text:string,) => void 
}

export const ModalFilter = ({onFilterHandler}:ModalFilterProps) => {

    const [buttonModal, setButtonModal] = useState<boolean>(true)

    function buttonToggler():void{
        setButtonModal((prev => !prev))
      }
    
  
    return (
    <div className=''>
    {
buttonModal ? (
<div className='relative inline-block'>
  <button onClick={buttonToggler} className='bg-customOrange border-2 text-lg  border-black text-customWhite py-2 px-10 rounded-lg hover:opacity-50 transition-opacity'>
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

    <div className={`relative z-20 animate-slideDown`}>
      <div className='absolute top-[145px] left-1/2 transform -translate-x-1/2
            -translate-y-1/2 
            bg-customBeige py-5 px-5 rounded-lg mt-3 border-2 border-customGray ease-ease-in-out max-lg:left-1/3'>
        
        <div className='flex justify-between gap-10'>
          <span className='mb-3'>Sortera Efter:</span>

          <X className='cursor-pointer border-2 rounded-full border-black' onClick={buttonToggler} />
        </div>

        <form className='flex flex-col gap-3'>
          <div className='flex'>
            <input name='lowPrice' onClick={() => onFilterHandler('low')} className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Lägst pris</label>
          </div>
          <div className='flex'>
            <input onClick={() => onFilterHandler('high')} className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Högst pris</label>
          </div>
          <span>Special anpassning:</span>
          <div className='flex items-center'>
            <input onClick={() => onFilterHandler('wheel')} className='cursor-pointer' type="checkbox" />
            <label className='ml-3'>Rullstolsanpassat</label>
          </div>
          <div className='flex'>
            <input onClick={() => onFilterHandler('synskadad')} className='cursor-pointer' type="checkbox" />
            <label  className='ml-3'>Synskadeanpassat</label>
          </div>
          <div className='flex'>
            <input onClick={() => onFilterHandler('hearing')} className='cursor-pointer' type="checkbox" />
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
