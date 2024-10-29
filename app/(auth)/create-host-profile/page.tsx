'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { useAuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateHost = () => {

  const router = useRouter()

  

  const [form, setForm] = useState<HostData>({
    name:'',
    avatar:''
  })

  const { userId } = useAuthContext()

  const [successMessage, setSuccessMessage] = useState<string>('')

  const [messageError, setMessageError] = useState<string>('')

  function submitLoginForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      
      setMessageError('')

      async function postHostData(){

        const bodyPost = {
          name:form.name,
          avatar:form.avatar
        }

         try {
            const res = await fetch('http://localhost:3000/api/login',{
                method:'POST',
                headers:{
                  'Content-type':'application/json'
                },
                body:JSON.stringify(bodyPost)
            })

            if(res.status !== 200){
              return setMessageError(res.statusText)
            }

            if(res.ok){
              localStorage.setItem('status','Inloggad')
            }

            const data = await res.json()

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
      postHostData()
        
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
            max-sm:px-[4rem]'>Skapa&nbsp;-&nbsp;HostName</h1>
            <InputForm 
            nameText={'name'} 
            typeText='text' 
            placeHolder='Olof100...' 
            labelText='Host-namn'
            valueText={form.name}
            onChangeInput={onChangeHandler}/>
            <InputForm 
            nameText={'password'} 
            typeText='password' 
            placeHolder='Lösenord...' 
            labelText='Lösenord' 
            onChangeInput={onChangeHandler}
            valueText={form.avatar}/>
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
             text-2xl font-semibold mt-10 mb-5 hover:bg-customOrange/80 transition-all'>Skapa</button>
        </form>

    </div>
  )
}

export default CreateHost