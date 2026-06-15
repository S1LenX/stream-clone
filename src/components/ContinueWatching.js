import React from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchHistory from '../hooks/useFetchHistory'
import { IMG_CDN_URL } from '../utils/constants'

const ContinueWatching = () => {
  const { history, historyLoading } = useFetchHistory();
  const navigate = useNavigate();

  // Don't show row if no history yet
  if (historyLoading || history.length === 0) return null;

  return (
    <div className='px-6 py-2'>
      <h1 className='text-lg md:text-3xl py-4 text-white'>Continue Watching</h1>
      <div className='flex overflow-x-scroll gap-2'>
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.isTV ? `/tv/${item.id}` : `/movie/${item.id}`)}
            className='relative w-36 md:w-48 flex-shrink-0 cursor-pointer group'
          >
            <img
              src={IMG_CDN_URL + item.poster_path}
              alt={item.title}
              className='rounded-md w-full transition-transform duration-300 group-hover:scale-105'
            />
            {/* Continue watching label */}
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 rounded-b-md'>
              <p className='text-white text-xs font-semibold truncate'>{item.title}</p>
              <p className='text-zinc-400 text-xs'>{item.isTV ? "TV Show" : "Movie"}</p>
            </div>
            {/* Play icon on hover */}
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
              <span className='text-white text-4xl drop-shadow-lg'>▶</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContinueWatching