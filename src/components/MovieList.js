import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className='px-6 py-2'>
      <h1 className='text-lg md:text-3xl py-4 text-white'>{title}</h1>
      <div className='flex overflow-x-scroll gap-1'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie?.poster_path}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList