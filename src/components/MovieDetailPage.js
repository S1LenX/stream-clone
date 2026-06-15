import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useMovieDetails from '../hooks/useMovieDetails'
import { IMG_CDN_URL } from '../utils/constants'
import useWatchHistory from '../hooks/useWatchHistory'
import Header from './Header'

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, trailerKey, loading } = useMovieDetails(id);
  const { addToHistory } = useWatchHistory();

  if (loading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl animate-pulse'>Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl'>Movie not found.</div>
      </div>
    );
  }

  if (!loading && movie && movie.success === false) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl'>Movie not found.</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='relative z-50'>
        <Header />
      </div>
      <div className='h-36 md:h-0' />

      <div className='relative w-full aspect-video bg-black'>
        {trailerKey ? (
          <iframe
            className='w-full h-full'
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movie.title}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className='w-full h-full object-cover opacity-60'
          />
        )}
      </div>

      <div className='px-4 md:px-12 py-6 flex flex-col md:flex-row gap-8'>
        <div className='flex-shrink-0'>
          <img
            src={IMG_CDN_URL + movie.poster_path}
            alt={movie.title}
            className='w-40 md:w-56 rounded-xl shadow-2xl'
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie.title}</h1>

          <div className='flex flex-wrap items-center gap-3 text-sm text-zinc-400'>
            <span className='text-green-400 font-semibold text-base'>
              {movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)} / 10` : ""}
            </span>
            <span>{movie.release_date?.split("-")[0]}</span>
            {movie.runtime && <span>{movie.runtime} min</span>}
            <span className='px-2 py-0.5 border border-zinc-600 rounded text-xs uppercase'>
              {movie.original_language}
            </span>
          </div>

          <div className='flex flex-wrap gap-2'>
            {movie.genres?.map((g) => (
              <span key={g.id} className='px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300'>
                {g.name}
              </span>
            ))}
          </div>

          <p className='text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl'>
            {movie.overview}
          </p>

          <div className='flex gap-3 mt-2 flex-wrap'>
            <button
              onClick={() => navigate(-1)}
              className='px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition cursor-pointer'
            >
              ← Back
            </button>
            <button
              onClick={() =>
                addToHistory(movie).then(() =>
                  window.open(`https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`, '_blank')
                )}
              className='px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-semibold transition cursor-pointer flex items-center gap-2'
            >
              ▶ Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage