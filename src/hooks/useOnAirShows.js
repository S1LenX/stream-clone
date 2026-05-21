import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addOnAirShows } from "../utils/movieSlice";

const useOnAirShows = () => {
    const dispatch = useDispatch();
    const onAirShows = useSelector((store) => store.movies.onAirShows);
    const getOnAirShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/on_the_air?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addOnAirShows(json.results));
    };
    useEffect(() => {
        !onAirShows && getOnAirShows();
    }, [])
}
export default useOnAirShows;