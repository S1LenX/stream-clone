import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';

function Header() {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });

  }
  return (
    <div className='absolute top-0 left-0 w-full px-12 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 flex justify-between items-center'>
    {/* Netflix Logo */}
    <img  
        className='w-44 object-contain transform hover:scale-[1.02] transition-transform duration-300'
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
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