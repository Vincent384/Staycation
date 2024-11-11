import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

type SearchBarProps = {
    listings: ListingProperty[] | null,
    displayResult: ListingProperty | null,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    setInput: (value: string) => void,
    onSearch: (title: string) => void,
    input: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ listings, displayResult, onSubmit, setInput, input, onSearch }) => {
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // Håller koll på det valda resultatet
  
  // Uppdatera filtrerade resultat när användaren skriver
  useEffect(() => {
    if (listings) {
      const searchTerm = input.toLowerCase();
      const uniqueResults = Array.from(new Set(
        listings
          .filter((property) => {
            const city = property.location.city.toLowerCase();
            const district = property.location.district.toLowerCase();
            return searchTerm &&
              ((city.includes(searchTerm) && city !== searchTerm) ||
              (district.includes(searchTerm) && district !== searchTerm));
          })
          .map((property) => {
            const city = property.location.city;
            const district = property.location.district;
            return city.toLowerCase().includes(searchTerm) ? city : district;
          })
      ));
      setFilteredResults(uniqueResults);
      setSelectedIndex(-1); // Återställ index när resultaten uppdateras
    }
  }, [input, listings]);

  // Hantera tangenttryckningar
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      // Flytta markeringen nedåt
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      // Flytta markeringen uppåt
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      // Fyll i sökfältet med markerat resultat vid Enter
      setInput(filteredResults[selectedIndex]);
      onSearch(filteredResults[selectedIndex]);
      setFilteredResults([]); // Rensa resultatlistan efter valet
    }
  };

  return (
    <div className='flex justify-center items-center m-auto mt-10 max-md:mt-5'>
      <div className="relative w-full max-w-lg">
        <form onSubmit={onSubmit} className="flex">
          <input
            name='input'
            placeholder='Sök...'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Lägg till tangenttryckningshanterare
            className='rounded-lg rounded-r-none pr-[10rem] pl-4 py-3 border bg-customWhite border-black max-sm:pr-[5rem] w-full'
            type='search'
            autoComplete='off'
          />
          
          <button type="submit" className='px-4 p-3 rounded-r-lg border cursor-pointer border-black bg-white'>
            <Search />
          </button>
        </form>

        {input && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-black z-10">
            {
              filteredResults.map((displayText, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setInput(displayText);
                    onSearch(displayText);
                    setFilteredResults([]); // Rensa resultatlistan efter valet
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
