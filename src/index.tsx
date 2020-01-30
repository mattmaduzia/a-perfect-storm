import React from 'react';
import { render } from 'react-dom';
import "@mdi/font/css/materialdesignicons.css";

import "./sass/main.scss";
import './index.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

const renderApp = () =>  render(
    <App/>
, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./components/App', renderApp)
}

serviceWorker.register();

renderApp();
