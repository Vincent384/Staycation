'use client';

import { Navbar } from '@/app/component/Navbar';
import dynamic from 'next/dynamic';

const Player = dynamic(() =>
  import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

const OrderConfirmed = () => {
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
          <h1 className='text-2xl'>Reservation placerad!</h1>
      </div>
      <p className='text-xl'>Kvitto har skickats till din mejl</p>
    
    </div>
          </>
  );
};

export default OrderConfirmed;
