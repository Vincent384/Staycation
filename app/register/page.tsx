import React from 'react'
import { Navbar } from '../component/Navbar'
import { InputForm } from '../component/InputForm'
import Link from 'next/link'

const Register = () => {
  return (
    <div>
        <Navbar/>
        <form className='flex flex-col justify-center items-center m-10 border-2 border-customGray  p-10 bg-customWhite'>
            <h1 className='py-2 px-[100px] bg-customLightGreen text-customWhite text-2xl rounded-lg font-semibold'>Registrera</h1>
            <InputForm nameText={'firstName'} typeText='text' placeHolder='Förnamn...' labelText='Förnamn'/>
            <InputForm nameText={'lastName'} typeText='text' placeHolder='Efternamn...' labelText='Efternamn'/>
            <InputForm nameText={'email'} typeText='email' placeHolder='E-postadress...' labelText='E-postadress'/>
            <InputForm nameText={'password'} typeText='password' placeHolder='Lösenord...' labelText='Lösenord'/>
                <h2 className='text-center mt-10 text-lg'>Födelsedatum</h2>
            <div className='grid grid-cols-3 mt-10 gap-5 mb-5 '>
                <input type='text' placeholder='2024' className='py-3 text-center bg-customBeige border border-customGray'></input>
                <input type='text' placeholder='05' className=' text-center bg-customBeige border border-customGray'></input>
                <input type='text' placeholder='12' className=' text-center bg-customBeige border border-customGray'></input>
            </div>
            <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg 
            text-2xl font-semibold mt-10 mb-5 hover:bg-customOrange/80 transition-all'>Registrera</button>
            <Link className='text-customBlue my-2' href={'/login'}>Har du redan ett konto? Logga in här</Link>
        </form>
    </div>
  )
}

export default Register