import { BusIcon, ChevronDown, ChevronUp, Dot, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

type DetailPageModalProps = {
  property:ListingProperty | null
}


export const DetailPageModal = ({property}:DetailPageModalProps) => {

  const [modalPicture, setModalPicture] = useState<boolean>(false)
  const [modalButton, setModalButton] = useState<boolean>(false)

  
  function modalButtonToggler():void{
    setModalButton(prev => !prev)
  }


  function modalPictureToggler():void{
    setModalPicture(prev => !prev)
  }

  return (
    <div>  <div className='absolute bg-black/90 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
    {
     modalPicture &&   
     <X onClick={modalPictureToggler} className='absolute text-white top-2 right-2 size-10 cursor-pointer z-10'/>
    }
  {
         modalPicture && (
         property && (
           property.images.map((image)=>(
            <div className='size-[500px] max-lg:size-[300px] animate-slideDown '>

               <Image className='object-contain w-full h-full'
               src={image}
               width={1200}
               height={1200}
               alt={property.title}
               />

           </div>
           ))
         ) 
         ) 
       }
       </div>

 {
  property && (
   <div className='grid grid-cols-3 gap-3 place-content-center container my-10 max-sm:grid-cols-1 max-lg:px-5 
   max-lg:flex max-lg:justify-center max-lg:gap-0 '>
       <div className='relative border-2 border-customGray col-start-2 col-end-3 row-span-1 container'>
         <Image className='object-cover h-full w-full'
         src={property.images[0]} 
         width={1200} 
         height={1200}
         alt={property.title}/>
         <div>
          { 
              <span onClick={modalPictureToggler} className='absolute top-2 right-2 
                    cursor-pointer bg-customBeige p-2 border border-customGray rounded-lg hidden max-lg:block'>Se mer</span>
          }
         </div>
       </div>
           <div className='size-[200px] border-2 container border-customGray col-start-3 col-end-4 col-span-2
            relative max-lg:w-[100px]  max-lg:bg-customWhite'>
             <Image className='object-cover h-full w-full max-lg:hidden'
             src={property.images[1]}
             width={1200}
             height={1200}
             alt={property.title}
             />
               <span onClick={modalPictureToggler} className='absolute top-2 right-2 
               cursor-pointer bg-customBeige p-2 border border-customGray rounded-lg max-lg:hidden'>Se mer</span>
           
           <div className='flex items-center container justify-between bg-customWhite border border-black rounded-lg mt-5 p-2
           max-lg:flex-col max-lg:border-none '>
               <div className='border-r-2 border-black max-lg:border-none'>

               <span className=''>{property.accessibilityImages?.map((images,index)=>(
                <div key={index}>
                 <Image
                   src={images}
                   width={30}
                   height={30}
                   alt='Special anpassningar'
                   />
                </div>
               ))}</span>
               <span className='flex mt-2 mr-5'><BusIcon/>{property.distanceToNearestBus.slice(0,5)}</span>
               </div>
               <div className='max-lg:p-2 max-lg:border-2 max-lg:border-customGray max-lg:rounded-lg'>
                 <span>{property.price_per_night}kr/natt</span>
               </div>
               <div>
               </div>
           </div>
               <div className='relative container'>

             <button onClick={modalButtonToggler} className='bg-customOrange text-customWhite mt-2 cursor-pointer py-2 container border border-black
             rounded-lg max-lg:hidden hover:opacity-50 transition-opacity'>Visa&nbsp;tillgänglighet</button>
             {
               modalButton ?
               <ChevronUp onClick={modalButtonToggler} className={ `absolute top-5 right-2 cursor-pointer max-lg:hidden`} />
               :
               <ChevronDown onClick={modalButtonToggler} className='absolute top-5 right-2 cursor-pointer max-lg:hidden' />
             }
             {
               modalButton && 
               <div className='absolute top-[3rem] right-0 animate-slideDown 
                 transform -translate-x-0 -transform-y-0 bg-customWhite p-2 w-[300px] rounded-lg border border-customGray'>
                   <div className='flex justify-end p-2'>
                       <X onClick={modalButtonToggler} className='cursor-pointer  border-2 rounded-full border-black'/>      
                   </div>
                 <div className='flex flex-col gap-5'>
                   {property.accessibilityFeatures.map((info,index)=>(
                     <div key={index} className='flex'><Dot /><span>{info}</span></div>
                   ))}</div>
               </div>


             }
               </div>
           </div>
       
   </div>
  ) 
 }  
</div>
  )
}
