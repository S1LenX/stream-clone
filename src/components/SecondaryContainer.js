import React from 'react'
import MovieList from './MovieList'
import MovieCard from './MovieCard'
import {useSelector} from 'react-redux'
const SecondaryContainer = () => {
  const movies=useSelector((store)=>store.movies);
  return (
    <div className='mt:0 md:-mt-36 pl-6 relative z-20'>
      <div className='bg-gradient-to-b from-transparent to-black pt-36'>
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
      </div>
      <div className='bg-black'>
        <MovieList title={"Popular Shows"} movies={movies.popularShows}/>
        <MovieList title={"Popular Movies"} movies={movies.popularMovies}/>
        <MovieList title={"Top Rated Shows"} movies={movies.topRatedShows}/>
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies}/>
        <MovieList title={"On Air"} movies={movies.onAirShows}/>
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
      </div>
</div>
  )
}

export default SecondaryContainer