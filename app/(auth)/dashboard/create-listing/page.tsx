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
import { X } from 'lucide-react'


const CreatePage = () => {
  const { setToken,getDataAvatar } = useAuthContext()
  const router = useRouter()

  const [currentRule, setCurrentRule] = useState<string>('')
  const [currentFacilities, setCurrentFacilities] = useState<string>('')
  const [currentAccessibilityFeatures, setcurrentAccessibilityFeatures] = useState<string>('')

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
    price_per_night: '',
    available_dates: [],
    maximum_guest: '',
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
    price_per_night: '',
    available_dates: [],
    maximum_guest: '',
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

    function onHandleDay(day:string,year:string,month:string){
      const date = `${year}-${month}-${day}`
      setForm((prev) =>({
        ...prev,
        available_dates:[...prev.available_dates,date]
      }))

    }
    console.log(form.house_rules)

    function onAddRule(){

      if(currentRule.trim()){
          setForm((prev)=>({
            ...prev, 
            house_rules:[...prev.house_rules,currentRule]
          }))
          setCurrentRule('')
      }
    }

    function removeRule(index:number){
      setForm((prev) =>({
        ...prev,
        house_rules:[...prev.house_rules.filter((regel,i)=>(
          i != index
        ))]
      }))
    }

    function onAddFacilities(){

      if(currentFacilities.trim()){
          setForm((prev)=>({
            ...prev, 
            facilities:[...prev.facilities,currentFacilities]
          }))
          setCurrentFacilities('')
      }
    }

    function removeFacilities(index:number){
      setForm((prev) =>({
        ...prev,
        facilities:[...prev.facilities.filter((regel,i)=>(
          i != index
        ))]
      }))
    }

    function onAddAccessibilityFeatures(){

      if(currentAccessibilityFeatures.trim()){
          setForm((prev)=>({
            ...prev, 
            accessibilityFeatures:[...prev.accessibilityFeatures,currentAccessibilityFeatures]
          }))
          setCurrentFacilities('')
      }
    }

    function removeAccessibilityFeatures(index:number){
      setForm((prev) =>({
        ...prev,
        accessibilityFeatures:[...prev.accessibilityFeatures.filter((regel,i)=>(
          i != index
        ))]
      }))
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
            labelText='Adress' 
            onChangeInput={onChangeHandler} 
            valueText={form.location.adress} 
            errorText={error.location.adress}/>
            <InputForm nameText={'city'} 
            typeText='text' placeHolder='Stockholm' 
            labelText='Stad' 
            onChangeInput={onChangeHandler}
             valueText={form.location.city} 
             errorText={error.location.city}
             changeInputSize={true}/>
            <InputForm nameText={'district'} 
            typeText='text' placeHolder='Täby' 
            labelText='Kommun' 
            onChangeInput={onChangeHandler} 
            valueText={form.location.district} 
            errorText={error.location.district} 
            changeInputSize={true}/>
            <InputForm nameText={'price_per_night'} 
            typeText='text' placeHolder='500' 
            labelText='Pris per natt' 
            onChangeInput={onChangeHandler} 
            valueText={form.price_per_night} 
            errorText={error.price_per_night}
            changeInputSize={true} />
    
            <div className='my-5'>
                <Calender onHandleDay={onHandleDay} />  
            </div>
            <label className='text-center mt-5 text-lg mb-5'>Hus regler</label>
            <textarea
          className='bg-customBeige w-[500px] p-3 border border-customGray max-md:pr-[200px] max-sm:w-[250px] max-sm:p-1'
          placeholder='Skriv en regel...'
          value={currentRule}
          onChange={(e) => setCurrentRule(e.target.value)}
        />   <button
        type='button'
        onClick={onAddRule}
        className='py-2 px-4 mt-2 bg-customGreen text-customWhite font-semibold rounded-lg'
      >
        Lägg till
      </button>
      {
        form.house_rules.length > 0 &&
        form.house_rules.map((regler,index)=>(
          <div className='flex gap-5 p-5 bg-customGreen text-customWhite rounded-lg mt-5' key={index}>
            <span>{regler}</span>
            <X onClick={() => removeRule(index)} className='bg-red-600 border-2 rounded-full cursor-pointer hover:bg-red-800'/>
            </div>
        )) 
      }
            <label className='text-center mt-5 text-lg mb-5'>Bekvämligheter</label>
             <textarea
          className='bg-customBeige w-[500px] p-3 border border-customGray max-md:pr-[200px] max-sm:w-[250px] max-sm:p-1'
          placeholder='Hårtork...'
          value={currentFacilities}
          onChange={(e) => setCurrentFacilities(e.target.value)}
        />   <button
        type='button'
        onClick={onAddFacilities}
        className='py-2 px-4 mt-2 bg-customGreen text-customWhite font-semibold rounded-lg'
      >
        Lägg till
      </button>
            {
              
        form.facilities.length > 0 &&
        form.facilities.map((regler,index)=>(
          <div className='flex gap-5 p-5 bg-customLightGreen text-customWhite rounded-lg mt-5' key={index}>
            <span>{regler}</span>
            <X onClick={() => removeFacilities(index)} className='bg-red-600 border-2 rounded-full cursor-pointer hover:bg-red-800'/>
            </div>
        )) 
      }
            <label className='text-center mt-5 text-lg mb-5'>Tillgänglighetsanpassningar</label>
            <textarea
          className='bg-customBeige w-[500px] p-3 border border-customGray max-md:pr-[200px] max-sm:w-[250px] max-sm:p-1'
          placeholder='Ramp till rullstolar...'
          value={currentAccessibilityFeatures}
          onChange={(e) => setcurrentAccessibilityFeatures(e.target.value)}
        />   <button
        type='button'
        onClick={onAddAccessibilityFeatures}
        className='py-2 px-4 mt-2 bg-customGreen text-customWhite font-semibold rounded-lg'
      >
        Lägg till
      </button>
            {
              
        form.accessibilityFeatures.length > 0 &&
        form.accessibilityFeatures.map((regler,index)=>(
          <div className='flex gap-5 p-5 bg-customGray text-customWhite rounded-lg mt-5' key={index}>
            <span>{regler}</span>
            <X onClick={() => removeAccessibilityFeatures(index)} className='bg-red-600 border-2 rounded-full cursor-pointer hover:bg-red-800'/>
            </div>
        )) 
      }
             <InputForm nameText={'price_per_night'} 
            typeText='text' placeHolder='100 m' 
            labelText='Avstånd till buss' 
            onChangeInput={onChangeHandler} 
            valueText={form.distanceToNearestBus} 
            errorText={error.distanceToNearestBus}
            changeInputSize={true} />
            
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