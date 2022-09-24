import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import Header from './components/Header/Header';
import './styles/main.scss';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { authSlice, IUser } from './store/reducers/auth';
import { isUser } from './store/reducers/auth/ActionCreator';

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { setAuth, setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(
        setUser({ username: localStorage.getItem('id' || '') } as IUser)
      );
      dispatch(setAuth(true));
    }
    dispatch(isUser());
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
