import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

function VideoBackground({ movieId }) {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);
  
  return (
    <div className='absolute top-0 left-0 w-screen h-screen overflow-hidden -z-10'>
      <iframe
        className='w-full h-full scale-125 pointer-events-none'
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}&controls=0&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      >
      </iframe>
    </div>
  )
}

export default VideoBackground;