import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './context/AuthContext';
import { AxiosInterceptor } from './api/AxiosInterceptor';

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
      <AxiosInterceptor>

      <BrowserRouter>
        {isAuth && 
          
          <Navbar />
        }
        <AppRouter />
      </BrowserRouter>
      </AxiosInterceptor>
    </AuthContext.Provider>
  );
}

export default App;
