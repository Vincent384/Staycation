import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div>
        <Navbar/>
        <form className='flex flex-col justify-center items-center m-10 border-2 border-customGray  p-10 bg-customWhite'>
            <h1 className='py-2 px-[100px] bg-customLightGreen text-customWhite text-2xl rounded-lg font-semibold
            max-sm:px-[4rem]'>Logga&nbsp;in</h1>
            <InputForm nameText={'email'} typeText='email' placeHolder='E-postadress...' labelText='E-postadress'/>
            <InputForm nameText={'password'} typeText='password' placeHolder='Lösenord...' labelText='Lösenord'/>
            <div className='mt-10 '>
                <input className='mx-5 h-4 w-4 text-customBeige border-2 cursor-pointer' type="checkbox" />
                <span>Håll mig inloggad</span>
            </div>
            <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg
             text-2xl font-semibold mt-10 mb-5 hover:bg-customOrange/80 transition-all'>Logga in</button>
            <Link className='text-customBlue my-2' href={'/register'}>Inget&nbsp;konto?&nbsp;Registrera&nbsp;här</Link>
            <Link className='text-customBlue my-2' href={''}>Glömt lösenord?</Link>
        </form>
    </div>
  )
}

export default Login