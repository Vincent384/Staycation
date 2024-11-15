'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/app/component/Navbar'
import { InputForm } from '@/app/component/InputForm'
import { validateRgister } from '@/utils/validateRegister'
import { useRouter } from 'next/navigation'
import { setTimeout } from 'timers/promises'
import { useAuthContext } from '@/context/authContext'

const Register = () => {

  const { getDataAvatar } = useAuthContext()
  const router = useRouter()

  const [form, setForm] = useState<RegisterForm>({
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    password:''
  })

  const [error, setError] = useState<RegisterForm>({
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    password:''
  })
  const [messageError, setMessageError] = useState<string>('')

  const [successMessage, setSuccessMessage] = useState<string>('')

  const bodyPost = {
    firstName:form.firstName,
    lastName:form.lastName,
    phone:form.phone,
    email:form.email,
    password:form.password
  }

  async function postRegisterForm(){
    try {
      const res = await fetch('http://localhost:3000/api/register',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(bodyPost)
      })
      
      const data = await res.json()
      console.log(data)
      if(res.status !== 201){
        console.log(data.message)
        return setMessageError(data.message)
      }
    
   
      localStorage.setItem('User',JSON.stringify(data.responseData._id))
      localStorage.setItem('status','Inloggad')
      

      setSuccessMessage(data.message)


      window.setTimeout(() => {
        router.push('/dashboard/create-host-profile')
      }, 2000);

    } catch (error) {
      console.log((error as Error).message)
    }
  }


  function submitRegisterForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setError({firstName:'', lastName:'', phone:'', email:'',password:''})
      setMessageError('')

      if(!validateRgister(form,setError)){
        return 
      }

      postRegisterForm()

      


  }


  function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
    const {name,value} = e.target
        
    setForm((prev) =>{
            return {
                ...prev,
                [name]:value
            }
        })
    
    }



  return (
    <div>
        <Navbar/>
        <form onSubmit={submitRegisterForm} className='flex flex-col justify-center items-center m-10 border-2 border-customGray  p-10 bg-customWhite'>
            <h1 className='py-2 px-[100px]  bg-customLightGreen text-customWhite text-2xl 
            rounded-lg font-semibold max-sm:px-[4rem]'>Registrera</h1>
            <InputForm nameText={'firstName'} typeText='text' placeHolder='Förnamn...' labelText='Förnamn' onChangeInput={onChangeHandler} valueText={form.firstName} errorText={error.firstName}/>
            <InputForm nameText={'lastName'} typeText='text' placeHolder='Efternamn...' labelText='Efternamn' onChangeInput={onChangeHandler} valueText={form.lastName} errorText={error.lastName}/>
            <InputForm nameText={'phone'} typeText='text' placeHolder='07300000...' labelText='Telefon' onChangeInput={onChangeHandler} valueText={form.phone} errorText={error.phone}/>
            <InputForm nameText={'email'} typeText='text' placeHolder='E-postadress...' labelText='E-postadress' onChangeInput={onChangeHandler} valueText={form.email} errorText={error.email}/>
            <InputForm nameText={'password'} typeText='password' placeHolder='Lösenord...' labelText='Lösenord' onChangeInput={onChangeHandler} valueText={form.password} errorText={error.password} />
            <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg 
            text-2xl font-semibold mt-10 mb-5 hover:opacity-50 transition-opacity'>Registrera</button>
            <Link className='text-customBlue my-2' href={'/login'}>Har du redan ett konto? Logga in här</Link>
        <div className={``}>
                {
                  messageError &&
                <p className='bg-red-600 mt-5 py-2 px-6 text-customWhite font-bold'>{messageError}</p>
                }
        {
          successMessage &&
        <p className='bg-customLightGreen mt-5 py-2 px-6 text-customWhite font-bold'>{successMessage}</p>
        }
            </div>
        </form>
    </div>
  )
}

export default Register