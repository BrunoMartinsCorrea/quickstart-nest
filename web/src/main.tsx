import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './ui/App';
import '@radix-ui/themes/styles.css';
import './config/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
