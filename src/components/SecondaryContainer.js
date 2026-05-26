import React from 'react'
import MovieList from './MovieList'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveCategory } from '../utils/movieSlice'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const activeCategory = useSelector((store) => store.movies.activeCategory);
  const dispatch = useDispatch();

  const categories = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movies" },
    { label: "TV Shows", value: "shows" },
  ];

  return (
    // z-30 ensures this whole container is above MainContainer's video/overlay
    <div className='mt-0 md:-mt-36 pl-6 relative z-10'>

      <div className='bg-gradient-to-b from-transparent to-black pt-12 md:pt-36'>
        {(activeCategory === "all" || activeCategory === "movies") && (
          <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        )}
      </div>

      <div className='bg-black'>

        {/* Category buttons — inside bg-black so they always show on dark bg */}
        <div className='flex gap-3 px-4 pt-4 pb-2'>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => dispatch(setActiveCategory(cat.value))}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
                ${activeCategory === cat.value
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/50 hover:border-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* MOVIES */}
        {(activeCategory === "all" || activeCategory === "movies") && (
          <>
            <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
            <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
            <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
          </>
        )}

        {/* TV SHOWS */}
        {(activeCategory === "all" || activeCategory === "shows") && (
          <>
            <MovieList title={"Popular Shows"} movies={movies.popularShows} />
            <MovieList title={"Top Rated Shows"} movies={movies.topRatedShows} />
            <MovieList title={"On Air"} movies={movies.onAirShows} />
          </>
        )}
      </div>
    </div>
  )
}

export default SecondaryContainer