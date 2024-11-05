'use client'
import { Navbar } from '@/app/component/Navbar'
import React, { useEffect, useState } from 'react'

const Homes = () => {


    const [property, setProperty] = useState()
    useEffect(() => {
        
        const host = localStorage.getItem('Host') 
        if(!host){
            return
        }
        const hostObject = JSON.parse(host)
        const id = hostObject._id 
        
            async function getProperty(){
                const res = await fetch(`http://localhost:3000/api/property/homes?id=${id}`)

                const data = await res.json()
                console.log(data)
                if(res.status !== 200){
                    return 
                }
                setProperty(data)
            }
        getProperty()


    }, [])
    

  return (
    <div>
        <Navbar/>
        {
            property && 
            <div>

            </div>
        }
    </div>
  )
}

export default Homes