import React from 'react'
import { useState,useRef } from 'react';
import Header from './Header'
import checkValidity from "../utils/validate"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BGSCREEN, SCREEN, USER_AVATAR } from '../utils/constants';
const Login = () => {
    const[isSignInForm,setIsSignInForm]=useState(true);
    const[errmsg,seterrmsg]=useState(null);
    const email=useRef(null);
    const pass=useRef(null);
    const name=useRef(null);
    const dispatch = useDispatch();
    const handleButtonClick=()=>{
        const msg=checkValidity(email.current.value,pass.current.value);
        console.log(msg);
        seterrmsg(msg);
        if(msg) return;

        if(!isSignInForm){
            createUserWithEmailAndPassword(auth,email.current.value,pass.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: USER_AVATAR
                }).then(() => {
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid,email:email,displayName:displayName, photoURL:photoURL}));
                }).catch((error) => {
                    seterrmsg(error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrmsg(errorCode+"-"+errorMessage);
            });
        }else{
            signInWithEmailAndPassword(auth,email.current.value,pass.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrmsg(errorCode+"-"+errorMessage);
            });
        }
    }
    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img 
            src={BGSCREEN}
            alt="Bg"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 bg-black/75 my-36 mx-auto right-0 left-0 text-white rounded-lg'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign up"}</h1>
            {!isSignInForm &&(
                <input ref={name} type="text" placeholder='Full Name' 
                    className='p-4 my-4 w-full bg-[#333333] rounded-lg'/>
            )}
            <input ref={email} type="text" placeholder='Email Address' 
                className='p-4 my-4 w-full bg-[#333333] rounded-lg'/>
            <input ref={pass} type="password" placeholder='Password' 
                className='p-4 my-4 w-full bg-[#333333] rounded-lg'/>
            <p className='text-red-500 font-bold text-lg py-2'>{errmsg}</p>
            
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm?"Sign In":"Sign up"}
                </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign up Now":"Already Registered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login