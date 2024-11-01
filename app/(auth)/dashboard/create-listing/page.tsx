'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/app/component/Navbar'
import { InputForm } from '@/app/component/InputForm'
import { validateRgister } from '@/types/validateRegister'
import { useRouter } from 'next/navigation'
import { setTimeout } from 'timers/promises'
import { useAuthContext } from '@/context/authContext'
import { CldImage, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { CldUploadWidget,CloudinaryUploadWidgetInfo  } from 'next-cloudinary'
import { Calender } from '@/app/component/Calender'


const CreatePage = () => {
  const { setToken,getDataAvatar } = useAuthContext()
  const router = useRouter()

  const [form, setForm] = useState<CreateListingProperty>({
    title: '',
    description: '',
    images: [],
    host: '',
    location: {
      adress: '',
      city: '',
      district: ''
    },
    price_per_night: 0,
    available_dates: [],
    maximum_guest: 0,
    house_rules: [],
    facilities: [],
    listingId: '',
    accessibilityFeatures: [],
    distanceToNearestBus: '',
    accessibilityImages: [],
  });

  const [error, setError] = useState<CreateListingProperty>({
    title: '',
    description: '',
    images: [],
    host: '',
    location: {
      adress: '',
      city: '',
      district: ''
    },
    price_per_night: 0,
    available_dates: [],
    maximum_guest: 0,
    house_rules: [],
    facilities: [],
    listingId: '',
    accessibilityFeatures: [],
    distanceToNearestBus: '',
    accessibilityImages: [],
  })
  const [messageError, setMessageError] = useState<string>('')

  const [successMessage, setSuccessMessage] = useState('')


  async function postPropertyForm(){
    
  }



  function submitRegisterForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      // setError({firstName:'', lastName:'', phone:'', email:'',password:''})
      // setMessageError('')

      // if(!validateRgister(form,setError)){
      //   return 
      // }


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
            rounded-lg font-semibold max-sm:px-[2rem]'>Skapa&nbsp;en&nbsp;annons</h1>
            <InputForm nameText={'title'} typeText='text' placeHolder='Fina villan' 
            labelText='Titel' onChangeInput={onChangeHandler} valueText={form.title} errorText={error.title}/>
            <InputForm nameText={'description'} typeText='text' placeHolder='Mitt hus ligger nära...'
             labelText='Beskrivning' onChangeInput={onChangeHandler} valueText={form.description} errorText={error.description}/>
            <div className=''>
        <CldUploadWidget 
          signatureEndpoint='/api/sign-image'
          options={{ sources: ['local', 'camera', 'google_drive'] }}
          onSuccess={(result) => {
            if (result && 'info' in result) {
              const info = result.info as CloudinaryUploadWidgetInfo; 
              if (info && info.secure_url) {
                const url = info.secure_url
                setForm((prev) => ({ ...prev, images: [url] }))
                console.log(url)
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
                          Ladda&nbsp;upp&nbsp;bilder
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  <div className='flex justify-center items-center mt-6'>
                  {
                form && form.images.length > 0 && form.images.some(image => image !== '') ? (
                  form.images.map((image, index) =>
                    image !== '' ? (
                      <div key={index}>
                        <CldImage
                          src={image}
                          width={100}
                          height={100}
                          crop={'fill'}
                          alt='Profil-bild'
                        />
                      </div>
                    ) : null
                  )) : (
    <div className='flex justify-center items-center w-[100px] h-[100px] border-4 border-customGray'>
      <span className=''>ProfilBild</span>
    </div>
  )
}          
                  </div>
        </div>
            <InputForm nameText={'adress'} typeText='text' placeHolder='Bovägen 123' 
            labelText='Adress' onChangeInput={onChangeHandler} valueText={form.location.adress} errorText={error.location.adress}/>
            <InputForm nameText={'city'} typeText='text' placeHolder='Stockholm' 
            labelText='Stad' onChangeInput={onChangeHandler} valueText={form.location.city} errorText={error.location.city}/>
            <InputForm nameText={'district'} typeText='text' placeHolder='Täby' 
            labelText='Kommun' onChangeInput={onChangeHandler} valueText={form.location.district} errorText={error.location.district} />
            <label>Pris&nbsp;per&nbsp;natt</label>
            <input type="number" value={form.price_per_night} onChange={onChangeHandler} />
            <InputForm nameText={'password'} typeText='password' placeHolder='Lösenord...' 
            labelText='Lösenord' onChangeInput={onChangeHandler} valueText={form.location.district} errorText={error.location.district} />
            <Calender/>  

            <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg 
            text-2xl font-semibold mt-10 mb-5 hover:bg-customOrange/80 transition-all'>Skapa&nbsp;Annons</button>

        </form>
        <p>{successMessage}</p>
        <div className={``}>
                {
                  messageError &&
                <p className='bg-red-600 mt-5 py-2 px-6 text-customWhite font-bold'>{messageError}</p>
                }
            </div>
    </div>
  )
}
export default CreatePage