import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedShows } from "../utils/movieSlice";

const useTopRatedShows = () => {
    const dispatch = useDispatch();
    const topRatedShows = useSelector((store) => store.movies.topRatedShows);
    const getTopRatedShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/top_rated?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addTopRatedShows(json.results));
    };
    useEffect(() => {
        !topRatedShows && getTopRatedShows();
    }, [])
}
export default useTopRatedShows;