'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { validateLogin } from '@/utils/validateLogin'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {

  const router = useRouter()

  const [form, setForm] = useState<LoginForm>({
    email:'',
    password:''
  })

  const [error, setError] = useState<LoginForm>({
    email:'',
    password:''
  })

  function submitLoginForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()

      if(!validateLogin(form,setError)){
        return console.log('inte korrekt')
      }

      async function logIn(){

        const bodyPost = {
          email:form.email,
          password:form.password
        }

         try {
            const res = await fetch('http://localhost:3000/api/login',{
                method:'POST',
                headers:{
                  'Content-type':'application/json'
                },
                body:JSON.stringify(bodyPost)
            })

            if(res.status === 401){
              return
            }

            const data = await res.json()
            console.log(data)
            if(data.status === 401){
              throw new Error(data.message)
            }

            
          } catch (error) {
            console.log((error as Error).message)
          }
        }
        
      router.push('/dashboard')
      logIn()
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
        <form onSubmit={e => submitLoginForm(e)} className='flex flex-col justify-center items-center m-10 border-2 border-customGray  p-10 bg-customWhite'>
            <h1 className='py-2 px-[100px] bg-customLightGreen text-customWhite text-2xl rounded-lg font-semibold
            max-sm:px-[4rem]'>Logga&nbsp;in</h1>
            <InputForm 
            nameText={'email'} 
            typeText='email' 
            placeHolder='E-postadress...' 
            labelText='E-postadress'
            valueText={form.email}
            errorText={error.email}
            onChangeInput={onChangeHandler}/>
            <InputForm 
            nameText={'password'} 
            typeText='password' 
            placeHolder='Lösenord...' 
            labelText='Lösenord' 
            onChangeInput={onChangeHandler}
            errorText={error.password}
            valueText={form.password}/>
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