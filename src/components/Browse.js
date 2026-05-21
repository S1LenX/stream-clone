import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import usePopularShows from '../hooks/usePopularShows';
import useTopRatedShows from '../hooks/useTopRatedShows';
import useOnAirShows from '../hooks/useOnAirShows';
import GptSearch from "./GptSearch.js";
import { useSelector } from "react-redux";
const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  usePopularShows();
  useTopRatedShows();
  useOnAirShows();
  return (
    <div>
      <Header/>
      {showGptSearch?(
        <GptSearch/>
       ):(
        <>
          <MainContainer/>
          <SecondaryContainer/>
        </>
      )}
    </div>
  )
}

export default Browse