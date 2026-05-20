import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies:null,
        popularMovies:null,
        trailerVideo:null,
        topRatedMovies: null,
        upcomingMovies: null,
        popularShows: null,
        topRatedShows: null,
        onAirShows: null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies=action.payload;
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo=action.payload;
        },
        addTopRatedMovies: (state, action) => {
        state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addPopularShows: (state, action) => {
            state.popularShows = action.payload;
        },
        addTopRatedShows: (state, action) => {
            state.topRatedShows = action.payload;
        },
        addOnAirShows: (state, action) => {
            state.onAirShows = action.payload;
        }
    },
});
export const { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addTrailerVideo, addPopularShows, addTopRatedShows, addOnAirShows } = movieSlice.actions;
export default movieSlice.reducer;