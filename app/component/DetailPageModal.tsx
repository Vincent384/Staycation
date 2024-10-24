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
    <div>  <div className='absolute bg-black/70 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
    {
     modalPicture &&   
     <X onClick={modalPictureToggler} className='absolute text-white top-2 right-2 size-10 cursor-pointer'/>
    }
  {
         modalPicture && (
         property && (
           property.images.map((image)=>(
            <div className='size-[500px]'>

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
   <div className='grid grid-rows-4 grid-cols-3 gap-3 place-content-center container my-10 '>
       <div className='border-2 border-customGray col-start-2 col-end-3 row-span-1 container'>
         <Image className='object-cover h-full w-full'
         src={property.images[0]} 
         width={1200} 
         height={1200}
         alt={property.title}/>
         <div>
         </div>
       </div>
           <div className='size-[200px] border-2 container border-customGray col-start-3 col-end-4 col-span-2 relative'>
             <Image className='object-cover h-full w-full'
             src={property.images[1]}
             width={1200}
             height={1200}
             alt={property.title}
             />
               <span onClick={modalPictureToggler} className='absolute top-2 right-2 
               cursor-pointer bg-customBeige p-2 border border-customGray rounded-lg'>Se mer</span>
           
           <div className='flex items-center container justify-between bg-customWhite border border-black rounded-lg mt-5 p-2'>
               <div className='border-r-2 border-black'>

               <span className=''>{property.accessibilityImages?.map((images)=>(
                 <Image
                   src={images}
                   width={30}
                   height={30}
                   alt='Special anpassningar'
                 />
               ))}</span>
               <span className='flex mt-2 mr-5'><BusIcon/>{property.distanceToNearestBus.slice(0,5)}</span>
               </div>
               <div>
                 <span>{property.price_per_night}kr/natt</span>
               </div>
               <div>
               </div>
           </div>
               <div className='relative container'>

             <button onClick={modalButtonToggler} className='bg-customOrange text-customWhite mt-2 cursor-pointer py-2 container border border-black
             rounded-lg'>Visa&nbsp;tillgänglighet</button>
             {
               modalButton ?
               <ChevronUp onClick={modalButtonToggler} className={ `absolute top-5 right-2 cursor-pointer`} />
               :
               <ChevronDown onClick={modalButtonToggler} className='absolute top-5 right-2 cursor-pointer' />
             }
             {
               modalButton && 
               <div className='absolute top-[3rem] right-0  
                 transform -translate-x-0 -transform-y-0 bg-customWhite p-2 w-[300px] rounded-lg border border-customGray'>
                   <div className='flex justify-end p-2'>
                       <X onClick={modalButtonToggler} className='cursor-pointer  border-2 rounded-full border-black'/>      
                   </div>
                 <div className='flex flex-col gap-5'>
                   {property.accessibilityFeatures.map((info)=>(
                     <div className='flex'><Dot /><span>{info}</span></div>
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
