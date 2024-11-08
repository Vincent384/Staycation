'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/app/component/Navbar'
import { InputForm } from '@/app/component/InputForm'
import { validateRgister } from '@/utils/validateRegister'
import { useRouter } from 'next/navigation'
import { setTimeout } from 'timers/promises'
import { useAuthContext } from '@/context/authContext'
import { CldImage, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { CldUploadWidget,CloudinaryUploadWidgetInfo  } from 'next-cloudinary'
import { Calender } from '@/app/component/Calender'
import { Check, CheckCheckIcon, X } from 'lucide-react'
import { convertMonthAndDay } from '@/utils/monthDayConvert'
import { validateCreate } from '@/utils/validateCreate'


const CreatePage = () => {
  const { setToken,getDataAvatar } = useAuthContext()
  const router = useRouter()

  const [currentRule, setCurrentRule] = useState<string>('')
  const [currentFacilities, setCurrentFacilities] = useState<string>('')
  const [currentAccessibilityFeatures, setcurrentAccessibilityFeatures] = useState<string>('')
  const [isActive, setIsActive] = useState<{[key:number]:boolean}>({})  
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [currentAccessibilityImage, setcurrentAccessibilityImage] = useState<string[] | null>(null)
  const [imageArray, setImageArray] = useState(['https://res.cloudinary.com/drkty7j9v/image/upload/v1729670272/Namnl%C3%B6st-1_koufja.png',
    'https://res.cloudinary.com/drkty7j9v/image/upload/v1730714294/%C3%B6ron_wnmxtf.png','https://res.cloudinary.com/drkty7j9v/image/upload/v1730713492/84529_ix44n3.png'])
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  

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
    accessibilityFeatures: [],
    distanceToNearestBus: '',
    accessibilityImages: [],
  });

  const [error, setError] = useState<CreateListingPropertyErrors>({
    title: '',
    description: '',
    images: '',
    host: '',
    location: {
      adress: '',
      city: '',
      district: ''
    },
    price_per_night: '',
    available_dates: '',
    maximum_guest: '',
    house_rules: '',
    facilities: '',
    accessibilityFeatures: '',
    distanceToNearestBus: '',
    accessibilityImages: '',
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

  useEffect(() => {
    setForm((prev)=>({
      ...prev,
      host:avatar?._id as string
    }))
  }, [avatar])
  


  async function postPropertyForm(form:CreateListingProperty){
      try {
        const res = await fetch('http://localhost:3000/api/property',{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(form)
        }
        )

        
        const data = await res.json()
        console.log(data)
        if(res.status !== 201){          
          setErrorMessage(data.message)
        }else{
          setSuccessMessage(data.message)
                  window.setTimeout(() => {
                    router.push('/dashboard')
                  }, 2000);

        }

      } catch (error) {
        console.log((error as Error).message)
      }
    
  }

  function onClickActive(bild:string,index:number){
    setForm((prev) => ({
      ...prev,
      accessibilityImages: [...prev.accessibilityImages.includes(bild)
        ? prev.accessibilityImages.filter((img) => img !== bild)
        :[...prev.accessibilityImages,bild]
      ],
    }));


    setIsActive((prev) =>({
      ...prev,
      [index]:!prev[index]
    }))
  }

  function submitCreateForm(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setErrorMessage('')
      setError({    title: '',
        description: '',
        images: '',
        host: '',
        location: {
          adress: '',
          city: '',
          district: ''
        },
        price_per_night: '',
        available_dates: '',
        maximum_guest: '',
        house_rules: '',
        facilities: '',
        accessibilityFeatures: '',
        distanceToNearestBus: '',
        accessibilityImages: '',})

        console.log(form)

      if(!validateCreate(form,setError)){
        return setErrorMessage('Fyll i alla fält')
      }
      const pricePerNight = Number(form.price_per_night)
      setForm((prev)=>({
       ...prev,
        price_per_night:pricePerNight
      }))
   postPropertyForm(form)


  }


  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
  
    setForm((prev) => {
      if (name === 'adress' || name === 'city' || name === 'district') {
        return {
          ...prev,
          location: {
            ...prev.location,
            [name]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  }

    function onHandleDay(day:string,year:string,month:string){
      const monthNumber = convertMonthAndDay(month)
      const date = `${year}-${monthNumber}-${day}`
      console.log(date)

      setSelectedDates(prevDates =>
        prevDates.includes(date)
        ? prevDates.filter(d => d !== date)
        :[...prevDates,date]
      )     

      console.log(selectedDates)
      setForm((prev) =>({
        ...prev,
        available_dates:[...prev.available_dates.includes(date) ?
          prev.available_dates.filter((datum) => (datum !== date))
          : [...prev.available_dates,date]
        ]
      }))

    }

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
          setcurrentAccessibilityFeatures('')
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

    function onClickDeleteImage(index:number){
      setForm((prev)=>({
        ...prev,
        images:[...prev.images.filter((bild,i)=> i !== index)]
      }))
      console.log(form.images)
  }

  function onClickDeleteDate(index:number){
    setForm((prev)=>({
      ...prev,
      available_dates:[...prev.available_dates.filter((datum,i)=>(
        i !== index
      ))]
    }))
  }

  return (
    <div>
        <Navbar/>
        <form onSubmit={submitCreateForm} className='flex flex-col justify-center items-center m-10 border-2 border-customGray  p-10 bg-customWhite'>
            <h1 className='py-2 px-[100px]  bg-customLightGreen text-customWhite text-2xl 
            rounded-lg font-semibold max-sm:px-[2rem]'>Skapa&nbsp;en&nbsp;annons</h1>
            <InputForm nameText={'title'} typeText='text' placeHolder='Fina villan' 
            labelText='Titel' onChangeInput={onChangeHandler} valueText={form.title} errorText={error.title}/>
            <InputForm nameText={'description'} typeText='text' placeHolder='Mitt hus ligger nära...'
             labelText='Beskrivning' onChangeInput={onChangeHandler} valueText={form.description} errorText={error.description}/>
            <div className='flex justify-center items-center flex-col'>
        <CldUploadWidget 
          signatureEndpoint='/api/sign-image'
          options={{ sources: ['local', 'camera', 'google_drive'] }}
          onSuccess={(result) => {
            if (result && 'info' in result) {
              const info = result.info as CloudinaryUploadWidgetInfo
              if (info && info.secure_url) {
                const url = info.secure_url
                setForm((prev) => {
                  const updatedImages = [...prev.images, url]
                  return { ...prev, images: updatedImages }
                })
              } else {
                console.error('Info saknar secure_url:', info)
              }
            } else {
              console.error('Resultat saknar info:', result)
            }
          }}
        >
                    {({ open }) => {
                      return (
                        <button type='button' className='py-4 px-4 container bg-customGreen text-customWhite font-bold mt-10 rounded-lg' onClick={() => open()}>
                          Ladda&nbsp;upp&nbsp;bilder
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                    </div>
                  <div className='flex mt-5 gap-5'>
                  {
                form && form.images.length > 0 && form.images.some(image => image !== '') ? (
                  form.images.map((image, index) =>
                        (
                          <div className='relative' key={index}>
                        <X className='absolute top-1 right-1 cursor-pointer hover:text-red-600' onClick={() => onClickDeleteImage(index)}/>
                        <CldImage
                          src={image}
                          width={100}
                          height={100}
                          crop={'fill'}
                          alt='Hus-bild'
                        />
                      </div>
                    ) 
                  )) : (
    <div className='flex flex-col justify-center items-center w-[100px] h-[100px] border-4 border-customGray'>
      <div>
        <span className=''>Husbilder</span>
      </div>
    </div>
    
  )
}   
        </div>
      <div className='mt-5'>
      { 

        error.images && <span className='text-red-700 text-lg'>{error.images}</span>
      }       
      </div>
            <InputForm nameText={'adress'} typeText='text' placeHolder='Bovägen 123' 
            labelText='Adress' 
            onChangeInput={onChangeHandler} 
            valueText={form.location.adress} 
            errorText={error.location.adress}
            changeInputSize={true}/>
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
            typeText='number' placeHolder='500' 
            labelText='Pris per natt' 
            onChangeInput={onChangeHandler} 
            valueText={form.price_per_night as string} 
            errorText={error.price_per_night as string} 
            changeInputSize={true} />
            <InputForm nameText={'maximum_guest'} 
            typeText='text' placeHolder='4' 
            labelText='Max antal gäster' 
            onChangeInput={onChangeHandler} 
            valueText={form.maximum_guest} 
            errorText={error.maximum_guest}
            changeInputSize={true} />
    
            <label className='text-center mt-5 text-lg '>Dagar huset är tillgängligt</label>
            <div className='my-5'>
                <Calender onHandleDay={onHandleDay} selectedDates={selectedDates}/>
                {
                  error && <span className='text-lg text-red-700'>{error.available_dates}</span>
                }
            </div>
            <div className='grid grid-cols-3 gap-3 max-md:grid-cols-1'>
                  {
                  form && form.available_dates.map((datum,index)=>(
                    
                      <div key={index} className='bg-customOrange relative px-8 py-2 rounded-lg 
                      text-lg font-semibold'><span className='text-customWhite'>{datum}</span>
                      <X onClick={() => onClickDeleteDate(index)} className='absolute top-1 right-1 cursor-pointer hover:text-red-400'/>
                      </div>
                    
                  ))
                  }
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
      <h3 className='text-center text-lg m-5'>Tryck på ikonerna, som rullstolssymbolen,</h3>
      <h3 className='text-center text-lg '>för att välja tillgänglighetsanpassningar som rullstolsanpassning.</h3>
      <div className='grid grid-cols-3 mt-10'>
        {
          imageArray && imageArray.map((bild,index)=>(
            <div key={index} onClick={() => onClickActive(bild,index)} className={`relative w-12 h-12 border-2 cursor-pointer 
            hover:opacity-50 mr-5 transition-opacity'`}>
             <CldImage 
             src={bild}
             width={1200}
             height={1200}
             className={`${isActive[index] ? 'border-black opacity-50' : ''}`}
             alt='TillgänglighetsAnpassade ikoner'/>
             {
              isActive[index] ? 
              <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12'>
                <Check className='text-customGreen w-full h-full'/></span> : ''
             }
           </div>
          ))

        }


      </div>

             <InputForm nameText={'distanceToNearestBus'} 
            typeText='text' placeHolder='100 m' 
            labelText='Avstånd till buss' 
            onChangeInput={onChangeHandler} 
            valueText={form.distanceToNearestBus} 
            errorText={error.distanceToNearestBus}
            changeInputSize={true} />
            
            <button className='py-2 px-10 bg-customOrange text-customWhite rounded-lg 
            text-2xl font-semibold mt-10 mb-5 hover:bg-customOrange/80 transition-all'>Skapa&nbsp;Annons</button>
              {
                successMessage &&
                <p className='bg-emerald-600 mt-5 py-2 px-6 text-customWhite font-bold'>{successMessage}</p>
              }
              <div className={``}>
                      {
                        errorMessage &&
                      <p className='bg-red-600 mt-5 py-2 px-6 text-customWhite font-bold'>{errorMessage}</p>
                      }
                  </div>
        </form>
    </div>
  )
}
export default CreatePage