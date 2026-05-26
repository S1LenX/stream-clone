import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useCardTrailer = (movieId,isTV = false) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    setTrailerKey(null);

    const fetchTrailer = async () => {
      try {
        const type = isTV ? "tv" : "movie";
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${movieId}/videos`,
          API_OPTIONS
        );
        const json = await res.json();

        if (!json.results || json.results.length === 0) return;

        const trailers = json.results.filter((v) => v.type === "Trailer");
        const trailer = trailers.length ? trailers[0] : json.results[0];
        setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Failed to fetch card trailer", err);
      }
    };

    fetchTrailer();
  }, [movieId, isTV]);

  return trailerKey;
};

export default useCardTrailer;