'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { validateChangePassword } from '@/utils/validateChangePassword'
import { validateUpdateUser } from '@/utils/validateUpdate'
import {  X } from 'lucide-react'


import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChangeProfile = () => {
  
  const router = useRouter()
  
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalPassword, setModalPassword] = useState<boolean>(false)
  const [checkPassword, setCheckPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [form, setForm] = useState<UpdateUser>({
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    password:'',
    userId:''
  })
  
  const [error, setError] = useState<RegisterForm>({
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    password:'',
  })
  
  useEffect(() => {
    
    
    const userId = localStorage.getItem('User')
    
    if(userId){
      const id = JSON.parse(userId)


  

      getUserProfile(id)
    }
   
  }, [])

  async function getUserProfile(id:string){
    try {
      const res = await fetch(`http://localhost:3000/api/profile?userId=${id}`)

      const data = await res.json()

      setForm(data.userProfile)
      setForm((prev) => ({
        ...prev,
        userId:id
      }))
    } catch (error) {
      console.log(error)
    }
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

    async function onClickHandleDeleteProperty(){

      const bodyRequest = {
          userId:form.userId
      }

          try {
              const res = await fetch('http://localhost:3000/api/user',{
                  method:'DELETE',
                  headers:{
                      'Content-type':'application/json'
                  },
                  body:JSON.stringify(bodyRequest)
              })   

              if(res.status !== 200){
                  throw new Error('Något gick fel')
              }

              const data = await res.json()
              console.log(data)
              if(res.status === 200){
                localStorage.clear()
                setSuccessMessage('Kontot är borta. Du loggas nu ut')
                window.setTimeout(() => {
                  router.push('/')
                }, 2000);
              }

          } catch (error) {
              console.log((error as Error).message)
          }
  }

    async function onSubmitForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setSuccessMessage('')
      setError((prev)=>({
        ...prev,
        password:''
      }))

      if(!validateUpdateUser(form,setError)){
        return console.log('gick inte')
      }

      try {
        const res = await fetch('http://localhost:3000/api/user',{
          method:'PUT',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(form)
        })  

        if(res.status !== 200){
          throw new Error('Något gick fel')
        }
        
        
        const data = await res.json()
        
        if(res.status === 200){
          setSuccessMessage(data.message)
        }

      } catch (error) { 
        console.log((error as Error).message)
      }
    }

    function popupModalWarning(){
      setModal(prev => !prev)
  }

  function onModalPasswordToggler(){
    setModalPassword(prev => !prev)
  }
  
  async function submitNewPassword(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    if(!validateChangePassword({newPassword,checkPassword,setError})){
        return
    }

    const responseBody = {
      password:newPassword,
      userId:form.userId
    }

    try {
        const res = await fetch('http://localhost:3000/api/user/auth',{
          method:'PUT',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(responseBody)
        })

        const data = await res.json()
        console.log(data)
        if(res.status === 200){
          setModalPassword(false)
        }

    } catch (error) {
      console.log((error as Error).message)
    }

  }

  return (
    <div>
        <Navbar/>
        <div className='h-screen flex justify-center items-center '>
            {
              form && 
              <div className='w-[800px] mx-auto bg-customWhite rounded-lg py-5 border-2'>
                          <h1 className='text-2xl font-semibold text-center mt-5'>Profil</h1>
                <div className='flex justify-center items-center max-md:grid grid-cols-1 max-md:p-0'>
                          <form onSubmit={onSubmitForm} className='flex px-10 justify-center items-center flex-col'>
                              <InputForm valueText={form.firstName} onChangeInput={onChangeHandler} typeText='text'
                              errorText={error.firstName} placeHolder='' labelText='Förnamn
                              ' nameText='firstName' changeInputSize/>
                              <InputForm valueText={form.lastName} onChangeInput={onChangeHandler} typeText='text'
                              errorText={error.lastName} placeHolder='' labelText='Efternamn
                              ' nameText='lastName' changeInputSize/>
                              <InputForm valueText={form.phone} onChangeInput={onChangeHandler} typeText='text'
                              errorText={error.phone} placeHolder='' labelText='Telefonnummer
                              ' nameText='phone' changeInputSize/>
                              <InputForm valueText={form.email} onChangeInput={onChangeHandler} typeText='text'
                              errorText={error.email} placeHolder='' labelText='E-postadress
                              ' nameText='email' changeInputSize/>
                              <button className='py-2 px-4 mt-5 bg-customLightGreen text-customWhite font-semibold text-lg
                              rounded-lg hover:opacity-50 transition-opacity'>Spara&nbsp;Ändring</button>   
                          </form>
                          <div>
                          {
                            modal && 
                          
                                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10'>
                                    <div className='relative flex flex-col bg-customBlack p-12 rounded-lg max-md:mx-10'>
                                        <X className='absolute top-2 right-2 size-8 text-customWhite cursor-pointer hover:text-red-700' onClick={popupModalWarning}/>
                                        <span className='text-xl text-customWhite font-semibold '
                                        >Varning! Är du säker på att du vill ta ditt Konto?</span>
                                        <button onClick={onClickHandleDeleteProperty}
                                        className='py-2 px-4 mt-5 bg-red-700 text-customWhite text-lg font-semibold rounded-lg
                                        hover:bg-red-500 transition-all'>Ta bort</button>
                                    </div>
                                </div>
                            
                            }
                            {
                              modalPassword && 
                              <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10'>
                                  <div className='relative bg-customWhite border-2 border-customGray p-12 rounded-lg'>
                                      <X className='absolute top-2 right-2 size-8 text-customBlack cursor-pointer hover:text-red-700' onClick={onModalPasswordToggler}/>
                                      <InputForm valueText={form.password} onChangeInput={e => setNewPassword(e.target.value)} typeText='password'
                                        errorText={error.password} placeHolder='' labelText='Nytt lösenord' nameText='password' changeInputSize/>
                                      <InputForm valueText={checkPassword} onChangeInput={e => setCheckPassword(e.target.value)} typeText='password'
                                        errorText={error.password} placeHolder='' labelText='Repetera lösenord' nameText='checkPassword' changeInputSize/>
                                      <button onClick={submitNewPassword}
                                        className='py-2 px-4 mt-5 bg-customLightGreen container text-customWhite text-lg font-semibold rounded-lg hover:opacity-50 transition-opacity'>Spara</button>
                                  </div>
                              </div>  
                            }
                                  <div className='flex flex-col justify-center items-center gap-5 max-md:mt-5'>
                                      <button onClick={onModalPasswordToggler} className='py-2 px-4 text-customWhite 
                                      font-semibold bg-customGreen text-lg rounded-lg hover:opacity-50 transition-opacity'>Ändra&nbsp;lösenord</button>
                                  <button className='py-2 px-4 bg-red-700 text-customWhite text-lg font-semibold rounded-lg
                                  hover:opacity-50 transition-opacity ' onClick={popupModalWarning}>Radera konto</button>

                                    {
                          successMessage && 
                          <p className='bg-emerald-600 mt-5 py-2 px-6 text-customWhite font-bold'>{successMessage}</p>
                        }
                            </div>
                          </div>
                        </div>
              </div>
            }
        </div>
    </div>
  )
}

export default ChangeProfile