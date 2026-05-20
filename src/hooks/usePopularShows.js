import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularShows } from "../utils/movieSlice";

const usePopularShows = () => {
    const dispatch = useDispatch();
    const getPopularShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addPopularShows(json.results));
    };
    useEffect(() => {
        getPopularShows();
    }, [])
}
export default usePopularShows;