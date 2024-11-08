'use client'
import { InputForm } from '@/app/component/InputForm'
import { Navbar } from '@/app/component/Navbar'
import { useAuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CldImage, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { CldUploadWidget,CloudinaryUploadWidgetInfo  } from 'next-cloudinary'
import { X } from 'lucide-react'

const ChangeProfile = () => {

    const router = useRouter()

    const [form, setForm] = useState<HostData>({
      name:'',
      avatar:''
    })

    const [avatar, setAvatar] = useState<HostDataWithId | null>(null)

    useEffect(() => {

        const getHost = localStorage.getItem('Host')

        if(getHost == null){
            return
        }

    const avatarData = JSON.parse(getHost)
        
    setAvatar(avatarData)

    }, [])
    
  
    const [successMessage, setSuccessMessage] = useState<string>('')
  
    const [messageError, setMessageError] = useState<string>('')
  
    function submitLoginForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setSuccessMessage('')
        setMessageError('')
    
        async function postHostData(){
  
          const bodyPost = {
            avatar:form.avatar,
            hostId:avatar?._id 
          }
          console.log(bodyPost)
          try {
            const res = await fetch('http://localhost:3000/api/host/homes',{
              method:'PUT',
              headers:{
                'Content-type':'application/json'
              },
              body:JSON.stringify(bodyPost)
            })
  
            const data = await res.json()

            if(res.status !== 201){
                return setMessageError(data.message)
            }

                console.log(data.updated)
                
                localStorage.removeItem('Avatar')
                localStorage.removeItem('Host')
                localStorage.setItem('Host',JSON.stringify(data.updated))
                setSuccessMessage(data.message)
                window.setTimeout(() => {
                    router.push('/dashboard')
                  }, 2000);
       
     
            
          } catch (error) {
            console.log((error as Error).message)
          }
           
          }
        postHostData()
          
        }

        function removeImage(){
          setForm((prev) => ({
            ...prev,
            avatar:''
          }))
        }
  

  return (
    <div>
    <Navbar/>
    <form onSubmit={e => submitLoginForm(e)} className='flex flex-col justify-center items-center m-10 border-2 border-customGray  p-10 bg-customWhite'>
        <h1 className='py-2 px-[100px] bg-customLightGreen text-customWhite text-2xl rounded-lg font-semibold
        max-sm:px-[2rem]'>Ändra&nbsp;Profilbild</h1>
    <div>
        {
         avatar && <h2 className='mt-5 text-xl font-semibold'>{avatar.name}</h2>
        }
    </div>


  <div className=''>
    <CldUploadWidget 
      signatureEndpoint='/api/sign-image'
      options={{ sources: ['local', 'camera', 'google_drive'] }}
      onSuccess={(result) => {
        if (result && 'info' in result) {
          const info = result.info as CloudinaryUploadWidgetInfo; 
          if (info && info.secure_url) {
            const url = info.secure_url
            setForm((prev) => ({ ...prev, avatar: url }))
          } else {
            console.error('Info saknar secure_url:', info);
          }
        } else {
          console.error('Resultat saknar info:', result);
        }
      }}
    >
                {({ open }) => {
                  return (
                    <button type='button' className='py-4 px-4 bg-customGreen text-customWhite font-bold mt-10 rounded-lg' onClick={() => open()}>
                      Ladda upp en bild på dig
                    </button>
                  );
                }}
              </CldUploadWidget>
              <div className='flex justify-center items-center mt-6'>
                {
                  form.avatar !== '' ? 
                  <div className='relative'>
                  <X className='absolute top-1 right-1 cursor-pointer hover:text-red-600' onClick={removeImage}/>
                  <CldImage
                  src={form.avatar}
                  width={100}
                  height={100}
                  crop={'fill'}
                  alt='Profil-bild'
                  />
                    </div>
                   : <div className='flex justify-center items-center w-[100px] h-[100px] border-4 border-customGray'>
                      <span className=''>ProfilBild</span>
                  </div>
                }
              </div>
    </div>
        <div>
          {
            successMessage && 
            <p className='bg-emerald-600 mt-5 py-2 px-6 text-customWhite font-bold'>{successMessage}</p>
          }
        </div>
        <div>
        {
            messageError && 
            <p className='bg-red-600 mt-5 py-2 px-6 text-customWhite font-bold'>{messageError}</p>
          }
        </div>
        <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg
         text-2xl font-semibold mt-10 mb-5 hover:bg-customOrange/80 transition-all'>Ändra&nbsp;Bild</button>
    </form>

</div>
)
}
  


export default ChangeProfile