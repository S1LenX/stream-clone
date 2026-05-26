import React, { use } from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = ({isSearching }) => {
    const {movieNames, movieResults}=useSelector(store=>store.gpt);
    if (isSearching) {
        return (
            <div className='p-4 m-4 bg-black bg-opacity-90 rounded-lg flex flex-col items-center justify-center gap-4 py-16'>
                <div className='w-12 h-12 border-4 border-zinc-600 border-t-red-600 rounded-full animate-spin' />
                <p className='text-white text-lg font-semibold'>Finding movies for you...</p>
                <p className='text-zinc-400 text-sm'>Asking Gemini recommendations</p>
            </div>
        );
    }
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