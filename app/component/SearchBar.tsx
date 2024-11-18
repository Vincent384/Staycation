import { Search } from 'lucide-react';
import React, { useState } from 'react';

type SearchBarProps = {
    listings: ListingProperty[] | null,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    setInput: (value: string) => void,
    onChangeSearch: (title: string) => void,
    input: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ listings, onSubmit, setInput, input, onChangeSearch }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  

  const filteredResults = listings && input 
    ? Array.from(new Set(
        listings
          .filter((property) => {
            const searchTerm = input.toLowerCase();
            const city = property.location.city.toLowerCase();
            const district = property.location.district.toLowerCase();

            return searchTerm && 
              ((city.includes(searchTerm) && city !== searchTerm) || 
              (district.includes(searchTerm) && district !== searchTerm));
          })
          .map((property) => {
            const city = property.location.city;
            const district = property.location.district;
            return city.toLowerCase().includes(input.toLowerCase()) ? city : district;
          })
      ))
    : [];


  function handleKeyDown(e: React.KeyboardEvent) {

    if (e.key === 'ArrowDown') {

      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {

      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {

      onChangeSearch(filteredResults[selectedIndex]);
    } 
  }

  return (
    <div className='flex justify-center items-center m-auto mt-10 max-md:mt-5 max-md:mx-5'>
      <div className="relative w-full max-w-lg">
        <form onSubmit={onSubmit} className="flex">
          <input
            name='input'
            placeholder='Sök...'
            value={input}
            onKeyDown={handleKeyDown}
            onChange={e => {
              setInput(e.target.value || '');
              setSelectedIndex(-1);
            }}
            className='rounded-lg rounded-r-none pr-[10rem] pl-4 py-3 border bg-customWhite border-black max-sm:pr-[5rem] w-full'
            type='search'
            autoComplete='off'
          />
          
          <button type="submit" className='px-4 p-3 rounded-r-lg border cursor-pointer border-black bg-white'>
            <Search />
          </button>
        </form>

        {input && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-black z-20">
            {
              filteredResults.map((displayText, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setInput(displayText);
                    onChangeSearch(displayText);
                  }}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedIndex === index ? 'bg-gray-200' : ''}`}
                >
                  <span>{displayText}</span>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};
