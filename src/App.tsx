import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import Header from './components/Header/Header';
import './styles/main.scss';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { authSlice, IUser } from './store/reducers/auth';

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { setAuth, setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(
        setUser({ username: localStorage.getItem('username' || '') } as IUser)
      );
      dispatch(setAuth(true));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <div className="_container">
            <AppRouter isAuth={isAuth} />
          </div>
        </main>
        <footer>Directed by Viktar Kasilkin</footer>
      </BrowserRouter>
    </>
  );
};

export default App;
