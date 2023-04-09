import React from 'react';
import './App.scss';
import { AppRouter } from './components/AppRouter';
import { HashRouter } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};

export default App;
