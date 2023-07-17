import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './context/AuthContext';
import { AdditionalHeaderContext } from './context/AdditionalHeaderContext';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isAdditionalHeaderHidden, setIsAdditionalHeaderHidden] = useState(true)
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
          <AdditionalHeaderContext.Provider value={{
            isAdditionalHeaderHidden,
            setIsAdditionalHeaderHidden
          }}>
            <Navbar />
          </AdditionalHeaderContext.Provider>
        }
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
