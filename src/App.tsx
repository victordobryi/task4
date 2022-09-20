import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import Header from './components/Header/Header';

import './styles/main.scss';

export const App = () => (
  <>
    <BrowserRouter>
      <Header isAuth={false} />
      <main>
        <div className="_container">
          <AppRouter isAuth={false} />
        </div>
      </main>
      <footer>Directed by Viktar Kasilkin</footer>
    </BrowserRouter>
  </>
);

export default App;
