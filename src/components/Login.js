import React from 'react'
import { useState } from 'react';
import Header from './Header'

const Login = () => {
    const[isSignInForm,setIsSignInForm]=useState(true);

    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img 
            src="https://assets.nflxext.com/ffe/siteui/vlv3/77c412a9-62ea-48a0-a5ee-466e11e851d5/web/IN-en-20260511-TRIFECTA-perspective_f0af4f75-4cc5-42bd-b0c5-2b65b8b50e03_large.jpg" 
            alt="Bg"/>
        </div>
        <form className='w-3/12 absolute p-12 bg-black/75 my-36 mx-auto right-0 left-0 text-white rounded-lg'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign up"}</h1>
            {isSignInForm &&(
                <input type="text" placeholder='Full Name' 
                    className='p-4 my-4 w-full bg-[#333333] rounded-lg'/>
            )}
            <input type="text" placeholder='Email Address' 
                className='p-4 my-4 w-full bg-[#333333] rounded-lg'/>
            <input type="password" placeholder='Password' 
                className='p-4 my-4 w-full bg-[#333333] rounded-lg'/>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm?"Sign In":"Sign up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign up Now":"Already Registered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login