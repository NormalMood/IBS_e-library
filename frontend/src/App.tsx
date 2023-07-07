import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('isAuth'))
      setIsAuth(true)
    else
      setIsAuth(false)
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        {isAuth && 
          <Navbar />
        }
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
