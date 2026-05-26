import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { title, overview } = location.state || {};

  if (!movieId) return <div className="text-white p-20">Loading View...</div>;

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Fixed Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/60 text-white font-semibold px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black active:scale-95 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md text-sm md:text-base"
      >
        <span>←</span> Back
      </button>

      <VideoBackground movieId={movieId} />
      
      {/* Passing showMoreInfo={false} to hide the button on this layout */}
      <VideoTitle 
        title={title || "Discover Content"} 
        overview={overview || "No description available for this title."} 
        showMoreInfo={false}
      />
    </div>
  );
};

export default MovieDetail;