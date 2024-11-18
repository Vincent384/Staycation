import { Navbar } from '@/app/component/Navbar'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import React from 'react'

const Messages = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center'>
            <form className=''>
            <div className='flex justify-center items-center gap-10 h-screen max-md:grid max-md:grid-cols-1 
              max-md:place-content-center max-md:mx-auto max-md:w-[300px] max-md:my-[8rem]'>
                  
                      <div className='w-[800px] h-[400px] bg-customWhite border-2  rounded-lg p-10 max-md:grid grid-cols-1 max-md:p-0'>
                          <h1 className='text-2xl text-center font-semibold border-b-2 border-customGray  max-md:mt-5'>Dina&nbsp;Meddelanden</h1>
                        <div className='flex px-10 justify-center items-center gap-5 flex-col '>
                          <div className='grid grid-cols-2 gap-4 container max-md:grid-cols-1'>
                           
                    </div>
                        </div>
                        <div className='flex flex-col gap-5 px-10 max-md:pb-10'>

                        </div>
                      </div>
              </div>

            </form>
        </div>
    </div>
  )
}

export default Messages