import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
<<<<<<< HEAD
  if(!posterPath) return null; // Handle case where posterPath is not available
=======
>>>>>>> f431e698e53bbecf17967bc09732d325d0f685bb
  return (
    <div className='w-48 pr-4'>
        <img alt="Movie Card"
        src={IMG_CDN_URL+posterPath}
        />
    </div>
  )
}

export default MovieCard