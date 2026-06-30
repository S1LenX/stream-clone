import React, { useRef, useState } from 'react'
import lang from '../utils/langConstants'
import { useDispatch, useSelector } from 'react-redux';
import { model } from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

export const GptSearchBar = ({ isSearching, setIsSearching }) => {
    const dispatch=useDispatch();
    const langKey=useSelector(store=>store.config.lang);
    const searchText=useRef(null);
    ///Search Movie in TMDB
    const searchTMDB = async (query) => {
        const [movieRes, tvRes] = await Promise.all([
            fetch(
                `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
                API_OPTIONS
            ),
            fetch(
                `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
                API_OPTIONS
            )
        ]);

        const movieJson = await movieRes.json();
        const tvJson = await tvRes.json();

        // Merge movie and tv results, filter out items with no poster
        const combined = [
            ...(movieJson.results || []),
            ...(tvJson.results || [])
        ].filter(item => item.poster_path);

        return combined;
    };
    const handleGptSearchClick=async()=>{
        if (!searchText.current.value) return;
        if (isSearching) return;
        setIsSearching(true);

        try {
            const gptQuery = `Act as a movie and TV show recommendation system. The user searched for: "${searchText.current.value}".

            If "${searchText.current.value}" is itself a real movie or TV show title, it MUST be the first item in your list, exactly as the correct official title.
            Then follow it with 9 similar or related titles.

            Return ONLY a comma separated list of exactly 10 titles, nothing else.
            Example: Breaking Bad, Better Call Saul, Narcos, Ozark, The Wire, Fargo, Peaky Blinders, Money Heist, Dexter, The Sopranos`;

            const gptResult = await model.generateContent(gptQuery);
            const text = gptResult.response.text();
            
            const gptMovies = text.split(",").map(name => name.trim());
            // console.log("Parsed Movie Array:", gptMovies);
            
            //Pass gptMovies to TMDB fetching function 
            const promiseArray=gptMovies.map(movie=>searchTMDB(movie));
            const tmdbResults=await Promise.all(promiseArray);

            dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmdbResults}));
        } catch (error) {
            console.error("Gemini failed to respond:", error);
        } finally {
            setIsSearching(false); // Re-enable the button
        }
    }
    
    return (
    <div className='pt-[10%] flex justify-center md:block w-full'>
        <form onSubmit={(e)=>e.preventDefault()} className='flex items-center gap-4 bg-black rounded-lg shadow-md p-4 w-full md:w-auto'>
            <input 
                ref={searchText}
                type="text"
                placeholder={lang[langKey].gptSearchPlaceholder}
                className="p-4 m-4 w-[80%] bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            />
            <button onClick={handleGptSearchClick} disabled={isSearching} className="py-2 px-4 w-[13%] bg-red-600 text-white rounded hover:bg-red-700">
                {isSearching ? "..." : lang[langKey].search}
            </button>
        </form>
    </div>
  )
}
