import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersMock} from './mocks/offers';

const Settings = {
  Offers: offersMock
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={Settings.Offers} />
  </React.StrictMode>,
);
