'use client';

import { Navbar } from '@/app/component/Navbar';
import { CldImage } from 'next-cloudinary';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Player = dynamic(() =>
  import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);



const OrderConfirmed = () => {
    const [property, setProperty] = useState<ListingPropertyWithHost | null>(null)

const searchParams = useSearchParams()
const id = searchParams.get('id') as string  


useEffect(() => {
  async function getProperty(){
    try {
      const res = await fetch(`http://localhost:3000/api/property?id=${id}`);

      if(!res.ok){
        throw new Error('Hittade inte bostaden');
      }

      const data: ListingPropertyWithHost = await res.json();
      console.log(data);
      setProperty(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if(id) {
    console.log('Fetching property with id:', id);
    getProperty();
  }
}, [id]);
  return (
    <>
    <Navbar/>
    <div className="m-auto my-10 max-w-[900px] text-center text-customWhite ">
        
      <div className="flex align-middle items-center justify-center">
        <Player
          loop={false}
          autoplay
          keepLastFrame
          src="https://lottie.host/3c082c05-dd7c-494e-b4ab-da29c83a37b0/BCTObqn1b2.json"
          style={{ height: '200px', width: '200px' }}
          />
          <h1 className='text-2xl font-semibold'>Reservation placerad!</h1>
      </div>
      <p className='text-2xl font-semibold mb-5'>Kvitto har skickats till din mejl</p>
        <div>
        {property && property.images && property.images.length > 0 && (
  <div className="flex m-auto border-2 border-customBlack justify-center w-[300px] h-[300px]">
    <CldImage
      className="w-full h-full"
      src={property.images[0]}
      width={2000}
      height={2000}
      crop={'fill'}
      quality="auto" 
      dpr="auto" 
      loading="lazy"
      alt={property.description}
    />
  </div>
)}
        </div>
    </div>
          </>
  );
};

export default OrderConfirmed;
