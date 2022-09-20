import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';

import './styles/main.scss';

export const App = () => (
  <>
    <BrowserRouter>
      <header className="as">Header</header>
      <main>
        <div className="_container">
          <AppRouter isAuth />
        </div>
      </main>
      <footer>Directed by Viktar Kasilkin</footer>
    </BrowserRouter>
  </>
);

export default App;
