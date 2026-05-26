import React, { useState } from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import useCardTrailer from '../hooks/useCardTrailer'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ posterPath, movie }) => {
  const [hovered, setHovered] = useState(false);
  const isTV = !movie?.title && !!movie?.name;
  const trailerKey = useCardTrailer(hovered ? movie?.id : null, isTV);
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleClick = () => {
    const path = isTV ? `/tv/${movie?.id}` : `/movie/${movie?.id}`;
    navigate(path);
  };

  return (
    <div
      className='relative w-36 md:w-48 flex-shrink-0 pr-2 cursor-pointer group'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <img
        alt={movie?.title || movie?.name || "Movie"}
        src={IMG_CDN_URL + posterPath}
        className='rounded-md w-full transition-transform duration-300 group-hover:scale-105'
      />

      {hovered && (
        <div className='absolute bottom-0 left-0 z-50 w-64 md:w-72 bg-zinc-900 rounded-xl shadow-2xl shadow-black overflow-hidden border border-zinc-700 -translate-x-1/4'>
          <div className='w-full aspect-video bg-black'>
            {trailerKey ? (
              <iframe
                className='w-full h-full pointer-events-none'
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="trailer"
              />
            ) : (
              <img
                src={IMG_CDN_URL + posterPath}
                alt="loading"
                className='w-full h-full object-cover'
              />
            )}
          </div>
          <div className='p-3'>
            <h3 className='text-white font-bold text-sm truncate'>
              {movie?.title || movie?.name}
            </h3>
            <p className='text-zinc-400 text-xs mt-1 line-clamp-2'>
              {movie?.overview || "No description available."}
            </p>
            <div className='flex items-center gap-2 mt-2'>
              <button
                onClick={(e) => { e.stopPropagation(); handleClick(); }}
                className='bg-white text-black text-xs font-bold px-3 py-1 rounded-full hover:bg-zinc-200 transition'
              >
                ▶ Play
              </button>
              <span className='text-green-400 text-xs font-semibold'>
                {movie?.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}` : ""}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCard