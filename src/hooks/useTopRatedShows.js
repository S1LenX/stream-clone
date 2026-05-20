import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedShows } from "../utils/movieSlice";

const useTopRatedShows = () => {
    const dispatch = useDispatch();
    const getTopRatedShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/top_rated?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addTopRatedShows(json.results));
    };
    useEffect(() => {
        getTopRatedShows();
    }, [])
}
export default useTopRatedShows;