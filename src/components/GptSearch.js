import React from 'react'
import { GptSearchBar } from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BGSCREEN } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10 w-full h-full'>
            <img 
            src={BGSCREEN}
            alt="Bg"/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch