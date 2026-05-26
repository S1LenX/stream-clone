import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
function Header() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
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
            if(window.location.pathname === "/") navigate("/browse");
        } else {
            dispatch(removeUser());
            if(window.location.pathname !== "/") navigate("/");
        }
        });

        return ()=> unSubscribe();
    },[]);

    const handleGptSearchClick = () => {
    if (window.location.pathname.startsWith("/movie") || 
      window.location.pathname.startsWith("/tv")) {
      dispatch(toggleGptSearchView());  // reset gpt state
      navigate("/browse");
      return;
  }
  dispatch(toggleGptSearchView());  // normal toggle on browse page
}
    const handleLanguageChange=(e)=>{
      dispatch(changeLanguage(e.target.value));
    }

  return (
    <div className='absolute top-0 left-0 w-full px-12 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-50 flex flex-col md:flex-row justify-between items-center'>
    <img  
        className=' cursor-pointer w-44 mx-auto md:mx-0 object-contain transform hover:scale-[1.02] transition-transform duration-300'
        src={LOGO} 
        alt="logo" 
        onClick={() => navigate("/browse")}
    />
    
    {/* Right-side User Controls Container */}
    {user && (
      <div className='flex items-center gap-4 bg-black/20 p-2 rounded-lg backdrop-blur-sm'>
          {showGptSearch && (
            <select onChange={handleLanguageChange} className='w-25 p-2 bg-gray-900 text-white m-2 rounded-lg backdrop-blur-sm' defaultValue="en">
              {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                      {lang.name} 
                  </option>
              ))}
          </select>)}
          <button className='py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700'
            onClick={handleGptSearchClick}
          >
              {showGptSearch?"Home":"🔍︎ Search"}
          </button>
          <img 
              src="https://stream-clone-78ab8.web.app/uIcon.png"
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