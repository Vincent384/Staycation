'use client'
import { convertMonthAndDay } from '@/utils/monthDayConvert'
import { ArrowBigLeft, ArrowBigRight, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'


type CalenderProps = {
  selectedDates?:string[],
  onHandleDay?:(day:string,year:string,month:string,isStartDate:boolean) => (void)
  className?:string,
  startDate?:string,
  endDate?:string,
  endDateCalender?:(day:string,year:string,month:string) => (void)
  isStartDate?: boolean
  checkinDate?:string,
  checkoutDate?:string,
  toggler:boolean,
  selectedDatesEnd?:string[],
  setToggler:React.Dispatch<React.SetStateAction<boolean>>;
}

export const Calender = ({onHandleDay,selectedDates,className,startDate,endDate,endDateCalender,isStartDate
,checkinDate,checkoutDate,setToggler,toggler,selectedDatesEnd}:CalenderProps) => {

  const [days, setDays] = useState<string[] | null>(null)
  const [displayMonth, setDisplayMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const weekDays:string[] = ['Mån','Tis','Ons','Tors','Fre','Lör','Sön']
  const [monthOffset, setMonthOffset] = useState<number>(0)
  const getdate = new Date()
  const date = getdate.toLocaleDateString('sv-SE')
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


    const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli',
      'Augusti', 'September', 'Oktober', 'November', 'December']


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
    <div onClick={onClickHandler} className={`bg-customGray px-4 py-2 cursor-pointer 
    relative text-white border border-l-0 border-black ${className ? 'border-none bg-transparent' : ''}`}>
      <span>
        {
          startDate || endDate ?  
          <div className='max-md:text-sm'>
            <span>{checkinDate === '' ? startDate : checkinDate}</span> 
            <span>{checkoutDate === '' ? endDate : checkoutDate}</span>
          </div> :
          <span>{date}</span> 
        }
      </span>
      {
        toggler &&
        <div
          onClick={(e) => e.stopPropagation()} 
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-customCalenderGray border text-black border-customGray w-[300px] h-[300px] rounded-xl ${className}`}
        >
          <div>
            <div className='absolute top-1 left-1'>
              {
                startDate && <span className='text-xl font-semibold bg-customCalenderGreen text-customWhite rounded-lg p-1'>StartDatum</span>
              }
            </div>
            <div className='absolute top-1 left-1'>
              {
                endDate && <span className='text-xl font-semibold bg-customCalenderRed text-customWhite rounded-lg p-1'>Slutdatum</span>
              }
            </div>
            <span 
              className='absolute top-2 right-2 cursor-pointer border-2 border-black rounded-full hover:bg-black hover:text-white' 
              onClick={closeCalendar}
            >
              <X className=''/>
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
          {days && days.map((dag, index) => {
                const monthNumber = convertMonthAndDay(displayMonth)
                const date = `${year}-${monthNumber}-${dag}`;
                const isSelectedEnd = selectedDatesEnd?.includes(date)
                const isSelected = selectedDates?.includes(date)
            const isToday = new Date().getDate() === parseInt(dag) && new Date().getMonth() === new Date(parseInt(year), parseInt(displayMonth)).getMonth() && new Date().getFullYear() === parseInt(year);
            const isPastDate = new Date(parseInt(year), new Date().getMonth() + monthOffset, parseInt(dag)) < new Date();
            return (
              <span 
                key={index} 
                onClick={() => {
                  if (isStartDate) {
                    onHandleDay?.(dag, year.toString(), displayMonth.toString(), true);
                  } else {
                    endDateCalender?.(dag, year.toString(), displayMonth.toString());
                  }
                }}
                className={`
                  flex items-center justify-center w-8 h-8 
                  ${isSelected ? 'bg-customCalenderGreen rounded-full text-white' : ''} 
                  ${isSelectedEnd ? 'bg-customCalenderRed rounded-full text-white' : ''} 
                  ${isPastDate ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
                  ${isToday ? 'font-bold underline' : ''}
                  S `}
              >
                {dag}
              </span>
            )
          })}
          </div>
        </div>
      }
    </div>
  )
}
