import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import Header from './components/Header/Header';
import './styles/main.scss';
import { useAppSelector } from './redux-hooks';

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <Header isAuth={isAuth} />
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
