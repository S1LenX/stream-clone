import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

function Header() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName, photoURL:photoURL}));
            navigate("/browse");
        } else {
            dispatch(removeUser());
            navigate("/");
        }
        });

        return ()=> unSubscribe();
    },[]);


  return (
    <div className='absolute top-0 left-0 w-full px-12 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-50 flex justify-between items-center'>
    {/* Netflix Logo */}
    <img  
        className='w-44 object-contain transform hover:scale-[1.02] transition-transform duration-300'
        src={LOGO} 
        alt="logo"
    />
    
    {/* Right-side User Controls Container */}
    {user && (
      <div className='flex items-center gap-4 bg-black/20 p-2 rounded-lg backdrop-blur-sm'>
          {/* Profile Avatar */}
          <img 
              src={user.photoURL}
              alt="user icon" 
              className='w-10 h-10 rounded shadow-md border border-neutral-700 hover:border-white transition-colors cursor-pointer'
          />
          
          {/* Sign Out button */}
          <button onClick={handleSignOut} className='bg-[#e50914] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#c10710] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg'>
              Sign Out
          </button>
      </div>
    )}
</div>
  )
}

export default Header