import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';

function BasicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
