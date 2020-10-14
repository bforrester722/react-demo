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


// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./sw.js")
//     .then(function(registration) {
//       console.log("Registration successful,  is:", registration.scope);
//     })
//     .catch(function(err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

// module.hot.accept();

if ("serviceWorker" in navigator) {
  console.log('asdf')
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");    
    wb.register();
    console.log(wb)
  });

}