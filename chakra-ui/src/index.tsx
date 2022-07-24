import './index.css';

import React from 'react';
import ReactDOM, { hydrate, render } from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(<App />, document.getElementById('root'));

const root: HTMLElement | null = document.getElementById('root');

let shouldHydrate: boolean = false;
if (root instanceof HTMLElement) {
  shouldHydrate = root.hasChildNodes();
}

if (shouldHydrate) {
  hydrate(<App />, root);
} else {
  render(<App />, root);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
