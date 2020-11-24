import React     from 'react';
import ReactDOM  from 'react-dom';
import {Router}   from 'react-router-dom';
import history   from './history';
import App       from './App';
import './styles.css';

import { Workbox } from "workbox-window";
ReactDOM.render(
 <Router history={history}>
    <App />
  </Router>, 
  document.getElementById('app')
);




// module.hot.accept();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");    
    wb.register();
  });
}