import React from 'react'
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';


const HomeScreen = () => {
  const {logout}=useAuthStore();
  return (
    <>
      homescreen
      <button onClick={logout}>logout</button>
    </>
  )
}

export default HomeScreen