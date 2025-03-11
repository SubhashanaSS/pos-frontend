import React, { useState, useEffect } from 'react';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const navLogin = () =>{
    navigate('/login')
  }

  return (
    <div className='home'>


        <h1><i>Welcome </i></h1>
        <p>Hola!</p>
        <button onClick={navLogin}>Login</button>
      
    </div>
  )
}

export default Home
