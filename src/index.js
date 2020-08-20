import React from 'react';
import ReactDOM from 'react-dom';
import { Workbox } from "workbox-window";
import App from './App';
import './styles.css';


ReactDOM.render(
  <App  />,
  document.getElementById('app')
);


// setup service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/src-sw.js");
    wb.register();
  })
}
// module.hot.accept();
