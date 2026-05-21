import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
function MainContainer() {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies);
    if(!movies)return;
<<<<<<< HEAD
    const mainMovie = movies[Math.floor(Math.random() * movies.length)];
=======
    const mainMovie=movies[0];
>>>>>>> f431e698e53bbecf17967bc09732d325d0f685bb
    const {original_title,overview,id}=mainMovie;
    return (
        <div className='relative h-screen '>
            <VideoBackground movieId={id}/>
            <VideoTitle title={original_title} overview={overview}/>
        </div>
    )
}

export default MainContainer