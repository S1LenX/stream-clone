import React, { useRef, useState } from 'react'
import lang from '../utils/langConstants'
import { useDispatch, useSelector } from 'react-redux';
import { model } from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

export const GptSearchBar = () => {
    const dispatch=useDispatch();
    const langKey=useSelector(store=>store.config.lang);
    const searchText=useRef(null);
    const [isSearching, setIsSearching] = useState(false);
    ///Search Movie in TMDB
    const searchMovieTMDB=async(movie)=>{
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query="${movie}"&include_adult=false&language=en-US&page=1`, 
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    }
    const handleGptSearchClick=async()=>{
        if (!searchText.current.value) return;
        if (isSearching) return;
        setIsSearching(true);
        console.log(searchText.current.value);

        try {
            const gptQuery = `Act as a movie recommendation system. Search for movies based on this query: "${searchText.current.value}". 
            Return ONLY a comma separated list of exactly 5 movie names, nothing else. 
            Example: Inception, The Dark Knight, Interstellar, Dunkirk, Tenet`;

            const gptResult = await model.generateContent(gptQuery);
            const text = gptResult.response.text();
            
            const gptMovies = text.split(",").map(name => name.trim());
            console.log("Parsed Movie Array:", gptMovies);
            
            //Pass gptMovies to TMDB fetching function 
            const promiseArray=gptMovies.map(movie=>searchMovieTMDB(movie));
            const tmdbResults=await Promise.all(promiseArray);
            console.log("Movies from TMDB:", tmdbResults);

            dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmdbResults}));
        } catch (error) {
            console.error("Gemini failed to respond:", error);
        } finally {
            setIsSearching(false); // Re-enable the button
        }
    }
    
    return (
    <div className='p-[10%]'>
        <form onSubmit={(e)=>e.preventDefault()} className='flex items-center gap-4 bg-black rounded-lg shadow-md p-4'>
            <input 
                ref={searchText}
                type="text"
                placeholder={lang[langKey].gptSearchPlaceholder}
                className="p-4 m-4 w-[80%] bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            />
            <button onClick={handleGptSearchClick} className="py-2 px-4 w-[13%] bg-red-600 text-white rounded hover:bg-red-700">
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}