import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import Header from './Header';

const isAuthorized = false

const header = ReactDOM.createRoot(
  document.getElementById('header') as HTMLElement
)
if (isAuthorized) {
  header.render(
    <Header />
  )
}

const main = ReactDOM.createRoot(
  document.getElementById('main') as HTMLElement
);
main.render(
  <Main />
);
