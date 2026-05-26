import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieDetails = (movieId,isTV = false) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const type = isTV ? "tv" : "movie";
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details and videos in parallel
        const [detailsRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${type}/${movieId}`, API_OPTIONS),
          fetch(`https://api.themoviedb.org/3/${type}/${movieId}/videos`, API_OPTIONS),
        ]);

        const details = await detailsRes.json();
        const videos = await videosRes.json();

        setMovie(details);

        if (videos.results && videos.results.length > 0) {
          const trailers = videos.results.filter((v) => v.type === "Trailer");
          const trailer = trailers.length ? trailers[0] : videos.results[0];
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, isTV]);

  return { movie, trailerKey, loading };
};

export default useMovieDetails;