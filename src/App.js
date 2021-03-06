import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import Feeds from './Components/Feeds/Feeds';
import Header from './Components/header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import { selectUser,login,logout } from './features/userSlice';
import Login from '../src/Components/Login/Login'
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        // user is logged in
        dispatch(
          login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      }else{
        dispatch(logout());

      }
    })
  })
  return (
    <div className="app">
      <Header/>
      {!user ? <Login /> : (
         <div className='app-body'>
         <Sidebar/>
         <Feeds/>
     </div>
      )}
     
    </div>
  );
}

export default App;
