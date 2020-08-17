import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

module.hot.accept();
