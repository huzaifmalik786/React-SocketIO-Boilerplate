import React, { useEffect } from 'react';

// pages
import { Home } from './pages/home';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import socketIO from "socket.io-client"

const ws= 'http://localhost:8080/'

function App() {
  useEffect(()=>{
    socketIO(ws);
  }, [])

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
