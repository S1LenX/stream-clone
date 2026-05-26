import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useMovieDetails from '../hooks/useMovieDetails'
import { IMG_CDN_URL } from '../utils/constants'
import Header from './Header'

const TVDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie: show, trailerKey, loading } = useMovieDetails(id, true);  // 👈 isTV = true

  if (loading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl animate-pulse'>Loading...</div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl'>Show not found.</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />

      <div className='relative w-full aspect-video bg-black'>
        {trailerKey ? (
          <iframe
            className='w-full h-full'
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={show.name}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            alt={show.name}
            className='w-full h-full object-cover opacity-60'
          />
        )}
        <div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent' />
      </div>

      <div className='px-4 md:px-12 py-6 flex flex-col md:flex-row gap-8'>
        <div className='flex-shrink-0'>
          <img
            src={IMG_CDN_URL + show.poster_path}
            alt={show.name}
            className='w-40 md:w-56 rounded-xl shadow-2xl'
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl md:text-5xl font-bold'>{show.name}</h1>

          <div className='flex flex-wrap items-center gap-3 text-sm text-zinc-400'>
            <span className='text-green-400 font-semibold text-base'>
              {show.vote_average ? `⭐ ${show.vote_average.toFixed(1)} / 10` : ""}
            </span>
            <span>{show.first_air_date?.split("-")[0]}</span>
            {show.number_of_seasons && (
              <span>{show.number_of_seasons} Season{show.number_of_seasons > 1 ? "s" : ""}</span>
            )}
            <span className='px-2 py-0.5 border border-zinc-600 rounded text-xs uppercase'>
              {show.original_language}
            </span>
          </div>

          <div className='flex flex-wrap gap-2'>
            {show.genres?.map((g) => (
              <span key={g.id} className='px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300'>
                {g.name}
              </span>
            ))}
          </div>

          <p className='text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl'>
            {show.overview}
          </p>

          <button
            onClick={() => navigate(-1)}
            className='mt-2 self-start flex items-center gap-2 px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-semibold transition'
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default TVDetailPage