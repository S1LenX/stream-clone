import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
function MainContainer() {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies);
    const mainMovie = useMemo(() => {
    if(!movies || movies.length === 0) return null;
    return movies[Math.floor(Math.random() * movies.length)];
    }, [movies]);
    if(!movies)return;
    const {original_title,overview,id}=mainMovie;
    return (
        <div className='relative h-screen pt-[40%] md:pt-0'>
            <VideoBackground movieId={id}/>
            <VideoTitle title={original_title} overview={overview}/>
        </div>
    )
}

export default MainContainer