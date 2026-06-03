import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTVSeasons = (tvId, seasonNumber) => {
  const [episodes, setEpisodes] = useState([]);
  const [seasonLoading, setSeasonLoading] = useState(true);

  useEffect(() => {
    if (!tvId || seasonNumber === null) return;

    const fetchSeason = async () => {
      setSeasonLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}`,
          API_OPTIONS
        );
        const data = await res.json();
        setEpisodes(data.episodes || []);
      } catch (err) {
        console.error("Failed to fetch season episodes", err);
        setEpisodes([]);
      } finally {
        setSeasonLoading(false);
      }
    };

    fetchSeason();
  }, [tvId, seasonNumber]);

  return { episodes, seasonLoading };
};

export default useTVSeasons;