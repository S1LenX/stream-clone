import React from 'react'
import { useNavigate } from 'react-router-dom';

function VideoTitle({title,overview,movieId}) {
    const navigate = useNavigate();
  return (
    <div className='w-screen h-full md:aspect-video pt-[35%] md:pt-[25%] px-6 md:px-24 absolute z-20 text-white bg-gradient-to-r from-black flex flex-col justify-center'> 
    <h1 className='text-xl md:text-6xl font-bold max-w-[80%] md:max-w-full truncate md:whitespace-normal'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-3/4'>{overview}</p>
        <div className="flex items-center my-2 md:my-4 scale-75 md:scale-100 origin-left">
            <button onClick={() => navigate(`/movie/${movieId}`)} 
                className='mr-4 bg-white text-black font-bold p-2 md:p-4 px-6 md:px-10 text-lg md:text-xl rounded-md flex items-center gap-2 hover:bg-white/80 active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap'>
                <span className="text-xl md:text-2xl">▶︎</span> Play
            </button>
            
            <button onClick={() => navigate(`/movie/${movieId}`)} 
            className='bg-gray-500/50 text-white font-semibold p-2 md:p-4 px-6 md:px-10 text-lg md:text-xl rounded-md flex items-center gap-2 backdrop-blur-sm hover:bg-gray-500/40 active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap'>
                <span className="border border-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm font-bold">i</span> More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle