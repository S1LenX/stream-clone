import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:'gpt',
    initialState:{
<<<<<<< HEAD
        showGptSearch:false,
        movieNames:null,
        movieResults:null,
=======
        showGptSearch:false
>>>>>>> f431e698e53bbecf17967bc09732d325d0f685bb
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch;
<<<<<<< HEAD
        },
        addGptMovieResult:(state, action)=>{
            const {movieNames, movieResults}=action.payload;
            state.movieNames=movieNames;
            state.movieResults=movieResults;
        }
    }
});
export const {toggleGptSearchView, addGptMovieResult}=gptSlice.actions;
=======
        }
    }
});
export const {toggleGptSearchView}=gptSlice.actions;
>>>>>>> f431e698e53bbecf17967bc09732d325d0f685bb
export default gptSlice.reducer;