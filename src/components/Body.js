import React, { useEffect } from 'react';
import Login from "./Login";
import Browse from "./Browse";
import MovieDetailPage from "./MovieDetailPage";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import TVDetailPage from './TVDetailPage';
const Body = () => {
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
        },
        {
            path:"/browse",
            element:<Browse/>,
        },
        {
            path: "/movie/:id",
            element: <MovieDetailPage />,
        },
        { 
            path: "/tv/:id", 
            element: <TVDetailPage /> 
        },
    ]);
    

  return (
    <div>
        <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default Body