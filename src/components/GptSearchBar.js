import React from 'react'
import lang from '../utils/langConstants'
import { useSelector } from 'react-redux';

export const GptSearchBar = () => {
    const langKey=useSelector(store=>store.config.lang);
  return (
    <div className=' p-[10%]'>
        <form className='flex items-center gap-4 bg-black rounded-lg shadow-md p-4'>
            <input 
                type="text"
                placeholder={lang[langKey].gptSearchPlaceholder}
                className="p-4 m-4 w-[80%] bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            />
            <button className="py-2 px-4 w-[13%] bg-red-600 text-white rounded hover:bg-red-700">
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}
