'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { useAuthContext } from '@/context/authContext'
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

  const { getDataAvatar } = useAuthContext()

  const [successMessage, setSuccessMessage] = useState<string>('')

  const [error, setError] = useState<LoginForm>({
    email:'',
    password:''
  })

  const [messageError, setMessageError] = useState<string>('')

  function submitLoginForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      
      setError({email:'',password:''})
      setMessageError('')
      

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

            
            if(res.ok){
              localStorage.setItem('status','Inloggad')
            }
            
            const data = await res.json()
            
            if(res.status !== 200){
              return setMessageError(data.message)
            }

            getDataAvatar(data.responseData.id)
            
            setSuccessMessage(data.message)
              
          
            try {
              console.log('Navigeras vidare')
              router.push('/dashboard')
            } catch (error) {
              console.log('navigeras inte')
            }

            
          } catch (error) {
            console.log((error as Error).message)
          }
        }
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
            <div className={``}>
                {
                  messageError &&
                <p className='bg-red-600 mt-5 py-2 px-6 text-customWhite font-bold'>{messageError}</p>
                }
            </div>
            <div>
              {
                successMessage && 
                <p className='bg-emerald-600 mt-5 py-2 px-6 text-customWhite font-bold'>{successMessage}</p>
              }
            </div>
            <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg
             text-2xl font-semibold mt-10 mb-5 hover:opacity-50 transition-opacity'>Logga in</button>
            <Link className='text-customBlue my-2' href={'/register'}>Inget&nbsp;konto?&nbsp;Registrera&nbsp;här</Link>
            <Link className='text-customBlue my-2' href={''}>Glömt lösenord?</Link>
        </form>
    </div>
  )
}

export default Login