import React, { useState } from 'react'
import { GptSearchBar } from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BGSCREEN } from '../utils/constants'

const GptSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div>
        <div className='fixed -z-10'>
            <img className='h-screen object-cover md:h-auto md:object-none'
            src={BGSCREEN}
            alt="Bg"/>
        </div>
        <div className='pt-[30%] md:p-20  flex flex-col gap-10'>
          <GptSearchBar setIsSearching={setIsSearching} isSearching={isSearching}/>
          <GptMovieSuggestions isSearching={isSearching}/>
        </div>
    </div>
  )
}

export default GptSearch