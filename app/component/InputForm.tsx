import React from 'react';

type InputProps = {
  typeText: string;
  placeHolder: string;
  labelText: string;
  nameText: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueText: string;
  errorText?: string;
  changeInputSize?: boolean;
};

export const InputForm = ({
  typeText,
  placeHolder,
  labelText,
  nameText,
  onChangeInput,
  valueText,
  errorText,
  changeInputSize,
}: InputProps) => {
  return (
    <div className='flex flex-col'>
      <label className='text-center mt-5 text-lg mb-5'>{labelText}</label>
      <div>
        <input
          className={`bg-customBeige ${changeInputSize ? 'w-[250px] p-3' : 'w-[500px] p-2'} border border-customGray max-md:w-[250px] max-md:p-1`}
          name={nameText}
          type={typeText}
          placeholder={placeHolder}
          value={valueText}
          onChange={(e) => onChangeInput(e)}
        />
        {errorText && <p className='text-red-700 text-lg'>{errorText}</p>}
      </div>
    </div>
  );
};
