import React from 'react'

type InputProps={
    typeText:string,
    placeHolder:string,
    labelText:string,
    nameText:string
    onChangeInput:(e:React.ChangeEvent<HTMLInputElement>) => (void),
    valueText:string,
    errorText:string,
}

export const InputForm = ({typeText,placeHolder,labelText,nameText,onChangeInput,valueText,errorText}:InputProps) => {
  return (
    <div className='flex flex-col'>
        <label className='text-center mt-5 text-lg mb-5' >{labelText}</label>
        <input className='bg-customBeige w-[500px] p-3 border border-customGray max-md:pr-[200px] max-sm:w-[250px] 
        max-sm:p-1' 
        name={nameText} 
        type={typeText} 
        placeholder={placeHolder} 
        value={valueText} 
        onChange={(e)=> onChangeInput(e)}/>
        <p className='text-red-700 text-lg'>{errorText}</p>
    </div>
  )
}
