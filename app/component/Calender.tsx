'use client'
import { ArrowBigLeft, ArrowBigRight, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'


type CalenderProps = {
  onHandleDay:(day:string,year:string,month:string) => (void)
}

export const Calender = ({onHandleDay}:CalenderProps) => {

  const [toggler, setToggler] = useState(false)
  const [days, setDays] = useState<string[] | null>(null)
  const [displayMonth, setDisplayMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [weekDays, setWeekDays] = useState<string []>(['Mån','Tis','Ons','Tors','Fre','Lör','Sön'])
  const [monthOffset, setMonthOffset] = useState(0)
  
  function onClickHandler(){
    setToggler(prev => !prev)
  }

  function closeCalendar() {
    setToggler(false)
  }

  function displayDays(offset:number){
    let array = []
    const date = new Date()
    date.setMonth(date.getMonth() + offset)
    
    const getYear = date.getFullYear() 
    const getMonth = date.getMonth() 


 

    const months = ['Januari', 'February', 'Mars', 'April', 'Maj', 'Juni', 'Juli',
      'August', 'September', 'Oktober', 'November', 'December']



    const lastDateOfMonth = new Date(getYear, getMonth + 1, 0).getDate()



    for (let index = 1; index <= lastDateOfMonth; index++) {
      array.push(index.toString())
    }

    console.log(months[getMonth])
    setDays(array)
    setDisplayMonth(months[getMonth])
    setYear(getYear.toString())
  }

  function handleMonthChange(change:number){
      setMonthOffset(prevOffset => prevOffset + change)
  }

  useEffect(() => {


    displayDays(monthOffset)
  }, [monthOffset])



  return (
    <div onClick={onClickHandler} className='bg-customGray px-4 py-2 cursor-pointer relative text-white border border-l-0 border-black'>
      <span>2024/06/18</span>
      {
        toggler && 
        <div
          onClick={(e) => e.stopPropagation()} 
          className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-customCalenderGray border text-black border-customGray w-[300px] h-[300px] rounded-xl'
        >
          <div>
            <span 
              className='absolute top-2 right-2 cursor-pointer border-2 border-black rounded-full' 
              onClick={closeCalendar}
            >
              <X />
            </span>
            <span onClick={() => handleMonthChange(-1)}
              className='absolute top-9 left-3 rounded-full hover:bg-customWhite focus:bg-black active:bg-black cursor-pointer'
            >
              <ArrowBigLeft />
            </span>
            <span onClick={() => handleMonthChange(1)}
              className='absolute top-9 right-3 rounded-full hover:bg-customWhite focus:bg-black active:bg-black cursor-pointer'
            >
              <ArrowBigRight />
            </span>
          </div>
          <div className='flex justify-center items-center gap-5 text-xl pt-8 pb-6'>
            <span>{displayMonth}</span>
            <span>{year}</span>
          </div>
          <div className='flex justify-center items-center gap-3 mr-5'>
            {weekDays.map((veckdag, index) => (
              <span key={index}>{veckdag}</span>
            ))}
          </div>
          <div className='grid grid-cols-7 cursor-pointer p-5'>
            {days && days.map((dag, index) => (
              <span onClick={() => onHandleDay(dag,year,displayMonth)} key={index}>{dag}</span>
            ))}
          </div>
        </div>
      }
    </div>
  )
}
