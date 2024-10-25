import React from 'react'

type SideShopBarProps = {
checkinDate:string,
checkoutDate:string,
guests:string,
property:ListingProperty | null,
resultDay:number | null,
resultOfPrice:number | null
}

export const SideShopBar = ({checkinDate,checkoutDate,guests,property,resultDay,resultOfPrice}:SideShopBarProps) => {
  return (
    <div className='bg-gray-300 fixed h-screen w-[250px] right-0 max-lg:hidden'>
    <div className='bg-customWhite m-3 p-2 rounded-lg'>
       <div className='flex flex-col items-center border-2 border-customGray rounded-lg'>
           <span>Checkin: {checkinDate}</span>
           <span>CheckOut: {checkoutDate}</span>
           <span>Antal Gäster: {guests}</span>
       </div>
       <div className='border-2 border-customGray p-2 text-center rounded-lg mt-10'>
           <h4 className='mb-5 border-b-2 border-customGray font-semibold text-lg'>Bokningsdetaljer</h4>
           {
             property &&
             <div>
                 <title className='mb-2'>{property.title}</title>
                 <span className=''>{resultDay} x {property.price_per_night}kr</span>
             </div>
           }
           <div>
             <h4 className='mt-10 border-b-2 border-customGray text-lg font-semibold'>Pris</h4>
             {
               resultOfPrice && 
               <div className='flex justify-around mt-3 items-center'>
                 <span>Bokning:</span>
                 <span>{resultOfPrice} :-</span>
               </div>
             }
           </div>
           <button className='bg-customOrange container mt-10 py-2 text-customWhite 
           font-semibold rounded-lg cursor-pointer hover:opacity-80 transition-all'>Reservera</button>
       </div>
    </div>
 </div>
  )
}
