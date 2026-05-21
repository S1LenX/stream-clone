import React from 'react'
import { GptSearchBar } from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BGSCREEN } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className='fixed -z-10'>
            <img className='h-screen object-cover md:h-auto md:object-none'
            src={BGSCREEN}
            alt="Bg"/>
        </div>
        <div className='pt-[30%] md:p-20  flex flex-col gap-10'>
          <GptSearchBar/>
          <GptMovieSuggestions/>
        </div>
    </div>
  )
}

export default GptSearch