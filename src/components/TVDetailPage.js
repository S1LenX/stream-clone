import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useMovieDetails from '../hooks/useMovieDetails'
import useTVSeasons from '../hooks/useTVSeasons'
import { IMG_CDN_URL } from '../utils/constants'
import Header from './Header'

const TVDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie: show, trailerKey, loading } = useMovieDetails(id, true);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const { episodes, seasonLoading } = useTVSeasons(id, selectedSeason);

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

  const totalSeasons = show.number_of_seasons || 1;

  const handlePlayEpisode = (episodeNumber) => {
    window.open(
      `https://www.vidking.net/embed/tv/${id}/${selectedSeason}/${episodeNumber}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
,
      '_blank'
    );
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='relative z-50'>
        <Header />
      </div>
      <div className='h-36 md:h-0' />

      {/* Trailer / Backdrop */}
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
      </div>

      {/* Show Info */}
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

          <div className='flex gap-3 mt-2 flex-wrap'>
            <button
              onClick={() => navigate(-1)}
              className='px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition cursor-pointer'
            >
              ← Back
            </button>
            <button
              onClick={() => handlePlayEpisode(1)}
              className='px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-semibold transition cursor-pointer flex items-center gap-2'
            >
              ▶ Play S{selectedSeason} E1
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className='px-4 md:px-12 pb-12'>

        {/* Season Selector */}
        <div className='flex items-center gap-4 mb-6'>
          <h2 className='text-xl font-bold'>Episodes</h2>
          <select
            value={selectedSeason}
            onChange={(e) => {
              setSelectedSeason(Number(e.target.value));
              setSelectedEpisode(null);
            }}
            className='bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 cursor-pointer outline-none'
          >
            {Array.from({ length: totalSeasons }, (_, i) => i + 1).map((s) => (
              <option key={s} value={s}>Season {s}</option>
            ))}
          </select>
        </div>

        {/* Episode List */}
        {seasonLoading ? (
          <div className='text-zinc-400 animate-pulse'>Loading episodes...</div>
        ) : (
          <div className='flex flex-col gap-3'>
            {episodes.map((ep) => (
              <div
                key={ep.id}
                onClick={() => handlePlayEpisode(ep.episode_number)}
                className='flex gap-4 items-start bg-zinc-900 hover:bg-zinc-800 rounded-xl p-4 cursor-pointer transition group'
              >
                {/* Episode Still */}
                <div className='flex-shrink-0 w-32 md:w-44 aspect-video bg-zinc-800 rounded-lg overflow-hidden relative'>
                  {ep.still_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                      alt={ep.name}
                      className='w-full h-full object-cover group-hover:opacity-70 transition'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-zinc-600 text-xs'>
                      No Image
                    </div>
                  )}
                  {/* Play icon overlay */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
                    <span className='text-white text-3xl'>▶</span>
                  </div>
                </div>

                {/* Episode Info */}
                <div className='flex flex-col gap-1 flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='text-zinc-500 text-sm font-medium'>
                      E{ep.episode_number}
                    </span>
                    <h3 className='text-white font-semibold text-sm md:text-base truncate'>
                      {ep.name}
                    </h3>
                    {ep.runtime && (
                      <span className='text-zinc-500 text-xs ml-auto flex-shrink-0'>
                        {ep.runtime} min
                      </span>
                    )}
                  </div>
                  <p className='text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-2'>
                    {ep.overview || "No description available."}
                  </p>
                  {ep.vote_average > 0 && (
                    <span className='text-green-400 text-xs'>
                      ⭐ {ep.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TVDetailPage