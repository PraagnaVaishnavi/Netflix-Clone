
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/home/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import { useState } from 'react'




function App() {
  return (
    <>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignUpPage/>}/>
   </Routes>
    </>
  )
}

export default App
