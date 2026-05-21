import React, { use } from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const {movieNames, movieResults}=useSelector(store=>store.gpt);
    if(!movieNames || !movieResults) return null; // Handle case where data is not yet available
    
    console.log("Movie Names from Store:", movieNames);
    console.log("Movie Results from Store:", movieResults);
  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg shadow-md'>
        <div>
            {movieNames.map((movieName, index)=>(
                <MovieList key={movieName} title={movieName} movies={movieResults[index]}/>
            ))}
        </div>
    </div>
  )
}

export default GptMovieSuggestions