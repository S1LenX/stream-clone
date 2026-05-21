import React from 'react'
import { GptSearchBar } from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BGSCREEN } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
<<<<<<< HEAD
        <div className='fixed -z-10 w-full h-full'>
=======
        <div className='absolute -z-10 w-full h-full'>
>>>>>>> f431e698e53bbecf17967bc09732d325d0f685bb
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