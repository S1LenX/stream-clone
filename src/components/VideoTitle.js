import React from 'react'

function VideoTitle({title,overview}) {
  return (
    <div className='w-screen aspect-video pt-[25%] px-24 absolute z-10 text-white bg-gradient-to-r from-black'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-3/4'>{overview}</p>
        <div className="flex items-center my-4">
            <button className='mr-4 bg-white text-black font-bold p-4 px-10 text-xl rounded-md flex items-center gap-2 hover:bg-white/80 active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer'>
                <span className="text-2xl">▶︎</span> Play
            </button>
            
            <button className='bg-gray-500/50 text-white font-semibold p-4 px-10 text-xl rounded-md flex items-center gap-2 backdrop-blur-sm hover:bg-gray-500/40 active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer'>
                <span className="border border-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">i</span> More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle