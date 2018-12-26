import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter
    basename={
      process.env.NODE_ENV === 'development' ? '' : '/react-scalable-draggable'
    }
  >
    <Route component={App} path="/" />
  </BrowserRouter>,
  document.getElementById('app')
);
