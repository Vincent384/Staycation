import React from 'react'

type InputProps={
    typeText:string,
    placeHolder:string,
    labelText:string,
    nameText:string
}

export const InputForm = ({typeText,placeHolder,labelText,nameText}:InputProps) => {
  return (
    <div className='flex flex-col'>
        <label className='text-center mt-5 text-lg mb-5' >{labelText}</label>
        <input className='bg-customBeige pr-[300px] p-3 border border-customGray' name={nameText} type={typeText} placeholder={placeHolder}/>
    </div>
  )
}
